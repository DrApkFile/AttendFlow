"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-600 to-indigo-600 text-white p-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={toggleSidebar} className="text-white">
            {sidebarOpen ? "<<" : ">>"}
          </button>
          <h1 className={`${sidebarOpen ? "block" : "hidden"} text-xl font-semibold`}>Dashboard</h1>
        </div>
        <nav>
          <Link href="/dashboard" className="flex items-center py-2 px-4 mb-3 hover:bg-blue-700 rounded-lg">
            <FaTachometerAlt className="mr-3 text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Dashboard</span>
          </Link>
          <Link href="/dashboard/attendflow" className="flex items-center py-2 px-4 mb-3 hover:bg-blue-700 rounded-lg">
            <FaUsers className="mr-3 text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>AttendFlow</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center py-2 px-4 mb-3 hover:bg-blue-700 rounded-lg">
            <FaCog className="mr-3 text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-4 mt-3 text-left hover:bg-blue-700 rounded-lg"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 bg-white">{children}</main>
    </div>
  )
}
