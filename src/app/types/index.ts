export interface User {
  id: number;
  name: string;
  email: string;
  accountBalance: string;
}

export interface Transaction {
  id: number;
  userId: number;
  amount: number;
  date: string;
  transactionType: "credit" | "debit";
}


export interface Loan {
  id: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  tenure: number;
  status: "active" | "paid" | "pending";
  amountBorrowed: number;
  purpose: string;
  guarantor: string;
  interestRate: number;
  monthlyPayment: number;
}

export interface TransactionHistory {
  id: number;
  userId: number;
  amount: number;
  date: string;
  type: "credit" | "debit";
}