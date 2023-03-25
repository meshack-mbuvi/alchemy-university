import { keccak256 } from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";
const ACCOUNTS = new Map([
  [
    "bob",
    {
      privateKey:
        "0c717adb17c68fc293c5896bd8e72518f88faa7e25b072e15f665aed64d588ca",
      publicKey:
        "04064b0a8dc7575d6eb9699a577565ab6dae6ca7778f659c0072c4eb22efe5b48b7fb23544a09bd36301a85ea1b2111d12711b9f02b48c580821452b6d0b7effff",
    },
  ],
  [
    "alice",
    {
      privateKey:
        "c673504770f3e0830f86cac308638e5e202cdf55375d9076d80748541b23cf3e",
      publicKey:
        "04694adaa27fd06b7c3576b01b929fd0e2908b89aa5a89b000a16c5b16a0397c5e84729339c1f48eca495b9006bd973b75aa0f7c26baafeb649b1d716105a516f1",
    },
  ],
  [
    "charles",
    {
      privateKey:
        "b633f06277e928418e4998ed1dfc2052e59b7bff9303fefb21403fbf3fc5b6b3",
      publicKey:
        "040bd37eb1a0930bf83efb0fb8167bc0b5b8771ec348110540a5f61bdf1d5eb197ce232a5fa8f60c9ae83a4c8fde96f65a5ba64c5a1ff467a031fa6e32c4f19d5",
    },
  ],
]);

// get publickey from name
const getPublicKey = (name) => {
  if (!name) return null;

  return hexToBytes(ACCOUNTS.get(name).publicKey);
};

// get privatekey from name
const getPrivateKey = (name) => {
  if (!name) return null;

  return hexToBytes(ACCOUNTS.get(name).privateKey);
};

const hashMessage = (message) => {
  const messageBytes = Uint8Array.from(message);
  const messageHash = keccak256(messageBytes);
  return messageHash;
};

// returns signature of a message and sender
const signMessage = async (message, sender) => {
  const messageHash = hashMessage(message);
  const privateKey = getPrivateKey(sender);
  const [signature, recoveryBit] = await secp.sign(messageHash, privateKey, {
    recovered: true,
  });
  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  return toHex(fullSignature);
};

//get address from public key of a user
const getAddress = (name) => {
  if (!name) return null;

  const publicKey = getPublicKey(name);
  const sliceKey = publicKey.slice(1);
  // take keccak256 hash of the rest of the public key
  const keccakHash = keccak256(sliceKey);
  // return the last 20 bytes of the hash
  return toHex(keccakHash.slice(-20));
};

const USERS = Array.from(ACCOUNTS.keys());

const fakeWallet = {
  USERS,
  getAddress,
  signMessage,
};

export default fakeWallet;
