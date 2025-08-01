"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Calendar, Edit, Trash2, Save, X } from "lucide-react"
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
  reporterId: string
}

interface EditFormData {
  title: string
  description: string
  type: string
}

export default function MyReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [editingReport, setEditingReport] = useState<Report | null>(null)
  const [editForm, setEditForm] = useState<EditFormData>({ title: "", description: "", type: "" })
  const [saving, setSaving] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
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

  const handleEditClick = (report: Report) => {
    setEditingReport(report)
    setEditForm({
      title: report.title,
      description: report.description,
      type: report.type
    })
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = async () => {
    if (!editingReport) return

    setSaving(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${endpoints.UPDATE_REPORT}/${editingReport.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        const updatedReport = await response.json()
        setReports(reports.map(report => 
          report.id === editingReport.id 
            ? { ...report, ...editForm }
            : report
        ))
        setIsEditDialogOpen(false)
        setEditingReport(null)
        toast({
          title: "Report updated",
          description: "Your report has been updated successfully.",
        })
      } else {
        throw new Error("Failed to update report")
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update the report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEditCancel = () => {
    setIsEditDialogOpen(false)
    setEditingReport(null)
    setEditForm({ title: "", description: "", type: "" })
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

  const scamTypes = [
    { value: "investment_scam", label: "Investment Scam" },
    { value: "phishing", label: "Phishing" },
    { value: "romance_scam", label: "Romance Scam" },
    { value: "lottery_scam", label: "Lottery Scam" },
    { value: "other", label: "Other" }
  ]

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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(report)}
                    >
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Report title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-type">Scam Type</Label>
              <Select 
                value={editForm.type} 
                onValueChange={(value) => setEditForm({ ...editForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scam type" />
                </SelectTrigger>
                <SelectContent>
                  {scamTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Describe the scam incident..."
                rows={6}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={handleEditCancel}
              disabled={saving}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleEditSubmit}
              disabled={saving || !editForm.title || !editForm.description || !editForm.type}
              className="bg-red-600 hover:bg-red-700"
            >
              {saving ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}