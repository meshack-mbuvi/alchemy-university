const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

const serverUrl = "http://localhost:1225";

async function main() {
  // set this to any name in the nice list to get a gift
  const name = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // TODO: how do we prove to the server we're on the nice list?
  // Answer: Send root, name and  proof of a given name and send it to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    root,
    proof,
    name,
  });

  console.log({ gift });
}

main();
