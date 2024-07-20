import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PacketDetails = () => {

  return (
    <section className="flex flex-col gap-2 px-4 py-2 border rounded-md w-[30%]">
      <Tabs defaultValue="network">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
          <TabsTrigger value="payload">Payload</TabsTrigger>
        </TabsList>
        <TabsContent value="network">
          <p>Network content</p>
        </TabsContent>
        <TabsContent value="transport">
          <p>Transport content</p>
        </TabsContent>
        <TabsContent value="payload">
          <p>Payload content</p>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PacketDetails;
