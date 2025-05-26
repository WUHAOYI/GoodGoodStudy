
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  Calendar,
  Trash2
} from 'lucide-react';

interface ActivityListProps {
  activities: Array<{
    id: number;
    type: string;
    description: string;
    user: string;
    timestamp: string;
    status: string;
    category: string;
  }>;
  onViewDetails: (activity: any) => void;
  onDeleteActivity: (id: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const ActivityList = ({ 
  activities, 
  onViewDetails, 
  onDeleteActivity,
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter
}: ActivityListProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Activities ({activities.length})</CardTitle>
        <CardDescription>All system activities and user interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
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
                <Button size="sm" variant="outline" onClick={() => onViewDetails(activity)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onDeleteActivity(activity.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {activities.length === 0 && (
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
  );
};

export default ActivityList;
