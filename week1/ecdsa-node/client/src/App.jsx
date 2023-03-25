import { useState } from "react";
import "./App.scss";
import Transfer from "./Transfer";
import Wallet from "./Wallet";

function App() {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState("");

  return (
    <div className="app">
      <Wallet balance={balance} setBalance={setBalance} setUser={setUser} />
      <Transfer setBalance={setBalance} sender={user} />
    </div>
  );
}

export default App;
