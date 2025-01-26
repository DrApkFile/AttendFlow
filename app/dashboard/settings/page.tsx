import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { UserSettings } from "@/components/dashboard/UserSettings"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <UserSettings />
    </DashboardShell>
  )
}

