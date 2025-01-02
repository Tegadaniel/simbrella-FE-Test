import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoanManagement from "./page";
import { AppProvider } from "../context/AppContext";
import { toast } from "sonner";

// Mock dependencies
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockLoans = [
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
];

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <AppProvider>
      {component}
    </AppProvider>
  );
};

describe("LoanManagement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders active loans section", () => {
    renderWithContext(<LoanManagement />);
    expect(screen.getByText("Active Loans")).toBeInTheDocument();
    expect(screen.getByText("Home Improvement")).toBeInTheDocument();
    expect(screen.getByText("$5000")).toBeInTheDocument();
  });

  test("renders loan history table", () => {
    renderWithContext(<LoanManagement />);
    expect(screen.getByText("Loan History")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3); // Header + 2 loans
  });

  test("validates form fields", async () => {
    renderWithContext(<LoanManagement />);

    fireEvent.click(screen.getByText("Submit Loan Request"));

    expect(
      await screen.findByText("Please enter a valid amount")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter a valid tenure")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Please enter a purpose for the loan")
    ).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    renderWithContext(<LoanManagement />);

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByLabelText("Tenure (months)"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByLabelText("Purpose"), {
      target: { value: "Test Purpose" },
    });

    fireEvent.click(screen.getByText("Submit Loan Request"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Loan request submitted",
        expect.any(Object)
      );
    });

    // Check form reset
    expect(screen.getByLabelText("Amount")).toHaveValue("");
    expect(screen.getByLabelText("Tenure (months)")).toHaveValue("");
    expect(screen.getByLabelText("Purpose")).toHaveValue("");
  });

  test("displays all loan details in history table", () => {
    renderWithContext(<LoanManagement />);

    mockLoans.forEach((loan) => {
      expect(screen.getByText(`$${loan.amount}`)).toBeInTheDocument();
      expect(screen.getByText(`${loan.tenure} months`)).toBeInTheDocument();
      expect(screen.getByText(loan.purpose)).toBeInTheDocument();
      expect(screen.getByText(loan.status)).toBeInTheDocument();
    });
  });
});
