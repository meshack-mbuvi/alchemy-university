const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, toHex } = require("ethereum-cryptography/utils");

/**
 * Hash a message using KECCAK-256
 * @param message the message to hash.
 * @returns the hash of the message.
 */
const hashMessage = (message) => {
  const messageBytes = Uint8Array.from(message);
  return keccak256(messageBytes);
};

const pubKeyToAddress = (publicKey) => {
  // remove first byte from public key
  // the byte indicates whether the key is compressed or not
  const sliceKey = publicKey.slice(1);
  // take keccak256 hash of the rest of the public key
  const keccakHash = keccak256(sliceKey);
  // return the last 20 bytes of the hash
  return toHex(keccakHash.slice(-20));
};

/**
 * Get the public key from the signature.
 * @param message the message.
 * @param signature the signature in hex format with the recovery bit as the first byte.
 * @return the public key.
 */
const signatureToPublicKey = (message, signature) => {
  // get message hash
  const hash = hashMessage(message);

  const fullSignatureBytes = hexToBytes(signature);
  // get recovery bit from signature
  const recoveryBit = fullSignatureBytes[0];
  // get signature bytes from signature
  const signatureBytes = fullSignatureBytes.slice(1);

  return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
};

module.exports = { pubKeyToAddress, signatureToPublicKey };
