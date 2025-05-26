
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, User, Briefcase, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTeacherApplications } from '@/contexts/TeacherApplicationContext';

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
  applications: TeacherApplication[];
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const TeacherApplicationModal = ({ 
  applications, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject 
}: TeacherApplicationModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { applications: contextApplications } = useTeacherApplications();

  // Use the most up-to-date applications from context
  const currentApplications = applications.length > 0 ? applications : contextApplications;

  // Reset index when modal opens or applications change
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, currentApplications]);

  if (!currentApplications || currentApplications.length === 0) return null;

  const application = currentApplications[currentIndex];

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

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentApplications.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < currentApplications.length - 1 ? prev + 1 : 0));
  };

  const handleApprove = (id: number) => {
    onApprove(id);
    // Don't close modal, just refresh to show updated status
  };

  const handleReject = (id: number) => {
    onReject(id);
    // Don't close modal, just refresh to show updated status
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              Teacher Application Details
              <span className="text-sm text-gray-500">
                ({currentIndex + 1} of {currentApplications.length})
              </span>
            </div>
            <Badge className={getStatusColor(application.status)}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {currentApplications.length > 1 && (
            <div className="flex justify-between items-center border-b pb-3">
              <Button variant="outline" size="sm" onClick={goToPrevious}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={goToNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

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
                onClick={() => handleApprove(application.id)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Approve Application
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(application.id)}
                className="flex-1"
              >
                Reject Application
              </Button>
            </div>
          )}

          {application.status !== 'pending' && (
            <div className="pt-4 border-t text-center">
              <p className="text-gray-600">
                This application has been {application.status === 'approved' ? 'approved and processed' : 'rejected'}.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherApplicationModal;
