import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Packet } from "@/types/packets";

const PacketDetails = ({ packet }: { packet: Packet | null }) => {
  return (
    <section className="flex flex-col gap-2 px-4 py-2 border rounded-md w-full md:w-[30%]">
      <Tabs defaultValue="network">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="payload">Payload</TabsTrigger>
        </TabsList>
        <TabsContent value="network">
          {packet ? (
            <p>network: {packet.number}</p>
          ) : (
            <p>Network content unavailable</p>
          )}
        </TabsContent>
        <TabsContent value="transport">
          {packet ? (
            <p>transport: {packet.number}</p>
          ) : (
            <p>Transport content unavailable</p>
          )}
        </TabsContent>
        <TabsContent value="payload">
          {packet ? (
            <p>payload: {packet.number}</p>
          ) : (
            <p>Payload content unavailable</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PacketDetails;
