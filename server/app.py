from flask import Flask, jsonify
from flask_cors import CORS
import threading
import time
import socket

from capture import *

app = Flask(__name__)
CORS(app)

packet_lock = threading.Lock()

packets = []
capture_thread = None
capture_running = False

sock = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
sock.bind(('enp0s3', 0))
sock.setblocking(False)

def capture_packets(sock: socket.socket):
    global capture_running
    
    while capture_running:
        try:
            raw_data, _ = sock.recvfrom(65535)
            t = time.time()
            if raw_data:
                mac_dst, mac_src, eth_proto, eth_data = ethernet_frame(raw_data)
                protocol_name = "unknown"
                rest = {}

                # IPv4 or IPv6
                if eth_proto in (2048, 34525):
                    if eth_proto == 2048:  # IPv4
                        version, header_length, ttl, protocol, ip_src, ip_dst, ip_data = ipv4_packet(eth_data)
                        rest.update(
                            {"ip_version": version, "ip_header_length": header_length, "ip_ttl": ttl, "ip_src": ip_src,
                            "ip_dst": ip_dst})
                    else:  # IPv6
                        version, traffic_class, flow_label, payload_length, protocol, hop_limit, ip_src, ip_dst, ip_data = ipv6_packet(eth_data)
                        rest.update(
                            {"ip_version": version, "ip_traffic_class": traffic_class, "ip_flow_label": flow_label, "ip_payload_length": payload_length, "ip_hop_limit": hop_limit, "ip_src": ip_src, "ip_dst": ip_dst})
                    
                    if protocol == 1:
                        protocol_name = "ICMP"
                        icmp_type, icmp_code, checksum, transport_data = icmp_packet(ip_data)
                        rest.update({"icmp_type": icmp_type, "icmp_code": icmp_code, "icmp_checksum": checksum,
                                     "payload": list(transport_data)})
                    elif protocol == 6:
                        protocol_name = "TCP"
                        src_port, dst_port, sequence_number, acknowledgment_number, flags, transport_data = tcp_segment(
                            ip_data)
                        rest.update({"port_src": src_port, "port_dst": dst_port, "sequence_number": sequence_number,
                                     "acknowledgment_number": acknowledgment_number, "flags": flags,
                                     "payload": list(transport_data)})
                    elif protocol == 17:
                        protocol_name = "UDP"
                        src_port, dst_port, length, checksum, transport_data = udp_segment(ip_data)
                        rest.update(
                            {"port_src": src_port, "port_dst": dst_port, "udp_length": length, "udp_checksum": checksum, "payload": list(transport_data)})
                    else:
                        protocol_name = f"{protocol}"
                        rest.update({"payload": list(ip_data)})
                else:
                    rest.update({"payload": list(eth_data)})

                packet_info = {
                    "number": len(packets) + 1,
                    "timestamp": t - packets[0]['t_captured'] if len(packets) > 0 else 0.,
                    "t_captured": t,
                    "mac_src": mac_src,
                    "mac_dst": mac_dst,
                    "protocol": protocol_name,
                    "length": len(raw_data),
                    "rest": rest
                }
                with packet_lock:
                    packets.append(packet_info)
        except BlockingIOError:
            pass  # No packets to read, move on


@app.route('/start_capture')
def start_capture():
    global capture_running, capture_thread
    if not capture_running:
        capture_running = True
        capture_thread = threading.Thread(target=capture_packets, args=(sock,))
        capture_thread.start()
        return jsonify({"status": "Packet capture started"})
    return jsonify({"status": "Packet capture already running"})


@app.route('/stop_capture')
def stop_capture():
    global capture_running
    if capture_running:
        capture_running = False
        return jsonify({"status": "Packet capture stopped"})
    return jsonify({"status": "Packet capture is not running"})


@app.route('/packets')
def get_packets():
    with packet_lock:
        return jsonify({"packets": packets})


if __name__ == '__main__':
    app.run(debug=True, port=8080)