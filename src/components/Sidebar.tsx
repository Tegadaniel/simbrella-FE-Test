"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/loan-management", label: "Loan Management" },
    { href: "/transaction-history", label: "Transactions History" },
  ];

  return (
    <>
      <div
        role="presentation"
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 bg-gray-400 text-white p-4`}
      >
        <div className="flex items-center justify-center mb-8">
          <Image
            src="https://www.simbrella.com/site/templates/img/logo_colored.svg"
            alt="Simbrella Logo"
            style={{ width: "auto", height: "auto" }}
            width={150}
            height={40}
            priority
            className="mt-4"
          />
        </div>
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        <nav className="md:mt-0">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2 px-4 rounded transition-colors duration-200 ${
                    pathname === link.href
                      ? "bg-gray-700 text-white"
                      : " text-gray-600 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
