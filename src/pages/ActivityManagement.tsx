
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Search,
  Filter,
  ArrowLeft,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const ActivityManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'enrollment',
      description: 'Student John Doe enrolled in React Fundamentals',
      user: 'John Doe',
      timestamp: '2024-05-26 10:30:00',
      status: 'completed',
      category: 'enrollment'
    },
    {
      id: 2,
      type: 'completion',
      description: 'Student Jane Smith completed Node.js Masterclass',
      user: 'Jane Smith',
      timestamp: '2024-05-26 09:45:00',
      status: 'completed',
      category: 'completion'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Payment received from Alice Johnson for Advanced Python',
      user: 'Alice Johnson',
      timestamp: '2024-05-26 08:20:00',
      status: 'pending',
      category: 'payment'
    },
    {
      id: 4,
      type: 'course_submission',
      description: 'New course submitted by Dr. Sarah Johnson for review',
      user: 'Dr. Sarah Johnson',
      timestamp: '2024-05-25 16:15:00',
      status: 'pending',
      category: 'course_management'
    },
    {
      id: 5,
      type: 'support_ticket',
      description: 'Support ticket created by Bob Williams',
      user: 'Bob Williams',
      timestamp: '2024-05-25 14:30:00',
      status: 'in_progress',
      category: 'support'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || activity.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Activity Management</h1>
            <p className="text-gray-600">Monitor and manage all platform activities</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search activities by description or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Activities ({filteredActivities.length})</CardTitle>
            <CardDescription>All system activities and user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{activity.description}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{activity.user}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600 mb-6">No activities match your search criteria.</p>
                <Button onClick={() => { setSearchTerm(''); setSelectedFilter('all'); }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activities.filter(a => a.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activities.filter(a => a.status === 'pending').length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activities.filter(a => a.status === 'in_progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{activities.length}</div>
              <div className="text-sm text-gray-600">Total Activities</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;
