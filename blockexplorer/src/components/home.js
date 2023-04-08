import { Alchemy, Network } from "alchemy-sdk";
import useBlocks from "../hooks/useBlocks";
import { formatAddress } from "../utils/formatAddress";
import { timeAgo } from "../utils/time";
import Transactions from "./transactions";

const borderColor = "#e9ecef";

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
    <div className="container m-auto border border-white">
      <div className="flex justify-between space-x-16 m-auto mt-24">
        <div
          className={`space-y-6 h-fit max-w-1/2 rounded-lg p-4 w-full border border-[${borderColor}]`}>
          <div>Latest blocks</div>
          <div className={`relative`}>
            <div className="border-b -mx-4"></div>

            {latestBlocks.map((block, index) => (
              <div
                className={`flex border-b last:border-0 border-[${borderColor}] py-2 flex-row flex-wrap sm:flex-nowrap items-center gap-2`}
                key={index}>
                <div
                  className="hidden sm:flex items-center justify-center bg-gray-100 text-gray-400 rounded p-3"
                  style={{ height: "3rem", width: "3rem" }}>
                  <i className="fal fa-cube text-lg"></i>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-start gap-1 sm:gap-0">
                  <span className="d-inline-block sm:hidden font-medium">
                    Block
                  </span>
                  <a
                    className="text-truncate max-w-xs sm:max-w-none"
                    href={`/block/${block.number}`}>
                    {block.number}
                  </a>
                  <div className="text-sm text-gray-400">
                    {timeAgo(block.timestamp)}
                  </div>
                </div>
                <div className="flex-grow flex-shrink-0 flex sm:justify-between items-end sm:items-center">
                  <div className="pr-0 pr-sm-2">
                    <div className="flex flex-wrap gap-1 items-center">
                      <span>Fee Recipient</span>
                      <a className="text-blue-500" href={``}>
                        {formatAddress(block.miner, 6, 6)}
                      </a>
                    </div>
                    <a className="text-blue-500" href="/txs?block=8785457">
                      {block.transactions} txns
                    </a>
                    <span
                      className="hidden sm:inline-block bg-gray-100 text-dark text-sm border border-gray-400 dark:border-white border-opacity-15 rounded-md font-medium py-1 px-2"
                      data-bs-toggle="tooltip">
                      {block.value} Eth
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-1/2 w-full border-2 border-white">
          <Transactions />
        </div>
      </div>
    </div>
  );
}

export default App;
