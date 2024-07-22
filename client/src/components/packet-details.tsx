import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Packet } from "@/types/packets";

const PacketDetails = ({ packet }: { packet: Packet | null }) => {
  const rest = packet?.rest;

  return (
    <section className="flex flex-col gap-2 px-4 py-2 border rounded-md w-full md:w-[30%]">
      <Tabs defaultValue="network">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="payload">Payload</TabsTrigger>
        </TabsList>
        <TabsContent value="network">
          {rest && rest.ip_version ? (
            rest.ip_version === 4 ? (
              <>
                <div>IP version: {rest.ip_version}</div>
                <div>Header Length: {rest.ip_header_length}</div>
                <div>TTL: {rest.ip_ttl}</div>
                <div>IP Source: {rest.ip_src}</div>
                <div>IP Destination: {rest.ip_dst}</div>
              </>
            ) : rest.ip_version === 6 ? (
              <>
                <div>IP version: {rest.ip_version}</div>
                <div>Traffic Class: {rest.ip_traffic_class}</div>
                <div>Flow Label: {rest.ip_flow_label}</div>
                <div>Payload Length: {rest.ip_payload_length}</div>
                <div>IP Source: {rest.ip_src}</div>
                <div>IP Destination: {rest.ip_dst}</div>
              </>
            ) : (
              <p>Network content unavailable</p>
            )
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
