
export function KeyPairDisplay({ publicKey, privateKey }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold">Key Pair</h2>
      <p className="text-sm text-gray-700">Public Key: {publicKey}</p>
      <p className="text-sm text-gray-700">Private Key: {privateKey}</p>
    </div>
  );
}
