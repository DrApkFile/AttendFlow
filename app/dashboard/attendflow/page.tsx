"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import jsPDF from "jspdf"
import "jspdf-autotable"

export default function AttendFlow() {
  const [attendanceLink, setAttendanceLink] = useState("")
  const [isLinkActive, setIsLinkActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const generateAttendanceLink = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/attendance/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const { linkId } = await response.json()
        const newLink = `${window.location.origin}/attendance/${linkId}`
        setAttendanceLink(newLink)
        setIsLinkActive(true)
        setTimeout(
          () => {
            setIsLinkActive(false)
          },
          15 * 60 * 1000,
        ) // 15 minutes
      } else {
        const { error } = await response.json()
        setError(error || "Failed to generate attendance link")
      }
    } catch (error) {
      setError("An error occurred while generating the attendance link")
    } finally {
      setIsLoading(false)
    }
  }

  const cancelAttendanceLink = () => {
    setAttendanceLink("")
    setIsLinkActive(false)
  }

  const downloadAttendance = async () => {
    setIsLoading(true)
    setError("")
    try {
      const linkId = attendanceLink.split("/").pop()
      const response = await fetch(`/api/attendance/download?linkId=${linkId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        generatePDF(data, linkId)
      } else {
        const { error } = await response.json()
        setError(error || "Failed to download attendance")
      }
    } catch (error) {
      setError("An error occurred while downloading the attendance")
    } finally {
      setIsLoading(false)
    }
  }

  function generatePDF(data: any, linkId: string) {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Attendance Report", 14, 22)
    doc.setFontSize(11)
    doc.text(`Link ID: ${linkId}`, 14, 30)
    doc.text(`Created At: ${new Date(data.createdAt).toLocaleString()}`, 14, 38)
    doc.text(`Expires At: ${new Date(data.expiresAt).toLocaleString()}`, 14, 46)

    const tableColumn = ["Username", "Submitted At"]
    const tableRows = data.submissions.map((sub: any) => [sub.username, new Date(sub.submittedAt).toLocaleString()])

    doc.autoTable({
      startY: 60,
      head: [tableColumn],
      body: tableRows,
    })

    doc.save(`attendance_${linkId}.pdf`)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AttendFlow</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="space-y-4">
        <button
          onClick={generateAttendanceLink}
          disabled={isLoading || isLinkActive}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Attendance Link"}
        </button>
        {attendanceLink && (
          <div>
            <p>Attendance Link: {attendanceLink}</p>
            <button
              onClick={() => navigator.clipboard.writeText(attendanceLink)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Copy Link
            </button>
          </div>
        )}
        {isLinkActive && (
          <button
            onClick={cancelAttendanceLink}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel Active Link
          </button>
        )}
        {!isLinkActive && attendanceLink && (
          <button
            onClick={downloadAttendance}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isLoading ? "Downloading..." : "Download Attendance (PDF)"}
          </button>
        )}
      </div>
    </div>
  )
}

