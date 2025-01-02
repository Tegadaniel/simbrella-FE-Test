"use client";

import React from "react";
import { useAppContext } from "@/app/context/AppContext";

export default function Home() {
  const { users, transactions, loading, error } = useAppContext();

  if (loading) return <div className="p-4 text-black">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-black mb-4">User</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 text-black rounded shadow">
            <h3 className="font-bold">Name: {user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Balance: ${user.accountBalance}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-black mt-8 mb-4">
        Recent Transactions
      </h2>
      <div className="overflow-x-auto text-black">
        <table className="w-full border-collapse border text-black border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300">User</th>
              <th className="px-4 py-2 border border-gray-300">
                Transaction Type
              </th>
              <th className="px-4 py-2 border border-gray-300">Amount</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr className="hover:bg-gray-100" key={transaction.id}>
                <td className="px-4 border-gray-300 py-2 border">
                  {users.find((user) => user.id === transaction.userId)?.name}
                </td>
                <td className={`px-4 border-gray-300 py-2 border`}>
                  {transaction.transactionType}
                </td>
                <td
                  className={`px-4 border-gray-300 py-2 border ${
                    transaction.transactionType !== "credit"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-4 border-gray-300 py-2 border">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
