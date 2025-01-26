"use client"

import { Calendar, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"

export function AppSidebar() {
  const { logout } = useAuth()

  return (
    <Sidebar className="bg-white border-r border-royal-200">
      <SidebarHeader>
        <h2 className="px-6 text-2xl font-bold text-royal-800">My Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-royal-600">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-royal-100 transition-colors duration-200">
                  <a href="/dashboard/attendance" className="flex items-center text-royal-700">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Attendance</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-royal-100 transition-colors duration-200">
                  <a href="/dashboard/settings" className="flex items-center text-royal-700">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-4 space-y-2">
        <SidebarMenuButton
          onClick={logout}
          className="w-full justify-start bg-sunset-100 hover:bg-sunset-200 text-sunset-600 transition-colors duration-200"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </SidebarMenuButton>
      </div>
    </Sidebar>
  )
}

