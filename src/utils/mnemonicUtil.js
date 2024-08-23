import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';
import { hdkey } from 'ethereumjs-wallet';
import { keccak256 } from 'js-sha3';
import { bufferToHex, publicToAddress } from 'ethereumjs-util';

// Derivation paths for supported blockchains
const DERIVATION_PATHS = {
  solana: `m/44'/501'/0'/0'`, // Solana derivation path
  ethereum: `m/44'/60'/0'/0/0`, // Ethereum derivation path
};

// Function to generate or retrieve the mnemonic
export function generateAndStoreMnemonic() {
  const LOCAL_STORAGE_KEY = 'mnemonicPhrase';
  let storedMnemonic = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!storedMnemonic) {
    storedMnemonic = generateMnemonic();
    localStorage.setItem(LOCAL_STORAGE_KEY, storedMnemonic);
  }

  return storedMnemonic;
}

// Function to derive the seed buffer from a mnemonic
function getSeedBufferFromMnemonic(mnemonic) {
  return mnemonicToSeedSync(mnemonic);
}

// Function to derive Solana key pair from seed buffer
function deriveSolanaKeyPair(seedBuffer, path) {
  const derivedSeed = derivePath(path, seedBuffer.toString('hex')).key;
  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  return {
    publicKey: Keypair.fromSecretKey(keyPair.secretKey).publicKey.toBase58(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
}

// Function to derive Ethereum key pair and address from seed buffer
function deriveEthereumKeyPair(seedBuffer, path) {
  const hdWallet = hdkey.fromMasterSeed(seedBuffer);
  const wallet = hdWallet.derivePath(path).getWallet();

  // Remove the 0x04 prefix and compute the Ethereum address
  const publicKey = wallet.getPublicKey();
  const address = '0x' + keccak256(publicKey.slice(1)).slice(-40);

  return {
    publicKey: bufferToHex(publicToAddress(publicKey, true)), // Address as public key in hex format
    privateKey: wallet.getPrivateKeyString(), // Private key in hex format
    address, // Ethereum address derived from the public key
  };
}

// Main function to derive keys based on the blockchain type
export function deriveKeys(mnemonic, blockchain) {
  const seedBuffer = getSeedBufferFromMnemonic(mnemonic);
  const path = DERIVATION_PATHS[blockchain];

  switch (blockchain) {
    case 'solana':
      return deriveSolanaKeyPair(seedBuffer, path);
    case 'ethereum':
      return deriveEthereumKeyPair(seedBuffer, path);
    default:
      throw new Error(`Unsupported blockchain: ${blockchain}`);
  }
}
