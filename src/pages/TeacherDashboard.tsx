import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock, TrendingUp, Plus, Edit, Eye, DollarSign, BarChart3, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { courses, requestDeletion } = useCourses();
  const { user } = useAuth();
  const { toast } = useToast();

  const myCourses = courses.filter(course => course.status !== 'Pending Deletion');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Sample data for charts
  const enrollmentData = [
    { month: 'Jan', students: 1200 },
    { month: 'Feb', students: 1500 },
    { month: 'Mar', students: 1800 },
    { month: 'Apr', students: 2200 },
    { month: 'May', students: 2800 },
    { month: 'Jun', students: 3200 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 28000 },
    { month: 'May', revenue: 35000 },
    { month: 'Jun', revenue: 42000 }
  ];

  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/course-management/${courseId}`);
  };

  const handleCreateCourse = () => {
    navigate('/course-management/new');
  };

  const handleDeleteCourse = (courseId: number, courseTitle: string) => {
    if (user) {
      requestDeletion(courseId, user.name, 'Teacher requested deletion');
      toast({
        title: "Deletion Request Submitted",
        description: `Your request to delete "${courseTitle}" has been submitted for admin approval.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teaching Dashboard</h1>
            <p className="text-gray-600">Manage your courses and track student progress</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleCreateCourse}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{myCourses.length}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-xs text-green-600">+2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.reduce((total, course) => total + course.students, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-xs text-green-600">+234 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ${myCourses.reduce((total, course) => total + course.revenue, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.length > 0 ? (myCourses.reduce((total, course) => total + course.rating, 0) / myCourses.length).toFixed(1) : '0.0'}
                  </p>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                  <p className="text-xs text-green-600">+0.2 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Student Enrollment Trend
              </CardTitle>
              <CardDescription>Monthly student enrollment growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Revenue Growth
              </CardTitle>
              <CardDescription>Monthly revenue tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* My Courses */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Manage and monitor your published courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600">Last updated: {course.lastUpdated}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>
                      {course.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{course.students.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {course.revenue > 0 ? `$${course.revenue.toLocaleString()}` : 'Free'}
                      </p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900">{course.rating}</p>
                      <p className="text-sm text-gray-600">Rating</p>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewCourse(course.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCourse(course.id)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
