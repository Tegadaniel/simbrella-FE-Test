import { NextResponse } from "next/server";
import type { TransactionHistory } from "@/app/types";


export async function GET() {
  const transactionhistory: TransactionHistory[] = [
    {
      id: 1,
      userId: 48329010293,
      amount: 100,
      date: "2023-05-20T10:30:00Z",
      type: "credit",
    },
    {
      id: 2,
      userId: 14929183,
      amount: 75.5,
      date: "2023-05-19T14:45:00Z",
      type: "debit",
    },
    {
      id: 3,
      userId: 14483001,
      amount: 200,
      date: "2023-05-18T09:15:00Z",
      type: "credit",
    },
    {
      id: 4,
      userId: 1242414,
      amount: 50,
      date: "2023-05-17T16:20:00Z",
      type: "debit",
    },
    {
      id: 5,
      userId: 100328484,
      amount: 125.75,
      date: "2023-05-18T11:00:00Z",
      type: "credit",
    },
  ];

  return NextResponse.json(transactionhistory);
}

