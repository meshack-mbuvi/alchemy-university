// this is a hook to get latest blocks from the blockchain using alchemySDK

import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

export default function useBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    async function getBlocks() {
      const latestBlockNumber = await alchemy.core.getBlockNumber();
      const blocks = [];

      for (let i = 0; i < 10; i++) {
        const block = await alchemy.core.getBlockWithTransactions(
          latestBlockNumber - i
        );
        blocks.push(block);
      }

      setBlocks(blocks);
    }

    getBlocks();
  }, []);

  const processBlocks = () => {
    const latestBlocks = blocks.map((block) => {
      const value = block.transactions.reduce(
        (acc, transaction) =>
          acc + parseFloat(Utils.formatEther(transaction.value)),
        0
      );

      return {
        number: block.number,
        timestamp: block.timestamp * 1000,
        transactions: block.transactions.length,
        miner: block.miner,
        hash: block.hash,
        value,
      };
    });

    const latestTransactions =
      (blocks.length &&
        blocks[0]?.transactions?.map((transaction) => {
          return {
            confirmations: transaction.confirmations,
            hash: transaction.hash,
            from: transaction.from,
            to: transaction.to,
            value: transaction.value,
          };
        })) ||
      [];

    setLatestBlocks(latestBlocks);
    setLatestTransactions(latestTransactions);
  };

  useEffect(() => {
    processBlocks();
  }, [blocks]);

  console.log({ blocks });

  return { latestBlocks, latestTransactions };
}
