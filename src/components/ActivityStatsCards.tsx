
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, Activity } from 'lucide-react';

interface ActivityStatsCardsProps {
  activities: Array<{
    id: number;
    status: string;
  }>;
}

const ActivityStatsCards = ({ activities }: ActivityStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
  );
};

export default ActivityStatsCards;
