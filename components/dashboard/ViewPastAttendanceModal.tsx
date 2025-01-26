"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Download, Trash2 } from "lucide-react"

interface PastAttendance {
  id: string
  createdAt: string
  recordCount: number
}

interface ViewPastAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ViewPastAttendanceModal({ isOpen, onClose }: ViewPastAttendanceModalProps) {
  const [pastAttendances, setPastAttendances] = useState<PastAttendance[]>([])

  useEffect(() => {
    if (isOpen) {
      fetchPastAttendances()
    }
  }, [isOpen])

  const fetchPastAttendances = async () => {
    try {
      const response = await fetch("/api/attendance/past")
      if (response.ok) {
        const data = await response.json()
        setPastAttendances(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch past attendances",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching past attendances:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async (id: string) => {
    try {
      const response = await fetch(`/api/attendance/${id}/download`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `attendance_${id}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/attendance/${id}`, { method: "DELETE" })
      if (response.ok) {
        setPastAttendances(pastAttendances.filter((a) => a.id !== id))
        toast({
          title: "Success",
          description: "Attendance deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete attendance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting attendance:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-xl border border-royal-200 max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-royal-800">Past Attendances</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {pastAttendances.map((attendance) => (
            <div key={attendance.id} className="flex items-center justify-between bg-royal-50 p-4 rounded-lg shadow">
              <div>
                <p className="font-semibold text-royal-800">{new Date(attendance.createdAt).toLocaleString()}</p>
                <p className="text-sm text-royal-600">Records: {attendance.recordCount}</p>
              </div>
              <div className="space-x-2">
                <Button
                  onClick={() => handleDownload(attendance.id)}
                  className="bg-sunset-500 hover:bg-sunset-600 transition-colors duration-200"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </Button>
                <Button
                  onClick={() => handleDelete(attendance.id)}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {pastAttendances.length === 0 && <p className="text-center text-gray-500">No past attendances found.</p>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

