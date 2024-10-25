import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletContainer from "./WalletContainer";
import PaymentContainer from "./PaymentContainer";

const TabsContainer = ({ keyPair, mnemonic }) => {
  return (
    <div>
      <Tabs defaultValue="wallet" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="send">Send SOL</TabsTrigger>
          <TabsTrigger value="launchpad">Token Launchpad</TabsTrigger>
        </TabsList>
        <TabsContent value="wallet">
          <WalletContainer mnemonic={mnemonic} />
        </TabsContent>
        <TabsContent value="send">
          {" "}
          <PaymentContainer keyPair={keyPair} />
        </TabsContent>
        <TabsContent value="launchpad">hello</TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsContainer;
