import { ButtonWrapper } from './ButtonWrapper';

export function TransactionForm({ recipient, amount, setRecipient, setAmount, sendTransaction }) {
  return (
    <form onSubmit={sendTransaction} className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Recipient</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">Amount (SOL)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <ButtonWrapper text="Send Transaction" type="submit" />
    </form>
  );
}
