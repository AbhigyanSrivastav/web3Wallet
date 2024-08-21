import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram, Transaction, Keypair } from '@solana/web3.js';
import { MnemonicDisplay } from '@/components/MnemonicDisplay';
import { KeyPairDisplay } from '@/components/KeyPairDisplay';
import { BalanceCheck } from '@/components/BalanceCheck';
import { TransactionForm } from '@/components/TransactionForm';
import { generateAndStoreMnemonic } from '@/utils/mnemonicUtil';
import bs58 from 'bs58';
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [keyPair, setKeyPair] = useState(null);
  const [balance, setBalance] = useState("NA");
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  const connection = new Connection('https://solana-devnet.g.alchemy.com/v2/QFd20GTZ2_Tjc8AW0Obsknt8f2toU5Xi');

  useEffect(() => {
    const { mnemonic, publicKey, privateKey } = generateAndStoreMnemonic();
    setMnemonic(mnemonic);
    setKeyPair({ publicKey, privateKey });
  }, []);

  const checkBalance = async () => {
    if (keyPair) {
      setLoading(true);
      const publicKeyObj = new PublicKey(keyPair.publicKey);
      try {
        const balance = await connection.getBalance(publicKeyObj);
        setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
      } catch (error) {
        console.error('Error checking balance:', error);
        setTransactionStatus('Failed to check balance.');
      } finally {
        setLoading(false);
      }
    }
  };

  const sendTransaction = async (e) => {
    e.preventDefault();

    if (!keyPair || !recipient || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const senderSecretKey = bs58.decode(keyPair.privateKey);
      const senderKeypair = Keypair.fromSecretKey(senderSecretKey);
      const recipientPublicKey = new PublicKey(recipient);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: recipientPublicKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const signature = await connection.sendTransaction(transaction, [senderKeypair]);
      await connection.confirmTransaction(signature, 'processed');

      setTransactionStatus(`Transaction successful! Signature: ${signature}`);
      checkBalance(); // Update balance after transaction
    } catch (error) {
      console.error('Error sending transaction:', error);
      setTransactionStatus('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <MnemonicDisplay mnemonic={mnemonic} />
      <KeyPairDisplay publicKey={keyPair?.publicKey} privateKey={keyPair?.privateKey} />
      <BalanceCheck balance={balance} checkBalance={checkBalance} loading={loading} />
      <Toaster />
      <TransactionForm
        recipient={recipient}
        amount={amount}
        setRecipient={setRecipient}
        setAmount={setAmount}
        sendTransaction={sendTransaction}
      />
      {transactionStatus && (
        <div className="mt-4 p-4 bg-gray-200 rounded-lg text-center">
          {transactionStatus}
        </div>
      )}
    </div>
  );
}

export default App;
