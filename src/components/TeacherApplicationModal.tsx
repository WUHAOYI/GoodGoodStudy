
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Mail, Phone, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeacherApplication {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  expertise: string;
  experience: string;
  courseIdeas: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface TeacherApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: TeacherApplication[];
  onApprove: (applicationId: number) => void;
  onReject: (applicationId: number) => void;
}

const TeacherApplicationModal = ({ 
  isOpen, 
  onClose, 
  applications, 
  onApprove, 
  onReject 
}: TeacherApplicationModalProps) => {
  const [selectedApplication, setSelectedApplication] = useState<TeacherApplication | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleApprove = (application: TeacherApplication) => {
    onApprove(application.id);
    toast({
      title: "Application Approved",
      description: `${application.fullName} has been approved as a teacher.`,
    });
    setSelectedApplication(null);
  };

  const handleReject = (application: TeacherApplication) => {
    onReject(application.id);
    toast({
      title: "Application Rejected",
      description: `${application.fullName}'s application has been rejected.`,
    });
    setSelectedApplication(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teacher Applications</DialogTitle>
          <DialogDescription>
            Review and manage teacher applications
          </DialogDescription>
        </DialogHeader>

        {!selectedApplication ? (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications</h3>
                <p className="text-gray-600">No teacher applications have been submitted yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {applications.map((application) => (
                  <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{application.fullName}</CardTitle>
                          <p className="text-sm text-gray-600">{application.expertise}</p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-600">Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setSelectedApplication(application)}
                        >
                          View Details
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(application)}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(application)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedApplication(null)}
              className="mb-4"
            >
              ← Back to Applications
            </Button>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedApplication.fullName}</CardTitle>
                    <p className="text-gray-600">{selectedApplication.expertise}</p>
                  </div>
                  <Badge className={getStatusColor(selectedApplication.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedApplication.status)}
                      {selectedApplication.status}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Applied Date</label>
                    <p className="text-gray-900">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Experience</label>
                  <p className="text-gray-900 mt-1">{selectedApplication.experience}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Course Ideas</label>
                  <p className="text-gray-900 mt-1">{selectedApplication.courseIdeas}</p>
                </div>

                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedApplication)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Application
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleReject(selectedApplication)}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TeacherApplicationModal;
