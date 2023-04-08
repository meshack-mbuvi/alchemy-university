import { Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { alchemy } from "../hooks/useBlocks";
import { timeAgo } from "../utils/time";

export const Block = () => {
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(true);
  const match = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getBlock() {
      const block = await alchemy.core.getBlockWithTransactions(
        +match.blockNumber
      );

      setBlock(block);
    }
    getBlock().then(() => setLoading(false));
  }, [match?.blockNumber]);

  const goBack = () => {
    history.push("/");
  };
  return (
    <div className="flex flex-col my-12 space-y-8">
      <button onClick={goBack} className="bg-blue-400 w-fit p-2 rounded-lg">
        {"<- "}Home
      </button>
      {!loading && block.hash ? (
        <>
          <div className="border-b py-4">
            Block{" "}
            <span className="text-gray-500 ml-4">#{match.blockNumber}</span>
          </div>
          <div className="w-full">
            <div className="rounded-md m-auto p-6 flex-col border">
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Block height</div>{" "}
                <span>{match.blockNumber}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Timestamp:</div>{" "}
                <span>{timeAgo(block.timestamp * 1000)}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Difficulty:</div>{" "}
                <span className="text-blue-400">{block.difficulty}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Base Fee Per Gas:</div>{" "}
                <span className="text-blue-400">
                  {Utils.formatEther(block.baseFeePerGas)} ETH
                </span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Transactions:</div>{" "}
                <span className="text-blue-400">
                  {block.transactions?.length} transactions
                </span>
              </div>

              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Fee recipient:</div>{" "}
                <span className="text-blue-400">{block.miner}</span>
              </div>

              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Gas limit:</div>{" "}
                <span className="text-blue-400">
                  {block.gasLimit.toString()}
                </span>
              </div>

              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Gas used:</div>{" "}
                <span className="text-blue-400">
                  {block.gasUsed.toString()}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="border-b py-4">...Loading</div>
      )}
    </div>
  );
};

export default Block;
