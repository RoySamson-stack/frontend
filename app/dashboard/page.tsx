"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { endpoints } from "@/contexts/endpoints"

interface Report {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
  reportedBy?: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentReports()
  }, [])

  const fetchRecentReports = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(endpoints.GET_ALL_REPORTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setReports(data.results || [])
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "verified":
        return "bg-red-100 text-red-800"
      case "rejected":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return "1 week ago"
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with scam reports today.</p>
      </div>

      {/* Report Button */}
      <div className="flex justify-end">
        <Link href="/dashboard/report">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Report Scam
          </Button>
        </Link>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Recent Reports
          </CardTitle>
          <CardDescription>Latest scam reports from all users</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : reports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No recent reports found
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Reported {formatDate(report.createdAt)}
                      {report.reportedBy && ` by ${report.reportedBy}`}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ml-4 ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}