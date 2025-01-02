"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../context/AppContext";
import { Loan } from "@/app/types";

const LoanManagement = () => {
  const { loans } = useAppContext();
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [purpose, setPurpose] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const activeLoans = loans.filter((loan: Loan) => loan.status === "active");

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!tenure || isNaN(Number(tenure)) || Number(tenure) <= 0) {
      newErrors.tenure = "Please enter a valid tenure";
    }
    if (!purpose.trim()) {
      newErrors.purpose = "Please enter a purpose for the loan";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success(`Loan request submitted`, {
        position: "top-right",
        duration: 2000,
      });
      // console.log("Loan request submitted:", { amount, tenure, purpose });
      // Reset form
      setAmount("");
      setTenure("");
      setPurpose("");
    }
  };
  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4">Loan Management</h2>

      {activeLoans.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Active Loans</h3>
          <div className="bg-white p-4 rounded shadow mb-4 h-64 overflow-y-auto">
            {activeLoans.map((loan) => (
              <div key={loan.id} className="p-4 border-b last:border-none">
                <p>
                  <strong>Amount:</strong> ${loan.amount}
                </p>
                <p>
                  <strong>Tenure:</strong> {loan.tenure} months
                </p>
                <p>
                  <strong>Purpose:</strong> {loan.purpose}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(loan.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(loan.endDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mb-2">Loan History</h3>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Tenure</th>
              <th className="px-4 py-2 border">Purpose</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan: Loan) => (
              <tr key={loan.id}>
                <td className="px-4 py-2 border">${loan.amount}</td>
                <td className="px-4 py-2 border">{loan.tenure} months</td>
                <td className="px-4 py-2 border">{loan.purpose}</td>
                <td className="px-4 py-2 border">{loan.status}</td>
                <td className="px-4 py-2 border">
                  {new Date(loan.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(loan.endDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mb-2">Request New Loan</h3>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="tenure"
            className="block text-sm font-medium text-gray-700"
          >
            Tenure (months)
          </label>
          <input
            type="number"
            id="tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.tenure && (
            <p className="mt-1 text-sm text-red-600">{errors.tenure}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700"
          >
            Purpose
          </label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Loan Request
        </button>
      </form>
    </div>
  );
};

export default LoanManagement;
