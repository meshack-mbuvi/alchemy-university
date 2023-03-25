import fakeWallet from "./fakeWallet";
import server from "./server";

/**
 * The component that displays a dropdown with the list of available wallets from
 * which a user can select one to use. It also displays the balance of the selected
 * wallet and other user details.
 * @param {*} param0
 * @returns
 */
function Wallet({ setUser, balance, setBalance }) {
  async function onChange(evt) {
    const user = evt.target.value;
    setUser(user);
    const address = fakeWallet.getAddress(user);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <select onChange={onChange}>
          <option value="">Select a user</option>
          {fakeWallet.USERS.map((user, index) => (
            <option key={index} value={user}>
              {" "}
              {user}{" "}
            </option>
          ))}
        </select>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
