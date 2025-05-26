
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, FileText, Award, Eye, Trash2, CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface Activity {
  id: number;
  type: 'event' | 'resource' | 'workshop' | 'discussion';
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  participants?: number;
  priority: 'high' | 'medium' | 'low';
}

const ActivityManagement = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'event',
      title: 'React Workshop',
      description: 'Advanced React patterns and best practices',
      creator: 'John Doe',
      createdAt: '2024-05-20',
      status: 'pending',
      participants: 25,
      priority: 'high'
    },
    {
      id: 2,
      type: 'resource',
      title: 'JavaScript Cheat Sheet',
      description: 'Comprehensive guide to JavaScript ES6+ features',
      creator: 'Jane Smith',
      createdAt: '2024-05-19',
      status: 'approved',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'workshop',
      title: 'UI/UX Design Principles',
      description: 'Learn fundamental design principles for web applications',
      creator: 'Mike Johnson',
      createdAt: '2024-05-18',
      status: 'pending',
      participants: 15,
      priority: 'low'
    },
    {
      id: 4,
      type: 'discussion',
      title: 'Career Development Discussion',
      description: 'Share experiences and advice for career growth in tech',
      creator: 'Sarah Wilson',
      createdAt: '2024-05-17',
      status: 'approved',
      participants: 42,
      priority: 'medium'
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'event': return Calendar;
      case 'resource': return FileText;
      case 'workshop': return Award;
      case 'discussion': return Users;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (activityId: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'approved' as const }
          : activity
      )
    );
    toast({
      title: "Activity Approved",
      description: "The activity has been approved and is now visible to students.",
    });
  };

  const handleReject = (activityId: number) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'rejected' as const }
          : activity
      )
    );
    toast({
      title: "Activity Rejected",
      description: "The activity has been rejected and is no longer visible.",
    });
  };

  const handleDelete = (activityId: number) => {
    setActivities(prev => prev.filter(activity => activity.id !== activityId));
    toast({
      title: "Activity Deleted",
      description: "The activity has been permanently deleted.",
    });
  };

  const pendingActivities = activities.filter(a => a.status === 'pending');
  const approvedActivities = activities.filter(a => a.status === 'approved');

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold">{activities.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{pendingActivities.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{approvedActivities.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">
                  {activities.reduce((sum, activity) => sum + (activity.participants || 0), 0)}
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Activities */}
      {pendingActivities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Activities ({pendingActivities.length})</CardTitle>
            <CardDescription>Activities awaiting administrative approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>By {activity.creator}</span>
                            <span>Created {activity.createdAt}</span>
                            {activity.participants && (
                              <span>{activity.participants} participants</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApprove(activity.id)}
                        className="text-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReject(activity.id)}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Activities */}
      <Card>
        <CardHeader>
          <CardTitle>All Activities ({activities.length})</CardTitle>
          <CardDescription>Manage all student activities on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {activity.creator}</span>
                          <span>Created {activity.createdAt}</span>
                          {activity.participants && (
                            <span>{activity.participants} participants</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(activity.priority)}>
                        {activity.priority}
                      </Badge>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {activity.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApprove(activity.id)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(activity.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityManagement;
