
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Search,
  ArrowLeft,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import ActivityDetailsModal from '@/components/ActivityDetailsModal';
import ActivityStatsCards from '@/components/ActivityStatsCards';
import ActivityList from '@/components/ActivityList';
import { useToast } from '@/hooks/use-toast';

const ActivityManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Mock activity data
  const [activities, setActivities] = useState([
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
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || activity.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (activityId) => {
    setActivities(prev => prev.filter(activity => activity.id !== activityId));
    toast({
      title: "Activity Deleted",
      description: "The activity has been permanently deleted.",
    });
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now(),
      type: 'manual',
      description: 'New activity added manually',
      user: 'Admin',
      timestamp: new Date().toISOString(),
      status: 'pending',
      category: 'manual'
    };
    setActivities(prev => [newActivity, ...prev]);
    toast({
      title: "Activity Added",
      description: "A new activity has been added.",
    });
  };

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
          <Button onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        {/* Activity Stats */}
        <ActivityStatsCards activities={activities} />

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
        <ActivityList 
          activities={filteredActivities}
          onViewDetails={handleViewDetails}
          onDeleteActivity={handleDeleteActivity}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </div>

      {/* Activity Details Modal */}
      <ActivityDetailsModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
};

export default ActivityManagement;
