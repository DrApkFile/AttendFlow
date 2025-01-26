"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { UserCheck } from "lucide-react"

export default function AttendanceFormPage() {
  const params = useParams()
  const [name, setName] = useState("")
  const [matricNumber, setMatricNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/attendance/${params.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, matricNumber }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Attendance recorded successfully",
        })
        setName("")
        setMatricNumber("")
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "Failed to record attendance",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting attendance:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-100 to-sunset-100">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-royal-200 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-royal-800">Record Attendance</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-royal-700">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-royal-300 focus:border-royal-500 focus:ring-royal-500"
            />
          </div>
          <div>
            <Label htmlFor="matricNumber" className="text-royal-700">
              Matric Number
            </Label>
            <Input
              id="matricNumber"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
              required
              className="border-royal-300 focus:border-royal-500 focus:ring-royal-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-royal-600 hover:bg-royal-700 transition-colors duration-200"
            disabled={isSubmitting}
          >
            <UserCheck className="mr-2 h-5 w-5" />
            {isSubmitting ? "Submitting..." : "Submit Attendance"}
          </Button>
        </form>
      </div>
    </div>
  )
}

