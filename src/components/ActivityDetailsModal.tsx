
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ActivityDetailsModalProps {
  activity: any;
  isOpen: boolean;
  onClose: () => void;
}

const ActivityDetailsModal = ({ activity, isOpen, onClose }: ActivityDetailsModalProps) => {
  if (!isOpen || !activity) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Activity Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Activity ID</label>
              <p className="text-sm">{activity.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Type</label>
              <p className="text-sm">{activity.type}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <p className="text-sm">{activity.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">User</label>
              <p className="text-sm">{activity.user}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Category</label>
              <p className="text-sm">{activity.category}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Timestamp</label>
              <p className="text-sm">{new Date(activity.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <Badge className={getStatusColor(activity.status)}>
                {activity.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDetailsModal;
