"use client"

import { useState, useEffect } from "react"
import { useAuth, useAuthenticatedFetch } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Users, TrendingUp, Shield } from "lucide-react"
import { endpoints } from "@/contexts/endpoints"

interface Report {
  id: string
  title: string
  description: string
  type: string
  status: string
  createdAt: string
  reportedBy?: string
}

interface DashboardStats {
  totalReports: number
  activeUsers: number
  resolvedCases: number
  successRate: number
}

interface ScamTypeDistribution {
  type: string
  count: number
  percentage: number
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const authenticatedFetch = useAuthenticatedFetch()
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    activeUsers: 0,
    resolvedCases: 0,
    successRate: 0
  })
  const [recentReports, setRecentReports] = useState<Report[]>([])
  const [scamDistribution, setScamDistribution] = useState<ScamTypeDistribution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      await Promise.all([
        fetchStats(),
        fetchRecentReports(),
        fetchScamDistribution()
      ])
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch all reports to calculate stats
      const response = await authenticatedFetch(endpoints.GET_ALL_REPORTS)
      
      if (response.ok) {
        const data = await response.json()
        const reports = data.results || []
        
        const totalReports = reports.length
        const resolvedCases = reports.filter((report: Report) => 
          report.status === 'closed' || report.status === 'resolved'
        ).length
        
        const successRate = totalReports > 0 ? ((resolvedCases / totalReports) * 100) : 0
        
        // For active users, you might need a separate endpoint
        // For now, we'll use a placeholder or estimate
        const activeUsers = Math.floor(totalReports * 0.7) // Estimate based on reports
        
        setStats({
          totalReports,
          activeUsers,
          resolvedCases,
          successRate: Math.round(successRate * 10) / 10 // Round to 1 decimal
        })
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const fetchRecentReports = async () => {
    try {
      const response = await authenticatedFetch(endpoints.GET_ALL_REPORTS)
      
      if (response.ok) {
        const data = await response.json()
        const reports = data.results || []
        
        // Sort by creation date and take top 3
        const sortedReports = reports
          .sort((a: Report, b: Report) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3)
        
        setRecentReports(sortedReports)
      }
    } catch (error) {
      console.error("Failed to fetch recent reports:", error)
    }
  }

  const fetchScamDistribution = async () => {
    try {
      const response = await authenticatedFetch(endpoints.GET_ALL_REPORTS)
      
      if (response.ok) {
        const data = await response.json()
        const reports = data.results || []
        
        // Count reports by type
        const typeCounts: { [key: string]: number } = {}
        reports.forEach((report: Report) => {
          typeCounts[report.type] = (typeCounts[report.type] || 0) + 1
        })
        
        // Calculate percentages
        const totalReports = reports.length
        const distribution = Object.entries(typeCounts).map(([type, count]) => ({
          type,
          count,
          percentage: totalReports > 0 ? Math.round((count / totalReports) * 100) : 0
        }))
        
        // Sort by count descending
        distribution.sort((a, b) => b.count - a.count)
        
        setScamDistribution(distribution)
      }
    } catch (error) {
      console.error("Failed to fetch scam distribution:", error)
    }
  }

  const formatScamType = (type: string) => {
    return type
  }

  const getPriorityLevel = (report: Report) => {
    const hoursAgo = Math.floor((new Date().getTime() - new Date(report.createdAt).getTime()) / (1000 * 60 * 60))
    
    if (hoursAgo < 6) return { label: "High Priority", color: "bg-red-100 text-red-800", bgColor: "bg-red-50 border-red-200" }
    if (hoursAgo < 24) return { label: "Medium Priority", color: "bg-yellow-100 text-yellow-800", bgColor: "bg-yellow-50 border-yellow-200" }
    return { label: "Low Priority", color: "bg-blue-100 text-blue-800", bgColor: "bg-blue-50 border-blue-200" }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}. Here's your system overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports.toLocaleString()}</div>
            <p className="text-xs text-gray-600">All time reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Estimated active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Resolved Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resolvedCases.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Closed/resolved reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}%</div>
            <p className="text-xs text-gray-600">Resolution rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest scam reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No recent reports found
                </div>
              ) : (
                recentReports.map((report) => {
                  const priority = getPriorityLevel(report)
                  return (
                    <div key={report.id} className={`flex items-center justify-between p-3 rounded-lg border ${priority.bgColor}`}>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-gray-600">
                          {formatScamType(report.type)} • Reported {getTimeAgo(report.createdAt)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scam Type Distribution</CardTitle>
            <CardDescription>Most common scam types in reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scamDistribution.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No distribution data available
                </div>
              ) : (
                scamDistribution.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <span className="text-sm">{formatScamType(item.type)}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 min-w-[40px]">{item.percentage}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}