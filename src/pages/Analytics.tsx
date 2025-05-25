
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  Globe,
  ArrowLeft,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Analytics = () => {
  const navigate = useNavigate();

  // Mock analytics data
  const platformMetrics = [
    { month: 'Jan', users: 15000, courses: 120, revenue: 180000, completions: 1200 },
    { month: 'Feb', users: 18000, courses: 135, revenue: 220000, completions: 1450 },
    { month: 'Mar', users: 21000, courses: 142, revenue: 280000, completions: 1650 },
    { month: 'Apr', users: 23500, courses: 150, revenue: 320000, completions: 1800 },
    { month: 'May', users: 24567, courses: 158, revenue: 350000, completions: 1950 },
  ];

  const courseCategories = [
    { name: 'Programming', value: 45, color: '#3b82f6', courses: 72 },
    { name: 'Design', value: 25, color: '#10b981', courses: 40 },
    { name: 'Marketing', value: 20, color: '#f59e0b', courses: 32 },
    { name: 'Business', value: 10, color: '#ef4444', courses: 16 }
  ];

  const userEngagement = [
    { day: 'Mon', activeUsers: 8500, coursesStarted: 120, coursesCompleted: 45 },
    { day: 'Tue', activeUsers: 9200, coursesStarted: 135, coursesCompleted: 52 },
    { day: 'Wed', activeUsers: 8800, coursesStarted: 110, coursesCompleted: 38 },
    { day: 'Thu', activeUsers: 9500, coursesStarted: 145, coursesCompleted: 58 },
    { day: 'Fri', activeUsers: 10200, coursesStarted: 160, coursesCompleted: 65 },
    { day: 'Sat', activeUsers: 7800, coursesStarted: 95, coursesCompleted: 42 },
    { day: 'Sun', activeUsers: 7200, coursesStarted: 85, coursesCompleted: 35 }
  ];

  const topCourses = [
    { id: 1, title: 'Full Stack Web Development', enrollments: 2450, revenue: 735000, rating: 4.8 },
    { id: 2, title: 'Digital Marketing Fundamentals', enrollments: 1890, revenue: 0, rating: 4.6 },
    { id: 3, title: 'React Advanced Patterns', enrollments: 1650, revenue: 495000, rating: 4.9 },
    { id: 4, title: 'Python for Data Science', enrollments: 1420, revenue: 426000, rating: 4.7 },
    { id: 5, title: 'UI/UX Design Principles', enrollments: 1380, revenue: 414000, rating: 4.5 }
  ];

  const revenueData = [
    { month: 'Jan', subscriptions: 150000, courses: 30000 },
    { month: 'Feb', subscriptions: 180000, courses: 40000 },
    { month: 'Mar', subscriptions: 220000, courses: 60000 },
    { month: 'Apr', subscriptions: 250000, courses: 70000 },
    { month: 'May', subscriptions: 280000, courses: 70000 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/admin-dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive platform analytics and insights</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">24,567</p>
                  <p className="text-sm text-green-600">+12.5% from last month</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">158</p>
                  <p className="text-sm text-green-600">+8 new this month</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$350K</p>
                  <p className="text-sm text-green-600">+9.3% from last month</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78.5%</p>
                  <p className="text-sm text-green-600">+2.1% from last month</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Platform Growth */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Platform Growth Over Time</CardTitle>
              <CardDescription>User acquisition and course creation trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={platformMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
                  <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={2} name="Courses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Course Distribution</CardTitle>
              <CardDescription>Courses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={courseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {courseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {courseCategories.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.courses} courses</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly User Engagement</CardTitle>
              <CardDescription>Daily active users and course activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={userEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="activeUsers" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Subscription vs course sales revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="subscriptions" fill="#3b82f6" name="Subscriptions" />
                  <Bar dataKey="courses" fill="#10b981" name="Course Sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Performing Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>Most popular courses by enrollment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{course.enrollments} enrollments</span>
                          <Badge variant="secondary">★ {course.rating}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {course.revenue === 0 ? 'Free' : `$${(course.revenue / 1000).toFixed(0)}K`}
                      </p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Users by region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { region: 'North America', percentage: 45, users: 11055 },
                { region: 'Europe', percentage: 30, users: 7370 },
                { region: 'Asia', percentage: 20, users: 4913 },
                { region: 'Other', percentage: 5, users: 1229 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.region}</p>
                    <p className="text-sm text-gray-600">{item.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Usage</CardTitle>
              <CardDescription>Platform access methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: 'Desktop', percentage: 55 },
                { device: 'Mobile', percentage: 35 },
                { device: 'Tablet', percentage: 10 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="font-medium">{item.device}</p>
                  <p className="font-semibold">{item.percentage}%</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Overall platform statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">Average Completion</p>
                <p className="font-semibold">78.5%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Certificates Issued</p>
                <p className="font-semibold">1,950</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Study Hours</p>
                <p className="font-semibold">45,230</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
