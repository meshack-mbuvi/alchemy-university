const express = require("express");
const crypto = require("./crypto");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// A list of addresses and their balances
const balances = {
  ccf4b25d17d9f6b8959ad2ae5ef7b7be415d368c: 100,
  "1a23342829790203a31bbd0c56ef370cfa864bc6": 50,
  b5239dff9cafb7f586cec21dfe790211f9a76f1f: 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // message contains the amount and recipient
  const { message, signature } = req.body;
  const { amount, recipient } = message;

  // Retrieve sender address from signature
  const publickey = crypto.signatureToPublicKey(message, signature);
  const sender = crypto.pubKeyToAddress(publickey);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
