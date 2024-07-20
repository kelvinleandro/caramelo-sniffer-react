type EthernetFrame = {
  mac_dst: string;
  mac_src: string;
  eth_proto: number;
  eth_data: Uint8Array;
};

type IPv4Packet = {
  version: number;
  header_length: number;
  ttl: number;
  protocol: number;
  ip_src: string;
  ip_dst: string;
  ip_data: Uint8Array;
};

type IPv6Packet = {
  version: number;
  traffic_class: number;
  flow_label: number;
  payload_length: number;
  protocol: number;
  hop_limit: number;
  ip_src: string;
  ip_dst: string;
  ip_data: Uint8Array;
};

type ICMPPacket = {
  type: number;
  code: number;
  checksum: number;
  data: Uint8Array;
};

type TCPFlags = {
  URG: boolean;
  ACK: boolean;
  PSH: boolean;
  RST: boolean;
  SYN: boolean;
  FIN: boolean;
};

type TCPSegment = {
  src_port: number;
  dst_port: number;
  sequence_number: number;
  acknowledgment_number: number;
  flags: TCPFlags;
  data: Uint8Array;
};

type UDPSegment = {
  src_port: number;
  dst_port: number;
  length: number;
  data: Uint8Array;
};

type Rest = 
  | IPv4Packet
  | IPv6Packet
  | ICMPPacket
  | TCPSegment
  | UDPSegment
  | { payload: Uint8Array };

type Packet = {
  number: number;
  timestamp: number;
  t_captured: number;
  mac_src: string;
  mac_dst: string;
  transport_protocol: string;
  length: number;
  rest: Rest;
}