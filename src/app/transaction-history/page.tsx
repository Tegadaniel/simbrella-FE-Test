"use client";

import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext";

const TransactionHistory: React.FC = () => {
  const { transactionsHis, loading, error } = useAppContext();

  // Sorting and filtering state
  const [sortField, setSortField] = React.useState<"date" | "amount" | null>(
    null
  );
  const [filterType, setFilterType] = React.useState<"credit" | "debit" | null>(
    null
  );

  // Handle sorting
  const sortedTransactions = useMemo(() => {
    if (!sortField) return transactionsHis;
    return [...transactionsHis].sort((a, b) => {
      if (sortField === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === "amount") {
        return b.amount - a.amount;
      }
      return 0;
    });
  }, [sortField, transactionsHis]);

  // Handle filtering
  const filteredTransactions = useMemo(() => {
    if (!filterType) return sortedTransactions;
    return sortedTransactions.filter(
      (transaction) => transaction.type === filterType
    );
  }, [filterType, sortedTransactions]);

  if (loading) return <p className="text-black p-3">Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black mb-4">
        Transaction History
      </h2>

      {/* Sorting Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSortField("date")}
        >
          Sort by Date
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSortField("amount")}
        >
          Sort by Amount
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setSortField(null)}
        >
          Clear Sorting
        </button>
      </div>

      {/* Filtering Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setFilterType("credit")}
        >
          Filter Credit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setFilterType("debit")}
        >
          Filter Debit
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setFilterType(null)}
        >
          Clear Filter
        </button>
      </div>

      {/* Transactions Table */}
      <table className="w-full border-collapse border text-black border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Transaction ID</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">{transaction.id}</td>
              <td className="border border-gray-300 p-2">
                {transaction.userId}
              </td>
              <td
                className={`border border-gray-300 p-2 ${
                  transaction.type !== "credit"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
