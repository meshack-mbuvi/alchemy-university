import { Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { alchemy } from "../../hooks/useBlocks";

export const Transaction = () => {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const match = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getTransactionReceipt() {
      const transaction = await alchemy.core.getTransactionReceipt(
        `${match.hash}`
      );
      setTransaction(transaction);
    }
    getTransactionReceipt().then(() => setLoading(false));
  }, [match?.match]);

  const goBack = () => {
    history.push("/");
  };

  return (
    <div className="flex flex-col my-12 space-y-8">
      <button onClick={goBack} className="bg-blue-400 w-fit p-2 rounded-lg">
        {"<- "}Home
      </button>
      {!loading ? (
        <>
          <div className="w-full">
            <div className="rounded-md m-auto p-6 flex-col border">
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Transaction Hash</div>{" "}
                <span>{transaction.transactionHash}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Confirmations:</div>{" "}
                <span className="text-blue-400">
                  {transaction.confirmations}
                </span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Status:</div>{" "}
                <span className="text-green-400">
                  {transaction.status === 1 ? "Success" : "Pending"}
                </span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Block:</div>{" "}
                <span className="text-blue-400">
                  {transaction.blockNumber.toString()}
                </span>
              </div>

              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">From:</div>{" "}
                <span className="text-blue-400">{transaction.from}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">To:</div>{" "}
                <span className="text-blue-400">{transaction.to}</span>
              </div>
              <div className="flex py-2">
                <div className="text-gray-500 w-1/4">Gas price:</div>{" "}
                <span className="text-gray-900">
                  {Utils.formatUnits(
                    transaction.effectiveGasPrice.toString(),
                    "gwei"
                  ).toString()}{" "}
                  Gwei{" "}
                  <span className="text-gray-500">
                    (
                    {Utils.formatEther(
                      transaction.effectiveGasPrice.toString()
                    )}{" "}
                    ETH)
                  </span>
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

export default Transaction;
