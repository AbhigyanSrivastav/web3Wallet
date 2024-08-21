import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

export function generateAndStoreMnemonic() {
  const LOCAL_STORAGE_KEY = 'mnemonicPhrase';
  let storedMnemonic = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!storedMnemonic) {
    storedMnemonic = generateMnemonic();
    localStorage.setItem(LOCAL_STORAGE_KEY, storedMnemonic);
  }

  const seedBuffer = mnemonicToSeedSync(storedMnemonic);
  const path = `m/44'/501'/0'/0'`; // Backpack derivation path
  const derivedSeed = derivePath(path, seedBuffer.toString('hex')).key;
  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  return {
    mnemonic: storedMnemonic,
    publicKey: Keypair.fromSecretKey(keyPair.secretKey).publicKey.toBase58(),
    privateKey: bs58.encode(keyPair.secretKey),
  };
}
