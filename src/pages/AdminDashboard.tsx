import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Shield, AlertCircle, CheckCircle, Clock, Eye, BarChart3, Trash2, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/contexts/CourseContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    courses, 
    deletionRequests, 
    pendingReviews, 
    recentActions, 
    approveDeletion, 
    rejectDeletion, 
    directDelete, 
    updateReviewStatus 
  } = useCourses();
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const handleReviewContent = (itemId: number) => {
    navigate(`/content-review/${itemId}`);
  };

  const handleApproveReview = (courseId: number) => {
    updateReviewStatus(courseId, 'Published');
    toast({
      title: "Course Approved",
      description: "The course has been approved and published.",
    });
  };

  const handleRejectReview = (courseId: number) => {
    updateReviewStatus(courseId, 'Draft');
    toast({
      title: "Course Rejected",
      description: "The course has been rejected and returned to draft status.",
    });
  };

  const handleApproveDeletion = (requestId: number) => {
    approveDeletion(requestId);
    toast({
      title: "Deletion Approved",
      description: "The course has been deleted successfully.",
    });
  };

  const handleRejectDeletion = (requestId: number) => {
    rejectDeletion(requestId);
    toast({
      title: "Deletion Rejected",
      description: "The deletion request has been rejected.",
    });
  };

  const handleDirectDelete = (courseId: number, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete "${courseTitle}"? This action cannot be undone.`)) {
      directDelete(courseId);
      toast({
        title: "Course Deleted",
        description: `"${courseTitle}" has been deleted successfully.`,
      });
    }
  };

  // Analytics data
  const platformGrowth = [
    { month: 'Jan', courses: 120, students: 15000, revenue: 180000 },
    { month: 'Feb', courses: 135, students: 18000, revenue: 220000 },
    { month: 'Mar', courses: 142, students: 21000, revenue: 280000 },
    { month: 'Apr', courses: 150, students: 23500, revenue: 320000 },
    { month: 'May', courses: courses.length, students: 24567, revenue: 350000 },
  ];

  const categoryDistribution = [
    { name: 'Programming', value: 45, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#10b981' },
    { name: 'Marketing', value: 20, color: '#f59e0b' },
    { name: 'Business', value: 10, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor platform activity and manage content reviews</p>
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
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  <p className="text-sm text-gray-600">Total Courses</p>
                  <p className="text-xs text-green-600">+6 this week</p>
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
                  <p className="text-2xl font-bold text-gray-900">89</p>
                  <p className="text-sm text-gray-600">Institutions</p>
                  <p className="text-xs text-green-600">+3 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pendingReviews.length + deletionRequests.length}</p>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-xs text-red-600">{pendingReviews.filter(r => r.priority === 'High').length} high priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">24,567</p>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-xs text-green-600">+1,234 this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Platform Growth
              </CardTitle>
              <CardDescription>Track overall platform performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={platformGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="Students" />
                  <Line type="monotone" dataKey="courses" stroke="#10b981" strokeWidth={2} name="Courses" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pending Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Content waiting for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">by {item.instructor}</p>
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">{item.type}</span> • Submitted {item.submittedDate}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReviewContent(item.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApproveReview(item.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectReview(item.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.slice(0, 5).map((action) => (
                  <div key={action.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getActionIcon(action.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{action.action}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-600">{action.user}</p>
                        <p className="text-xs text-gray-500">{action.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deletion Requests */}
        {deletionRequests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Deletion Requests</CardTitle>
              <CardDescription>Course deletion requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deletionRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{request.courseTitle}</h3>
                        <p className="text-sm text-gray-600">Requested by {request.requestedBy}</p>
                        {request.reason && <p className="text-sm text-gray-500">Reason: {request.reason}</p>}
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        Pending Deletion
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Requested on {request.requestedAt}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApproveDeletion(request.id)}
                          className="text-red-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectDeletion(request.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Courses Management */}
        <Card>
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
            <CardDescription>Manage all courses on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600">Last updated: {course.lastUpdated}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={
                        course.status === 'Published' ? 'bg-green-100 text-green-800' :
                        course.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        course.status === 'Pending Deletion' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {course.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDirectDelete(course.id, course.title)}
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

export default AdminDashboard;
