import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  UserCheck,
  Eye,
  DollarSign,
  Activity,
  Bot,
  FileText,
  GraduationCap,
  FileCheck,
  Database,
  Shield,
  BarChart3,
  ArrowRight,
  Upload,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import CourseManagement from '@/components/CourseManagement';
import SecurityManagement from '@/components/SecurityManagement';
import ActivityAnalytics from '@/components/ActivityAnalytics';
import StatsModal from '@/components/StatsModal';
import ResourceUploadModal from '@/components/ResourceUploadModal';

interface Activity {
  id: number;
  type: string;
  description: string;
  user: string;
  timestamp: string;
  status: string;
  category: string;
}

// Mock data for student activities (workshops, events, comments, etc.)
const mockStudentActivities: Activity[] = [
  {
    id: 1,
    type: 'workshop',
    description: 'React Workshop created by John Doe',
    user: 'John Doe',
    timestamp: '2024-05-26T10:30:00',
    status: 'pending',
    category: 'workshop'
  },
  {
    id: 2,
    type: 'event',
    description: 'Study Group Event created by Jane Smith',
    user: 'Jane Smith',
    timestamp: '2024-05-26T09:45:00',
    status: 'approved',
    category: 'event'
  },
  {
    id: 3,
    type: 'comment',
    description: 'Comment posted by Alice Johnson on React Course',
    user: 'Alice Johnson',
    timestamp: '2024-05-26T08:20:00',
    status: 'approved',
    category: 'comment'
  },
  {
    id: 4,
    type: 'discussion',
    description: 'Discussion started by Bob Williams on JavaScript Tips',
    user: 'Bob Williams',
    timestamp: '2024-05-25T15:30:00',
    status: 'pending',
    category: 'discussion'
  },
  {
    id: 5,
    type: 'resource_share',
    description: 'Resource shared by Charlie Brown for Python beginners',
    user: 'Charlie Brown',
    timestamp: '2024-05-25T14:20:00',
    status: 'approved',
    category: 'resource'
  },
];

// Mock pending courses data
const mockPendingCourses = [
  {
    id: 1,
    title: 'Advanced Machine Learning',
    instructor: 'Dr. Sarah Johnson',
    status: 'pending',
    submissionDate: '2024-05-20',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Digital Marketing Fundamentals',
    instructor: 'Prof. Michael Chen',
    status: 'pending',
    submissionDate: '2024-05-19',
    category: 'Business'
  },
  {
    id: 3,
    title: 'React Native Development',
    instructor: 'Jane Smith',
    status: 'approved',
    submissionDate: '2024-05-18',
    category: 'Technology'
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [resourceUploadModalOpen, setResourceUploadModalOpen] = useState(false);

  const handleViewAllActivities = () => {
    navigate('/activity-management');
  };

  const handleViewPendingActivities = () => {
    navigate('/activity-management?filter=pending');
  };

  const handleViewCompletedActivities = () => {
    navigate('/activity-management?filter=completed');
  };

  const handleActivityManagement = () => {
    navigate('/activity-management');
  };

  const handleViewActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleStudentManagement = () => {
    navigate('/student-management');
  };

  const handleTeacherManagement = () => {
    navigate('/teacher-management');
  };

  const handleContentReview = () => {
    navigate('/content-review');
  };

  const handleResourceManagement = () => {
    navigate('/resource-management');
  };

  const handleSecurityManagement = () => {
    navigate('/security');
  };

  const handleAnalytics = () => {
    navigate('/analytics');
  };

  const handleUploadResource = () => {
    setResourceUploadModalOpen(true);
  };

  const handleResourceUpload = (newResource: any) => {
    console.log('New resource uploaded:', newResource);
  };

  const handleViewCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/course-management/${courseId}`);
  };

  const handleCreateCourse = () => {
    navigate('/course-management/new');
  };

  const getStatsModalData = () => {
    if (!selectedStat) return { title: '', items: [] };

    switch (selectedStat) {
      case 'students':
        return {
          title: 'Student Statistics',
          items: [
            { id: 1, title: 'New Students This Week', description: '342 new registrations', status: 'Active', date: 'Last 7 days' },
            { id: 2, title: 'Active Students', description: '12,847 currently active', status: 'Active', date: 'Current' },
            { id: 3, title: 'Course Completions', description: '1,247 courses completed', status: 'Completed', date: 'This month' },
            { id: 4, title: 'Certificates Issued', description: '956 certificates awarded', status: 'Completed', date: 'This month' }
          ]
        };
      case 'courses':
        return {
          title: 'Course Statistics',
          items: [
            { id: 1, title: 'Total Courses', description: '486 courses available', status: 'Active', date: 'Current' },
            { id: 2, title: 'New Courses This Month', description: '24 courses added', status: 'Active', date: 'This month' },
            { id: 3, title: 'Popular Courses', description: 'React Fundamentals, Data Science', status: 'Active', date: 'Trending' },
            { id: 4, title: 'Course Ratings', description: 'Average 4.6/5 stars', status: 'Active', date: 'Overall' }
          ]
        };
      case 'revenue':
        return {
          title: 'Revenue Analytics',
          items: [
            { id: 1, title: 'Monthly Revenue', description: '$124,580 total earnings', status: 'Active', date: 'This month' },
            { id: 2, title: 'Growth Rate', description: '15.3% increase from last month', status: 'Active', date: 'Growth' },
            { id: 3, title: 'Top Earning Courses', description: 'Advanced Python, Machine Learning', status: 'Active', date: 'Performance' },
            { id: 4, title: 'Payment Processing', description: '99.2% success rate', status: 'Active', date: 'Reliability' }
          ]
        };
      case 'engagement':
        return {
          title: 'Engagement Metrics',
          items: [
            { id: 1, title: 'Average Engagement', description: '87.4% student engagement rate', status: 'Active', date: 'Current' },
            { id: 2, title: 'Session Duration', description: '45 minutes average', status: 'Active', date: 'Average' },
            { id: 3, title: 'Course Completion Rate', description: '73% completion rate', status: 'Active', date: 'Overall' },
            { id: 4, title: 'Student Satisfaction', description: '4.8/5 average rating', status: 'Active', date: 'Feedback' }
          ]
        };
      default:
        return { title: '', items: [] };
    }
  };

  const statsModalData = getStatsModalData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage platform operations and analytics</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/ai-assistant')} className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </Button>
            <Button onClick={() => navigate('/quiz-management')} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quiz Management
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedStat('students')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12.5%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedStat('courses')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">486</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8.2%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedStat('revenue')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$124,580</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedStat('engagement')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.4%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3.1%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Student Activities</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleViewAllActivities}>
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockStudentActivities.slice(0, showAllActivities ? mockStudentActivities.length : 5).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'workshop' ? 'bg-blue-500' :
                        activity.type === 'event' ? 'bg-green-500' :
                        activity.type === 'comment' ? 'bg-yellow-500' : 
                        activity.type === 'discussion' ? 'bg-purple-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewActivityDetails(activity)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {showAllActivities && (
                    <div className="flex justify-center pt-4">
                      <Button variant="outline" onClick={() => setShowAllActivities(false)}>
                        Show Less
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Management Quick Access</CardTitle>
                  <CardDescription>Access key management functions</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleStudentManagement}>
                    <Users className="h-4 w-4 mr-2" />
                    Students
                  </Button>
                  <Button variant="outline" onClick={handleTeacherManagement}>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Teachers
                  </Button>
                  <Button variant="outline" onClick={handleContentReview}>
                    <FileCheck className="h-4 w-4 mr-2" />
                    Content Review
                  </Button>
                  <Button variant="outline" onClick={handleResourceManagement}>
                    <Database className="h-4 w-4 mr-2" />
                    Resources
                  </Button>
                  <Button variant="outline" onClick={handleSecurityManagement}>
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button variant="outline" onClick={handleAnalytics}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleStudentManagement}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Student Management
                    </CardTitle>
                    <CardDescription>Manage student accounts, enrollments, and certificates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold">15,234</div>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate('/student-details/1'); }}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate('/student-analytics'); }}>
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses">
                <CourseManagement 
                  onViewCourse={handleViewCourse}
                  onEditCourse={handleEditCourse}
                  onCreateCourse={handleCreateCourse}
                />
              </TabsContent>

              <TabsContent value="security">
                <SecurityManagement />
              </TabsContent>

              <TabsContent value="resources">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/resource-management')}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      Resource Management
                    </CardTitle>
                    <CardDescription>Manage files, videos, and course materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold">1,247</div>
                        <p className="text-sm text-muted-foreground">Total Resources</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleUploadResource(); }}>
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Resource
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$124,580</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+15.3%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73.2%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Performance</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Quality Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8/5</div>
                  <p className="text-xs text-muted-foreground">Average rating</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Platform performance metrics (excluding student-specific data)</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/analytics')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Activities</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudentActivities.filter(a => a.status === 'pending').length}</div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs" 
                    onClick={handleViewPendingActivities}
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudentActivities.filter(a => a.status === 'approved').length}</div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs"
                    onClick={handleViewCompletedActivities}
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStudentActivities.length}</div>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs"
                    onClick={handleViewAllActivities}
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Activity Management</CardTitle>
                <CardDescription>Monitor and manage student-created activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Button onClick={handleActivityManagement}>
                    <Activity className="h-4 w-4 mr-2" />
                    Manage Activities
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Activity Analytics</CardTitle>
                <CardDescription>Analysis of student-created activities (workshops, events, comments, etc.)</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityAnalytics activities={mockStudentActivities} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <StatsModal
        isOpen={selectedStat !== null}
        onClose={() => setSelectedStat(null)}
        title={statsModalData.title}
        items={statsModalData.items}
      />

      <ResourceUploadModal
        isOpen={resourceUploadModalOpen}
        onClose={() => setResourceUploadModalOpen(false)}
        onUpload={handleResourceUpload}
      />

      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Activity Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Type:</strong> {selectedActivity.type}</p>
                <p><strong>Description:</strong> {selectedActivity.description}</p>
                <p><strong>User:</strong> {selectedActivity.user}</p>
                <p><strong>Time:</strong> {new Date(selectedActivity.timestamp).toLocaleString()}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
