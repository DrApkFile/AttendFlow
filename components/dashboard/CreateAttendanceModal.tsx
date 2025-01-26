"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Copy, Share2 } from "lucide-react"

interface CreateAttendanceModalProps {
  isOpen: boolean
  onClose: () => void
  attendanceId: string | undefined
}

export function CreateAttendanceModal({ isOpen, onClose, attendanceId }: CreateAttendanceModalProps) {
  const [attendanceLink, setAttendanceLink] = useState("")

  useEffect(() => {
    if (attendanceId) {
      setAttendanceLink(`${window.location.origin}/attendance/${attendanceId}`)
    }
  }, [attendanceId])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(attendanceLink)
    toast({
      title: "Success",
      description: "Attendance link copied to clipboard",
    })
  }

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(attendanceLink)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-xl border border-royal-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-royal-800">Attendance Link Created</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label htmlFor="attendanceLink" className="text-royal-700">
              Attendance Link
            </Label>
            <div className="flex mt-1">
              <Input
                id="attendanceLink"
                value={attendanceLink}
                readOnly
                className="flex-grow border-royal-300 focus:border-royal-500 focus:ring-royal-500"
              />
              <Button
                onClick={handleCopyLink}
                className="ml-2 bg-royal-600 hover:bg-royal-700 transition-colors duration-200"
              >
                <Copy className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleShareWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share on WhatsApp
          </Button>
          <p className="text-sm text-gray-600">
            This link will expire in 2 minutes. Share it with your students to record attendance.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

