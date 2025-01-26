import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { AttendanceManager } from "@/components/dashboard/AttendanceManager"

export default function AttendancePage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <AttendanceManager />
    </DashboardShell>
  )
}

