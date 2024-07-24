"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/packets/data-table";
import { columns } from "@/components/packets/columns";
import PacketDetails from "@/components/packet-details";
import { Packet } from "@/types/packets";

const PACKETS_DATA: Packet[] = [
  {
    number: 1,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "UDP",
    length: 12,
    rest: {
      payload: new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0]),
      // ipv6 info
      ip_version: 6,
      ip_traffic_class: 0,
      ip_flow_label: 0,
      ip_payload_length: 0,
      ip_hop_limit: 0,
      ip_src: "866c:cf9d:2994:cd3b:55da:97e3:a5b4:a39b",
      ip_dst: "866c:cf9d:2994:cd3b:55da:97e3:a5b4:a39b",
      // udp info
      port_src: 0,
      port_dst: 0,
      udp_length: 0,
    },
  },
  {
    number: 2,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "ICMP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
      // ipv4 info
      ip_version: 4,
      ip_header_length: 0,
      ip_ttl: 0,
      ip_src: "0.0.0.0",
      ip_dst: "0.0.0.0",
      // icmp info
      icmp_type: 0,
      icmp_code: 0,
      icmp_checksum: 0,
    },
  },
  {
    number: 3,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "TCP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
      // ipv4 info
      ip_version: 4,
      ip_header_length: 0,
      ip_ttl: 0,
      ip_src: "0.0.0.0",
      ip_dst: "0.0.0.0",
      ip_payload_length: 0,
      ip_hop_limit: 0,
      // tcp info
      port_src: 0,
      port_dst: 0,
      sequence_number: 0,
      acknowledgment_number: 0,
      flags: {
        URG: false,
        ACK: false,
        PSH: false,
        RST: false,
        SYN: false,
        FIN: false,
      },
    },
  },
  {
    number: 4,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "unknown",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 5,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "43",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 6,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "ICMP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 7,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "unknown",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 8,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "UDP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 9,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "TCP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 10,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "TCP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
  {
    number: 11,
    timestamp: 0,
    t_captured: 0,
    mac_src: "00:00:00:00:00:00",
    mac_dst: "00:00:00:00:00:00",
    transport_protocol: "ICMP",
    length: 12,
    rest: {
      payload: new Uint8Array(),
    },
  },
];

export default function Home() {
  const { setTheme, theme } = useTheme();
  const [packets, setPackets] = useState<Packet[]>([]);
  const [activePacket, setActivePacket] = useState<Packet | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const startCapture = async () => {
    const response = await fetch("http://localhost:8080/start_capture");
  };

  const stopCapture = async () => {
    const response = await fetch("http://localhost:8080/stop_capture");
  };

  const handleCaptureChange = async (capturing: boolean) => {
    setIsCapturing(capturing);
    if (!capturing) {
      await stopCapture();
    } else {
      await startCapture();
    }
  };

  useEffect(() => {
    const fetchPackets = async () => {
      if(isCapturing){
        const response = await fetch("http://localhost:8080/packets");
        const data = await response.json();
        setPackets(data.packets);
      }
    };

    const interval = setInterval(fetchPackets, 1000);

    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <div className="flex flex-col w-full min-h-screen py-6 px-8 gap-4">
      <h1 className="text-center uppercase text-3xl font-bold">
        Caramelo Sniffer
      </h1>
      <div className="flex flex-row justify-between items-center border rounded-md px-4 py-2">
        <div className="flex items-center space-x-2">
          <p className="text-lg">OFF</p>
          <Switch
            checked={isCapturing}
            onCheckedChange={(value) => handleCaptureChange(value)}
          />
          <p className="text-lg">ON</p>
        </div>
        <p className="text-lg">Packets Captured: {packets.length}</p>

        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleTheme}
          className="bg-transparent"
        >
          <Sun className="hidden dark:block"/>
          <Moon className="dark:hidden"/>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[70%]">
          <DataTable columns={columns} data={PACKETS_DATA} onRowClick={setActivePacket} />
        </div>
        <PacketDetails packet={activePacket} />
      </div>
    </div>
  );
}
