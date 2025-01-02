import { GET } from "./route";
import { NextResponse } from "next/server";

describe("GET /api/user", () => {
  it("should return a list of users", async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response).toBeInstanceOf(NextResponse);
    expect(data).toEqual([
      { id: 1, name: "John Doe", email: "john@example.com", accountBalance: "2000" },
    ]);
  });
});
