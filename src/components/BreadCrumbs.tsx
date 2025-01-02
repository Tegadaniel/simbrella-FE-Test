"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Home, Banknote, FolderKanban } from "lucide-react";

function HomeHeader() {
  return (
    <div className="flex items-center text-center gap-2">
      <Home className="w-5 h-5 text-[#1D2739]" />
      <span className="text-slate-800 text-base font-normal leading-normal">
        Dashboard
      </span>
    </div>
  );
}

function TransactionHistory() {
  return (
    <div className="flex items-center text-center gap-2">
      <Banknote className="w-5 h-5 text-[#1D2739]" />
      <span className="text-slate-800 text-base font-normal leading-normal">
        Transaction History
      </span>
    </div>
  );
}

function LoanManagement() {
  return (
    <div className="flex items-center text-center gap-2">
      <FolderKanban className="w-5 h-5 text-[#1D2739]" />
      <span className="text-slate-800 text-base font-normal leading-normal">
        Loan Management
      </span>
    </div>
  );
}

function BreadCrumbs() {
  const pathname = usePathname();

  let component = null;

  switch (pathname) {
    case "/":
      component = <HomeHeader />;
      break;
    case "/transaction-history":
      component = <TransactionHistory />;
      break;
    case "/loan-management":
      component = <LoanManagement />;
      break;
    default:
      component = null; // Handle unexpected paths if necessary
  }

  return component;
}

export default BreadCrumbs;
