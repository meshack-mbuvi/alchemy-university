import { Alchemy, Network } from "alchemy-sdk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Block from "./components/block";
import Home from "./components/home";
import { Transaction } from "./components/tx/transaction";
import useBlocks from "./hooks/useBlocks";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const { latestBlocks } = useBlocks();

  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/block/:blockNumber">
            <Block />
          </Route>
          <Route path="/tx/:hash">
            <Transaction />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
