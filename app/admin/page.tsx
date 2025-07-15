"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Users, TrendingUp, Shield } from "lucide-react"

export default function AdminDashboardPage() {
  const { user } = useAuth()

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
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-gray-600">+12% from last month</p>
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
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-gray-600">+5% from last month</p>
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
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-gray-600">+8% from last month</p>
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
            <div className="text-2xl font-bold">71.6%</div>
            <p className="text-xs text-gray-600">+2.1% from last month</p>
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
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium">Crypto Investment Scam</p>
                  <p className="text-sm text-gray-600">Reported 2 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">High Priority</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Phishing Email Campaign</p>
                  <p className="text-sm text-gray-600">Reported 4 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium Priority</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Romance Scam</p>
                  <p className="text-sm text-gray-600">Reported 6 hours ago</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Low Priority</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scam Type Distribution</CardTitle>
            <CardDescription>Most common scam types this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Investment Scams</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Phishing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Romance Scams</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Other</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                  <span className="text-sm text-gray-600">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
