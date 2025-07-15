"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { endpoints } from "@/contexts/endpoints"

interface Report {
  id: string
  title: string
  description: string
  type: string
  status: string
  createdAt: string
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMyReports()
  }, [])

  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(endpoints.GET_USER_REPORTS, {
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

  const deleteReport = async (reportId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${endpoints.DELETE_REPORT}/${reportId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setReports(reports.filter((report) => report.id !== reportId))
        toast({
          title: "Report deleted",
          description: "Your report has been deleted successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete the report.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "investment_scam":
        return "bg-red-100 text-red-800"
      case "phishing":
        return "bg-orange-100 text-orange-800"
      case "romance_scam":
        return "bg-pink-100 text-pink-800"
      case "lottery_scam":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600">Manage your submitted scam reports.</p>
        </div>
        <Link href="/dashboard/report">
          <Button className="bg-red-600 hover:bg-red-700">Report New Scam</Button>
        </Link>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">You haven't submitted any reports yet.</p>
              <Link href="/dashboard/report">
                <Button className="bg-red-600 hover:bg-red-700">Submit Your First Report</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={getTypeColor(report.type)}>{report.type}</Badge>
                      <Badge className={getStatusColor(report.status)}>{report.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                  {report.description.length > 200 ? `${report.description.substring(0, 200)}...` : report.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteReport(report.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
