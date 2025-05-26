import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  BarChart3,
  Settings,
  Shield,
  Activity,
  TrendingUp,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  UserPlus,
  GraduationCap,
  Award
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StatsModal from '@/components/StatsModal';

interface Activity {
  id: number;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

const mockRecentActivities: Activity[] = [
  {
    id: 1,
    type: 'enrollment',
    description: 'John Doe enrolled in React Fundamentals',
    user: 'John Doe',
    timestamp: '2 minutes ago',
  },
  {
    id: 2,
    type: 'completion',
    description: 'Jane Smith completed Node.js Masterclass',
    user: 'Jane Smith',
    timestamp: '5 minutes ago',
  },
  {
    id: 3,
    type: 'payment',
    description: 'Alice Johnson made a payment for Advanced Python',
    user: 'Alice Johnson',
    timestamp: '10 minutes ago',
  },
  {
    id: 4,
    type: 'enrollment',
    description: 'Bob Williams enrolled in Data Science Bootcamp',
    user: 'Bob Williams',
    timestamp: '15 minutes ago',
  },
  {
    id: 5,
    type: 'completion',
    description: 'Charlie Brown completed Machine Learning A-Z',
    user: 'Charlie Brown',
    timestamp: '20 minutes ago',
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleViewAllActivities = () => {
    alert('View All Activities clicked');
  };

  const handleViewPendingActivities = () => {
    alert('View Pending Activities clicked');
  };

  const handleViewCompletedActivities = () => {
    alert('View Completed Activities clicked');
  };

  const handleManageActivities = () => {
    alert('Manage Activities clicked');
  };

  const handleViewActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || 'Admin'}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/teacher-management')}>
              <UserPlus className="h-4 w-4 mr-2" />
              Teacher Management
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="activities">Activity Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
                    <CardTitle>Recent Activities</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleViewAllActivities}>
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'enrollment' ? 'bg-green-500' :
                        activity.type === 'completion' ? 'bg-blue-500' :
                        activity.type === 'payment' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used admin functions</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => navigate('/analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/content-review')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Content Review
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/security')}>
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </Button>
                  <Button variant="outline" onClick={handleManageActivities}>
                    <Activity className="h-4 w-4 mr-2" />
                    Activity Management
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,847</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+5.2%</span> from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Enrollments</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">956</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management Actions</CardTitle>
                  <CardDescription>Manage student accounts and activities</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                  <Button onClick={() => navigate('/student-management')}>
                    <Users className="h-4 w-4 mr-2" />
                    View All Students
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/student-analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Student Analytics
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/student-performance')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Reports
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Sarah Johnson completed "React Fundamentals"</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Mike Chen enrolled in "Data Science Basics"</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Emma Davis earned certificate for "Web Design"</p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Activities</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
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
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
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
                  <CardTitle className="text-sm font-medium">All Activities</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
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
                <CardDescription>Monitor and manage platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={handleManageActivities}>
                    <Activity className="h-4 w-4 mr-2" />
                    Manage Activities
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure platform settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/settings')} className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    General Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage security and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/security')} className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Review and manage content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/content-review')} className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Content Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <StatsModal
        isOpen={selectedStat !== null}
        onClose={() => setSelectedStat(null)}
        title={statsModalData.title}
        items={statsModalData.items}
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
                <p><strong>Time:</strong> {selectedActivity.timestamp}</p>
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
