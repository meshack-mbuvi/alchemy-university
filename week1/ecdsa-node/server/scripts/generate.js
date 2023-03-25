/**
 * This script generates a random private key, public key, and address which are then used to configure the server and client
 * For the server, we only need the address while the client needs the private key and public key.
 */
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const crypto = require("../crypto");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log({
  privateKey: toHex(privateKey),
  publicKey: toHex(publicKey),
  address: toHex(crypto.pubKeyToAddress(publicKey)),
});
