"use client";

import React from "react";
import { SidebarProvider } from "../context/SidebarContext";
import AppSidebar from "../components/AppSidebar";
import Header from "../components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <AppSidebar /> {/* Fixed width sidebar */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header /> {/* Header stays fixed at top */}
          {/* Main content scrolls */}
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};



export default DashboardLayout;
