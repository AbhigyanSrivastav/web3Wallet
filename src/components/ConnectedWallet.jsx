import { useWallet } from "@solana/wallet-adapter-react";

  import "@solana/wallet-adapter-react-ui/styles.css";

  const ConnectedWallet = () => {

    const {publicKey} = useWallet();

  return (
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
      <p className="text-sm sm:text-base w-full sm:w-auto mb-2 sm:mb-0">
      {publicKey ? (
        <b>Connected wallet: {publicKey.toString()}</b>
      ) : (
        <b>No wallet connected</b>
      )}
      </p>
    </div>
  );
};

export default ConnectedWallet;
