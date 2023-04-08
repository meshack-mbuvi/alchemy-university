import useBlocks from "../hooks/useBlocks";
import { formatAddress } from "../utils/formatAddress";

export const Transactions = () => {
  const { latestTransactions } = useBlocks();
  return (
    <div className="border rounded-md p-4 mb-6">
      <div className="">Latest transactions</div>
      <div className="border-b -mx-4 mt-4"></div>

      {[...latestTransactions.slice(0, 10)].map(
        ({ hash, from, to, confirmations }, index) => (
          <div
            key={index}
            className="flex border-b py-2 last:border-0 space-x-4">
            <div className="w-1/4 lg:w-5/12">
              <div className="flex flex-col">
                <a
                  className="text-truncate max-w-xs sm:max-w-none"
                  href={`/tx/${hash}`}>
                  {formatAddress(hash, 6, 6)}
                </a>
                <div className="text-sm text-gray-400">
                  {confirmations} confirmations
                </div>
              </div>
            </div>
            <div
              className="w-3/4 lg-w-7/12 
      justify-content-sm-between align-items-end align-items-sm-center">
              <div className="">
                <div className="flex flex-wrap gap-1 items-center">
                  <span>From</span>
                  <p className="text-blue-500">{formatAddress(from, 6, 6)}</p>
                </div>
                <div className="flex flex-wrap gap-1 items-center">
                  <span>To</span>
                  <p className="text-blue-500">{formatAddress(to, 6, 6)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Transactions;
