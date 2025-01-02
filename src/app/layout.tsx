"use client";

import { useState } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProvider } from "./context/AppContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <div className="flex h-screen bg-white">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header onMenuToggle={toggleSidebar} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {children}
              </main>
              <Toaster richColors />
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
