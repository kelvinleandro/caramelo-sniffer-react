import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Packet } from "@/types/packets";
import PayloadDisplay from "./payload-display";

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
                <p>
                  <span className="font-bold">IP version:</span>{" "}
                  {rest.ip_version}
                </p>
                <p>
                  <span className="font-bold">Header Length:</span>{" "}
                  {rest.ip_header_length}
                </p>
                <p>
                  <span className="font-bold">TTL:</span> {rest.ip_ttl}
                </p>
                <p>
                  <span className="font-bold">IP Source:</span> {rest.ip_src}
                </p>
                <p>
                  <span className="font-bold">IP Destination:</span>{" "}
                  {rest.ip_dst}
                </p>
              </>
            ) : rest.ip_version === 6 ? (
              <>
                <p>
                  <span className="font-bold">IP version:</span>{" "}
                  {rest.ip_version}
                </p>
                <p>
                  <span className="font-bold">Traffic Class:</span>{" "}
                  {rest.ip_traffic_class}
                </p>
                <p>
                  <span className="font-bold">Flow Label:</span>{" "}
                  {rest.ip_flow_label}
                </p>
                <p>
                  <span className="font-bold">Payload Length:</span>{" "}
                  {rest.ip_payload_length}
                </p>
                <p>
                  <span className="font-bold">IP Source:</span> {rest.ip_src}
                </p>
                <p>
                  <span className="font-bold">IP Destination:</span>{" "}
                  {rest.ip_dst}
                </p>
              </>
            ) : (
              <p>No information available</p>
            )
          ) : (
            <p>No information available</p>
          )}
        </TabsContent>
        <TabsContent value="transport">
          {rest ? (
            packet.protocol === "UDP" ? (
              <>
                <p>
                  <span className="font-bold">Protocol:</span> {packet.protocol}
                </p>
                <p>
                  <span className="font-bold">Port Source:</span>{" "}
                  {rest.port_src}
                </p>
                <p>
                  <span className="font-bold">Port Destination:</span>{" "}
                  {rest.port_dst}
                </p>
                <p>
                  <span className="font-bold">Length:</span> {rest.udp_length}
                </p>
                <p>
                  <span className="font-bold">Checksum:</span>{" "}
                  {rest.udp_checksum}
                </p>
              </>
            ) : packet.protocol === "TCP" ? (
              <>
                <p>
                  <span className="font-bold">Protocol:</span> {packet.protocol}
                </p>
                <p>
                  <span className="font-bold">Port Source:</span>{" "}
                  {rest.port_src}
                </p>
                <p>
                  <span className="font-bold">Port Destination:</span>{" "}
                  {rest.port_dst}
                </p>
                <p>
                  <span className="font-bold">Sequence Number:</span>{" "}
                  {rest.sequence_number}
                </p>
                <p>
                  <span className="font-bold">Acknowledgment Number:</span>{" "}
                  {rest.acknowledgment_number}
                </p>
              </>
            ) : packet.protocol === "ICMP" ? (
              <>
                <p>
                  <span className="font-bold">Protocol:</span> {packet.protocol}
                </p>
                <p>
                  <span className="font-bold">ICMP Type:</span> {rest.icmp_type}
                </p>
                <p>
                  <span className="font-bold">ICMP Code:</span> {rest.icmp_code}
                </p>
                <p>
                  <span className="font-bold">Checksum:</span>{" "}
                  {rest.icmp_checksum}
                </p>
              </>
            ) : (
              <p>No information available</p>
            )
          ) : (
            <p>No information available</p>
          )}
        </TabsContent>
        <TabsContent value="payload">
          {packet && rest ? (
            <PayloadDisplay payload={rest.payload} />
          ) : (
            <p>No information available</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PacketDetails;
