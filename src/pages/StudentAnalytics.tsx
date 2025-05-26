
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, BookOpen, Trophy, TrendingUp, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const StudentAnalytics = () => {
  const navigate = useNavigate();

  const enrollmentData = [
    { month: 'Jan', students: 120, active: 110 },
    { month: 'Feb', students: 135, active: 125 },
    { month: 'Mar', students: 142, active: 135 },
    { month: 'Apr', students: 158, active: 148 },
    { month: 'May', students: 167, active: 156 },
    { month: 'Jun', students: 175, active: 165 }
  ];

  const courseCompletionData = [
    { category: 'Programming', completed: 85, enrolled: 120 },
    { category: 'Design', completed: 65, enrolled: 80 },
    { category: 'Marketing', completed: 45, enrolled: 60 },
    { category: 'Business', completed: 35, enrolled: 50 }
  ];

  const performanceData = [
    { range: '90-100%', students: 45, color: '#10b981' },
    { range: '80-89%', students: 67, color: '#3b82f6' },
    { range: '70-79%', students: 38, color: '#f59e0b' },
    { range: '60-69%', students: 15, color: '#ef4444' },
    { range: 'Below 60%', students: 10, color: '#6b7280' }
  ];

  const learningTimeData = [
    { day: 'Mon', hours: 245 },
    { day: 'Tue', hours: 289 },
    { day: 'Wed', hours: 267 },
    { day: 'Thu', hours: 298 },
    { day: 'Fri', hours: 312 },
    { day: 'Sat', hours: 187 },
    { day: 'Sun', hours: 156 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/admin-dashboard')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Analytics</h1>
          <p className="text-gray-600">Comprehensive analytics and insights about student behavior and performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">1,247</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold">1,156</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Completion</p>
                  <p className="text-2xl font-bold">73%</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-2xl font-bold">15,432</p>
                </div>
                <Clock className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Courses</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Student Enrollment Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment Trends</CardTitle>
              <CardDescription>Monthly student registration and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Total Students" />
                  <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Students" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Completion by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Course Completion by Category</CardTitle>
              <CardDescription>Completion rates across different course categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="#e5e7eb" name="Enrolled" />
                  <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Distribution</CardTitle>
              <CardDescription>Score ranges and student distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="students"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.range}</span>
                    </div>
                    <span className="font-medium">{item.students} students</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Learning Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Learning Activity</CardTitle>
              <CardDescription>Total learning hours by day of week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={learningTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;
