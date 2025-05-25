import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Play, share } from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { course, orderId, amount } = location.state || {};

  const handleDownloadReceipt = () => {
    toast({
      title: "Preparing Receipt",
      description: "Your receipt is being generated...",
    });

    // Generate receipt content
    const receiptContent = `
PAYMENT RECEIPT
================

Order ID: ${orderId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Course: ${course?.title || 'Unknown Course'}
Instructor: ${course?.instructor || 'Unknown Instructor'}
Amount Paid: $${amount}

Thank you for your purchase!
    `;

    // Create and download receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Receipt Downloaded",
      description: "Your payment receipt has been downloaded successfully.",
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Course Enrollment Success',
          text: `I just enrolled in ${course?.title}! Check it out.`,
          url: window.location.origin + '/course/' + course?.id,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `I just enrolled in ${course?.title}! Check it out: ${window.location.origin}/course/${course?.id}`;
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Link Copied",
          description: "Course link has been copied to clipboard",
        });
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        const shareText = `I just enrolled in ${course?.title}! Check it out: ${window.location.origin}/course/${course?.id}`;
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Link Copied", 
          description: "Course link has been copied to clipboard",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link",
          variant: "destructive"
        });
      }
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Payment information not found</h2>
            <Button onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. You now have access to the course.
          </p>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">${amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Course:</span>
                <span className="font-medium">{course.title}</span>
              </div>
            </CardContent>
          </Card>

          {/* Course Access */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-gray-600">By {course.instructor}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/student-dashboard', { state: { enrolledCourse: course } })}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Learning Now
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/courses')}
              >
                Browse More Courses
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleDownloadReceipt}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-left">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium">Access your course</p>
                  <p className="text-sm text-gray-600">Go to your dashboard to start learning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium">Download materials</p>
                  <p className="text-sm text-gray-600">Access downloadable resources and assignments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium">Get your certificate</p>
                  <p className="text-sm text-gray-600">Complete the course to earn your certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
