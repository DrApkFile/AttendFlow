"use client"

import { useState } from "react"
import { AppSidebar } from "./AppSidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen bg-gradient-to-br from-royal-100 to-sunset-100">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <SidebarTrigger className="text-royal-600 hover:text-royal-800 transition-colors duration-200" />
                <h1 className="ml-4 text-2xl font-bold text-royal-800">Dashboard</h1>
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

