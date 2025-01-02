import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon" />,
  Home: () => <div data-testid="home-icon" />,
  Banknote: () => <div data-testid="banknote-icon" />,
  FolderKanban: () => <div data-testid="folder-icon" />,
}));

describe("Header", () => {
  const mockOnMenuToggle = jest.fn();
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    mockOnMenuToggle.mockClear();
    mockUsePathname.mockReturnValue("/");
  });

  test("renders dashboard breadcrumb on home path", () => {
    render(<Header onMenuToggle={mockOnMenuToggle} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  test("renders transactions breadcrumb on transactions path", () => {
    mockUsePathname.mockReturnValue("/transactions");
    render(<Header onMenuToggle={mockOnMenuToggle} />);
    expect(screen.getByText("Transaction History")).toBeInTheDocument();
    expect(screen.getByTestId("banknote-icon")).toBeInTheDocument();
  });

  test("renders loan management breadcrumb on loan path", () => {
    mockUsePathname.mockReturnValue("/loan-management");
    render(<Header onMenuToggle={mockOnMenuToggle} />);
    expect(screen.getByText("Loan Management")).toBeInTheDocument();
    expect(screen.getByTestId("folder-icon")).toBeInTheDocument();
  });

  test("calls onMenuToggle when menu button is clicked", () => {
    render(<Header onMenuToggle={mockOnMenuToggle} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(mockOnMenuToggle).toHaveBeenCalledTimes(1);
  });
});
