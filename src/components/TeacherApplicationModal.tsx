
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, User, Briefcase, Lightbulb } from 'lucide-react';

interface TeacherApplication {
  id: number;
  fullName: string;
  email: string;
  expertise: string;
  experience: string;
  courseIdeas: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface TeacherApplicationModalProps {
  application: TeacherApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const TeacherApplicationModal = ({ 
  application, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}: TeacherApplicationModalProps) => {
  if (!application) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Teacher Application Details
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{application.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Expertise</p>
                <p className="font-medium">{application.expertise}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Applied Date</p>
                <p className="font-medium">{application.appliedDate}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Experience
            </h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {application.experience}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Course Ideas
            </h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {application.courseIdeas}
            </p>
          </div>

          {application.status === 'pending' && (
            <div className="flex gap-4 pt-4 border-t">
              <Button
                onClick={() => onApprove(application.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Application
              </Button>
              <Button
                variant="destructive"
                onClick={() => onReject(application.id)}
                className="flex-1"
              >
                Reject Application
              </Button>
            </div>
          )}

          {application.status !== 'pending' && (
            <div className="pt-4 border-t text-center">
              <p className="text-gray-600">
                This application has been {application.status}.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherApplicationModal;
