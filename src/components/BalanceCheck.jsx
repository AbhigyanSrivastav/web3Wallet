
import { ButtonWrapper } from './ButtonWrapper';

export function BalanceCheck({ balance, checkBalance, loading }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-start items-center mb-4">
        <h2 className="text-lg font-semibold">Balance:</h2>
        {loading ? (
          <p className="text-sm text-gray-700">Loading...</p>
        ) : (
          <p className="text-sm text-gray-700 pl-1">
            {balance ? `${balance} SOL` : 'Balance not available'}
          </p>
        )}
      </div>
      <ButtonWrapper onClickFunc={checkBalance} text="Check Balance" />
    </div>
  );
}
