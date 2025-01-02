import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

// Mock the `usePathname` hook from Next.js
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    pathname: "/loan-management",
  }),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("Sidebar Component", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
    jest.clearAllMocks();
  });

  test("renders correctly when open", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);

    // Check that the sidebar and overlay are rendered
    expect(
      screen.getByRole("button", { name: "Close menu" })
    ).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Loan Management")).toBeInTheDocument();
    expect(screen.getByText("Transactions History")).toBeInTheDocument();

    // Check the Simbrella logo is rendered
    expect(screen.getByAltText("Simbrella Logo")).toBeInTheDocument();
  });

  test("handles backdrop click", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole("presentation"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("handles close button click", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });


  test("renders navigation links and logo", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);

    expect(screen.getByAltText(/simbrella logo/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/loan management/i)).toBeInTheDocument();
    expect(screen.getByText(/transactions history/i)).toBeInTheDocument();
  });

  test("closes when the close button is clicked", () => {
    render(<Sidebar isOpen={true} onClose={onCloseMock} />);

    // Simulate clicking the close button
    const closeButton = screen.getByRole("button", { name: "Close menu" });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
