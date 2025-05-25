
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Download, Share2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: number;
  courseTitle: string;
  completedDate: string;
  instructor: string;
  duration: string;
  grade?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CertificateModal = ({ isOpen, onClose }: CertificateModalProps) => {
  const { toast } = useToast();

  // Mock certificates data
  const certificates: Certificate[] = [
    {
      id: 1,
      courseTitle: "Full Stack Web Development Bootcamp",
      completedDate: "2024-05-15",
      instructor: "Tech Academy",
      duration: "40 hours",
      grade: "A+"
    },
    {
      id: 2,
      courseTitle: "JavaScript Fundamentals",
      completedDate: "2024-04-28",
      instructor: "Code Master Academy",
      duration: "15 hours",
      grade: "A"
    },
    {
      id: 3,
      courseTitle: "React Development Masterclass",
      completedDate: "2024-03-20",
      instructor: "Frontend Pro Institute",
      duration: "25 hours",
      grade: "A-"
    }
  ];

  const handleDownload = (certificate: Certificate) => {
    // Generate certificate content
    const certificateContent = `
CERTIFICATE OF COMPLETION
=========================

This certifies that Student Name has successfully completed:

${certificate.courseTitle}

Instructor: ${certificate.instructor}
Duration: ${certificate.duration}
Grade: ${certificate.grade || 'Pass'}
Completion Date: ${new Date(certificate.completedDate).toLocaleDateString()}

Congratulations on your achievement!
    `;

    // Create and download certificate
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificate_${certificate.courseTitle.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Certificate Downloaded",
      description: `Certificate for ${certificate.courseTitle} has been downloaded.`,
    });
  };

  const handleShare = async (certificate: Certificate) => {
    try {
      const shareText = `I just completed ${certificate.courseTitle} and earned my certificate! 🎓`;
      
      if (navigator.share) {
        await navigator.share({
          title: `Certificate - ${certificate.courseTitle}`,
          text: shareText,
          url: window.location.origin
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Certificate Shared",
          description: "Certificate details copied to clipboard",
        });
      }
    } catch (error) {
      try {
        const shareText = `I just completed ${certificate.courseTitle} and earned my certificate! 🎓`;
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Certificate Shared",
          description: "Certificate details copied to clipboard",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share certificate",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-600" />
            My Certificates
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {certificates.length > 0 ? (
            certificates.map((certificate) => (
              <Card key={certificate.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {certificate.courseTitle}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Completed: {new Date(certificate.completedDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span>Instructor: {certificate.instructor}</span>
                        </div>
                        <div>
                          <span>Duration: {certificate.duration}</span>
                        </div>
                        {certificate.grade && (
                          <div>
                            <span className="font-medium">Grade: {certificate.grade}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare(certificate)}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(certificate)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  {/* Certificate Preview */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border rounded-lg">
                    <div className="text-center">
                      <Award className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-gray-900">Certificate of Completion</h4>
                      <p className="text-gray-600 mt-1">
                        This certifies that <strong>Student Name</strong> has successfully completed
                      </p>
                      <p className="text-lg font-semibold text-blue-700 mt-1">
                        {certificate.courseTitle}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Completed on {new Date(certificate.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No certificates yet</h3>
              <p className="text-gray-500">Complete courses to earn certificates</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
