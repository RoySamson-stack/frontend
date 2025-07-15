"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { endpoints } from "@/contexts/endpoints"

export default function ReportScamPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    status: "pending",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(endpoints.CREATE_REPORT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit report")
      }

      toast({
        title: "Report submitted successfully",
        description: "Thank you for helping protect the community!",
      })

      router.push("/dashboard/my-reports")
    } catch (error) {
      toast({
        title: "Failed to submit report",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Report a Scam</h1>
        <p className="text-gray-600">Help protect others by reporting fraudulent activities.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Scam Report Form
          </CardTitle>
          <CardDescription>Please provide as much detail as possible to help us investigate the scam.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the scam"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Scam Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investment_scam">Investment Scam</SelectItem>
                  <SelectItem value="phishing">Phishing</SelectItem>
                  <SelectItem value="romance_scam">Romance Scam</SelectItem>
                  <SelectItem value="lottery_scam">Lottery Scam</SelectItem>
                  <SelectItem value="scam_token">Scam Token</SelectItem>
                  <SelectItem value="fake_airdrop">Fake Airdrop</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about the scam, including how it happened, what was promised, any contact information of the scammer, etc."
                rows={6}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
