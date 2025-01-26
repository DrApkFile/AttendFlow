"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { CreateAttendanceModal } from "./CreateAttendanceModal"
import { ViewPastAttendanceModal } from "./ViewPastAttendanceModal"
import { PlusCircle, ClipboardList, Download, XCircle } from "lucide-react"

interface Attendance {
  id: string
  createdAt: string
  expiresAt: string
  status: "active" | "expired" | "cancelled"
}

export function AttendanceManager() {
  const [activeAttendance, setActiveAttendance] = useState<Attendance | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  useEffect(() => {
    checkActiveAttendance()
  }, [])

  const checkActiveAttendance = async () => {
    try {
      const response = await fetch("/api/attendance/active")
      if (response.ok) {
        const data = await response.json()
        setActiveAttendance(data)
      }
    } catch (error) {
      console.error("Error checking active attendance:", error)
    }
  }

  const handleCreateAttendance = async () => {
    try {
      const response = await fetch("/api/attendance/create", { method: "POST" })
      if (response.ok) {
        const data = await response.json()
        setActiveAttendance(data)
        setIsCreateModalOpen(true)
      } else {
        toast({
          title: "Error",
          description: "Failed to create attendance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating attendance:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleCancelAttendance = async () => {
    if (!activeAttendance) return

    try {
      const response = await fetch(`/api/attendance/${activeAttendance.id}/cancel`, { method: "POST" })
      if (response.ok) {
        setActiveAttendance(null)
        toast({
          title: "Success",
          description: "Attendance cancelled successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel attendance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error cancelling attendance:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDownloadAttendance = async () => {
    if (!activeAttendance) return

    try {
      const response = await fetch(`/api/attendance/${activeAttendance.id}/download`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `attendance_${activeAttendance.id}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        setActiveAttendance(null)
      } else {
        toast({
          title: "Error",
          description: "Failed to download attendance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error downloading attendance:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex space-x-4">
        <Button
          onClick={handleCreateAttendance}
          disabled={!!activeAttendance}
          className="bg-royal-600 hover:bg-royal-700 transition-colors duration-200"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create Attendance
        </Button>
        <Button
          onClick={() => setIsViewModalOpen(true)}
          className="bg-sunset-500 hover:bg-sunset-600 transition-colors duration-200"
        >
          <ClipboardList className="mr-2 h-5 w-5" />
          View Past Attendance
        </Button>
      </div>
      {activeAttendance && (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-royal-200">
          <h2 className="text-2xl font-semibold mb-4 text-royal-800">Active Attendance</h2>
          <p className="text-royal-600">Created at: {new Date(activeAttendance.createdAt).toLocaleString()}</p>
          <p className="text-royal-600">Expires at: {new Date(activeAttendance.expiresAt).toLocaleString()}</p>
          <div className="mt-6 space-x-4">
            <Button
              onClick={handleCancelAttendance}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
            >
              <XCircle className="mr-2 h-5 w-5" />
              Cancel Attendance
            </Button>
            {activeAttendance.status === "expired" && (
              <Button
                onClick={handleDownloadAttendance}
                className="bg-green-500 hover:bg-green-600 transition-colors duration-200"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Attendance
              </Button>
            )}
          </div>
        </div>
      )}
      <CreateAttendanceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        attendanceId={activeAttendance?.id}
      />
      <ViewPastAttendanceModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} />
    </div>
  )
}

