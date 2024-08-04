type EthernetFrame = {
  mac_dst: string;
  mac_src: string;
  eth_proto: number;
  // eth_data: Uint8Array;
};

export type IPv4Packet = {
  ip_version: number;
  ip_header_length: number;
  ip_ttl: number;
  // protocol: number;
  ip_src: string;
  ip_dst: string;
  // ip_data: Uint8Array;
};

export type IPv6Packet = {
  ip_version: number;
  ip_traffic_class: number;
  ip_flow_label: number;
  ip_payload_length: number;
  // protocol: number;
  ip_hop_limit: number;
  ip_src: string;
  ip_dst: string;
  // ip_data: Uint8Array;
};

export type ICMPPacket = {
  icmp_type: number;
  icmp_code: number;
  icmp_checksum: number;
  // data: Uint8Array;
};

type TCPFlags = {
  URG: boolean;
  ACK: boolean;
  PSH: boolean;
  RST: boolean;
  SYN: boolean;
  FIN: boolean;
};

export type TCPSegment = {
  port_src: number;
  port_dst: number;
  sequence_number: number;
  acknowledgment_number: number;
  flags: TCPFlags;
  // data: Uint8Array;
};

export type UDPSegment = {
  port_src: number;
  port_dst: number;
  udp_length: number;
  // data: Uint8Array;
};

export type Rest = Partial<IPv4Packet> & Partial<IPv6Packet> & Partial<ICMPPacket> & Partial<TCPSegment> & Partial<UDPSegment> & {
  payload: Uint8Array;
}

export type Packet = {
  number: number;
  timestamp: number;
  t_captured: number;
  mac_src: string;
  mac_dst: string;
  protocol: string;
  length: number;
  rest: Rest;
};
