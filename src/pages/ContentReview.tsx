
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, XCircle, Clock, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const ContentReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reviewNotes, setReviewNotes] = useState('');

  // Mock data for the content being reviewed
  const content = {
    id: 1,
    title: "Advanced Python Programming",
    instructor: "Code Master Academy",
    submittedDate: "2024-05-22",
    type: "Course",
    priority: "High",
    description: "An advanced course covering Python programming concepts including decorators, metaclasses, and async programming.",
    price: 199,
    duration: "35 hours",
    level: "Advanced",
    category: "Programming",
    lessons: [
      { title: "Advanced Decorators", duration: "3 hours" },
      { title: "Metaclasses Deep Dive", duration: "4 hours" },
      { title: "Async Programming", duration: "5 hours" },
      { title: "Performance Optimization", duration: "3 hours" }
    ],
    materials: [
      "Course slides (PDF)",
      "Code examples",
      "Practice exercises",
      "Final project template"
    ]
  };

  const handleApprove = () => {
    toast({
      title: "Content Approved",
      description: `${content.title} has been approved and will be published.`,
    });
    navigate('/admin-dashboard');
  };

  const handleReject = () => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Rejection reason required",
        description: "Please provide feedback for the instructor.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Content Rejected",
      description: `${content.title} has been rejected with feedback.`,
    });
    navigate('/admin-dashboard');
  };

  const handleRequestChanges = () => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Change request details required",
        description: "Please specify what changes are needed.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Changes Requested",
      description: `Feedback sent to instructor for ${content.title}.`,
    });
    navigate('/admin-dashboard');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin-dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Review</h1>
              <p className="text-gray-600">Review and approve submitted content</p>
            </div>
          </div>
          <Badge className={getPriorityColor(content.priority)}>
            {content.priority} Priority
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{content.title}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {content.instructor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Submitted {content.submittedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {content.duration}
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{content.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{content.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Price</p>
                    <p className="text-lg font-semibold">${content.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Level</p>
                    <p className="text-lg font-semibold">{content.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Category</p>
                    <p className="text-lg font-semibold">{content.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.lessons.map((lesson, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">Lesson {index + 1}</p>
                      </div>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Materials */}
            <Card>
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {content.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-2 p-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{material}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Actions</CardTitle>
                <CardDescription>Make a decision on this content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve & Publish
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleRequestChanges}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Request Changes
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleReject}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Notes</CardTitle>
                <CardDescription>Add feedback for the instructor</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Provide detailed feedback about the content quality, structure, or areas for improvement..."
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Review Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Content quality verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Learning objectives clear</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Materials complete</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pricing appropriate</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentReview;
