import { NextResponse } from "next/server";
import type { Loan } from "@/app/types";


export async function GET() {
const loans: Loan[] = [
  {
    id: 1,
    amount: 1000,
    startDate: new Date("2021-01-01"),
    endDate: new Date("2021-12-31"),
    status: "active",
    amountBorrowed: 1000,
    guarantor: "John Doe",
    interestRate: 5,
    tenure: 12,
    purpose: "Home Renovation",
    monthlyPayment: 85,
  },
  {
    id: 2,
    amount: 2000,
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-12-31"),
    purpose: "Education",
    status: "paid",
    amountBorrowed: 2000,
    guarantor: "Jane Smith",
    tenure: 6,
    interestRate: 4.5,
    monthlyPayment: 170,
  },
  {
    id: 3,
    amount: 2000,
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-12-31"),
    purpose: "Business Expansion",
    status: "active",
    tenure: 24,
    amountBorrowed: 2000,
    guarantor: "Jane Smith",
    interestRate: 4.5,
    monthlyPayment: 170,
  },
];
  return NextResponse.json(loans);
}
