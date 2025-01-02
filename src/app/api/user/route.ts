import { NextResponse } from "next/server";
import type { User } from "@/app/types";

export async function GET() {
  const user: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", accountBalance: "2000" },
  ];

  return NextResponse.json(user);
}
