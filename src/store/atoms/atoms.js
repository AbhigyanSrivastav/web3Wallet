import {atom} from 'recoil';

export const rpcUrl = atom({
    key : "rpc",
    default : "https://solana-devnet.g.alchemy.com/v2/QFd20GTZ2_Tjc8AW0Obsknt8f2toU5Xi"
})

export const menmonic = atom({
    key : "menmonic",
    default : ""
})

export const keyPairState = atom({
    key : "keypair",
    default : {},
})