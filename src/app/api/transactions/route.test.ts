import { GET } from "./route";
import { NextResponse } from "next/server";

describe("GET /api/transactions", () => {
  it("should return a JSON response with the correct transactions", async () => {
    const response = await GET();
    const jsonResponse = await response.json();

    const expectedTransactions = [
      {
        id: 1,
        userId: 1,
        transactionType: "debit",
        amount: 100,
        date: "2023-05-20T10:30:00Z",
      },
      {
        id: 2,
        userId: 1,
        transactionType: "debit",
        amount: 75.5,
        date: "2023-05-19T14:45:00Z",
      },
      {
        id: 3,
        userId: 1,
        transactionType: "credit",
        amount: 200,
        date: "2023-05-18T09:15:00Z",
      },
      {
        id: 4,
        userId: 1,
        transactionType: "debit",
        amount: 50,
        date: "2023-05-17T16:20:00Z",
      },
      {
        id: 5,
        userId: 1,
        transactionType: "credit",
        amount: 125.75,
        date: "2023-05-16T11:00:00Z",
      },
    ];

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    expect(jsonResponse).toEqual(expectedTransactions);
  });
});
