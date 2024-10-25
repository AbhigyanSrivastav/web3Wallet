import ConnectedWallet from "@/components/ConnectedWallet";
import TabsContainer from "./TabsContainer";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { rpcUrl } from "@/store/atoms/atoms";

const HeroContainer = ({ keyPair, mnemonic }) => {
  const endpoint = useRecoilValue(rpcUrl)
  const wallets = useMemo(() => [], []);
  return (
    <div className="p-1 flex flex-col">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
            <div className="flex justify-between space-x-2">
              <WalletMultiButton className="text-xs px-3 py-2" />
            </div>
            <ConnectedWallet />
            <TabsContainer keyPair={keyPair} mnemonic={mnemonic} />
            </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    </div>
  );
};

export default HeroContainer;
