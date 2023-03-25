import { useState } from "react";
import fakeWallet from "./fakeWallet";
import server from "./server";

function Transfer({ sender, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const message = {
      amount: parseInt(sendAmount),
      recipient,
    };

    const signature = await fakeWallet.signMessage(message, sender);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature,
        message,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          type={"number"}
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}></input>
      </label>

      <input
        type="submit"
        className="button"
        value="Transfer"
        disabled={!recipient.trim() || !sendAmount.trim()}
      />
    </form>
  );
}

export default Transfer;
