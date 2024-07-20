import { useEffect, useState } from 'react';

export default function Home() {
  const [packets, setPackets] = useState([]);
  const [captureStatus, setCaptureStatus] = useState('Stopped');

  const startCapture = async () => {
    const response = await fetch('http://localhost:5000/start_capture');
    const data = await response.json();
    setCaptureStatus(data.status);
  };

  const stopCapture = async () => {
    const response = await fetch('http://localhost:5000/stop_capture');
    const data = await response.json();
    setCaptureStatus(data.status);
  };

  useEffect(() => {
    const fetchPackets = async () => {
      const response = await fetch('http://localhost:5000/packets');
      const data = await response.json();
      setPackets(data.packets);
    };

    const interval = setInterval(fetchPackets, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col w-full min-h-screen h-screen'>
      <h1 className='text-center'>Caramelo Sniffer</h1>
      <div>
        <button onClick={startCapture}>Start Capture</button>
        <button onClick={stopCapture}>Stop Capture</button>
        <p>Status: {captureStatus}</p>
      </div>
      <div className='text-center'>Packets Captured: {packets.length}</div>
    </div>
  );
}
