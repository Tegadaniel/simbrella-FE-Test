"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { User, Transaction, Loan, TransactionHistory } from "@/app/types";

interface AppContextType {
  users: User[];
  transactions: Transaction[];
  loans: Loan[];
  transactionsHis: TransactionHistory[];
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loans, setLoan] = useState<Loan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsHis, setTransactionsHis] = useState<TransactionHistory[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, transactionsRes, loanRes, TransactionHisRes] = await Promise.all([
          fetch("/api/user"),
          fetch("/api/transactions"),
          fetch("/api/loan"),
          fetch("/api/transaction-history"),
        ]);

        if (!usersRes.ok) {
          throw new Error(
            `Failed to fetch users: ${usersRes.status} ${usersRes.statusText}`
          );
        }
        if (!transactionsRes.ok) {
          throw new Error(
            `Failed to fetch transactions: ${transactionsRes.status} ${transactionsRes.statusText}`
          );
        }

        if (!loanRes.ok) {
          throw new Error(
            `Failed to fetch transactions: ${loanRes.status} ${loanRes.statusText}`
          );
        }

         if (!TransactionHisRes.ok) {
           throw new Error(
             `Failed to fetch transactions: ${TransactionHisRes.status} ${TransactionHisRes.statusText}`
           );
         }

        const [usersData, transactionsData, loanData, TransactionHisData] =
          await Promise.all([
            usersRes.json(),
            transactionsRes.json(),
            loanRes.json(),
            TransactionHisRes.json(),
          ]);

        setUsers(usersData);
        setTransactions(transactionsData);
        setLoan(loanData);
        setTransactionsHis(TransactionHisData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{ users, transactions, loans, transactionsHis, loading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
