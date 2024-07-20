"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PacketDetails from "@/components/packet-details";

export default function Home() {
  const { setTheme, theme } = useTheme();
  const [packets, setPackets] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // const startCapture = async () => {
  //   const response = await fetch("localhost:8080/start_capture");
  //   const data = await response.json();
  // };

  // const stopCapture = async () => {
  //   const response = await fetch("localhost:8080/stop_capture");
  //   const data = await response.json();
  // };

  const handleCaptureChange = async (capturing: boolean) => {
    setIsCapturing(capturing);
    // if (!capturing) {
    //   await stopCapture();
    // } else {
    //   await startCapture();
    // }
  }


  // useEffect(() => {
  //   const fetchPackets = async () => {
  //     const response = await fetch("localhost:8080/packets");
  //     const data = await response.json();
  //     setPackets(data.packets);
  //   };

  //   const interval = setInterval(fetchPackets, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-300 dark:bg-gray-950 py-6 px-8 gap-4">
      <h1 className="text-center uppercase text-3xl font-bold">
        Caramelo Sniffer 🐶
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center border rounded-md px-4 py-2">
        <div className="flex items-center space-x-2">
          <p className="text-lg">OFF</p>
          <Switch checked={isCapturing} onCheckedChange={value => handleCaptureChange(value)} />
          <p className="text-lg">ON</p>
        </div>
        <p className="text-lg">Packets Captured: {packets.length}</p>

        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleTheme}
          className="bg-transparent"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-[70%] border"></div>
        <PacketDetails />
      </div>
    </div>
  );
}
