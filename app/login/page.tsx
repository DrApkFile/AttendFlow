"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Lock, Mail, User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(username, email, password)
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-100 to-sunset-100">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-royal-200 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-royal-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-royal-700">
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 border-royal-300 focus:border-royal-500 focus:ring-royal-500"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-500 h-5 w-5" />
            </div>
          </div>
          <div>
            <Label htmlFor="email" className="text-royal-700">
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 border-royal-300 focus:border-royal-500 focus:ring-royal-500"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-500 h-5 w-5" />
            </div>
          </div>
          <div>
            <Label htmlFor="password" className="text-royal-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 border-royal-300 focus:border-royal-500 focus:ring-royal-500"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-500 h-5 w-5" />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-royal-600 hover:bg-royal-700 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

