
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  ArrowLeft,
  Send,
  CheckCircle,
  Clock
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CourseRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    estimatedDuration: '',
    reason: ''
  });

  // Mock data for previous requests
  const [requests] = useState([
    {
      id: 1,
      title: "Advanced TypeScript Patterns",
      category: "Programming",
      status: "Under Review",
      submittedDate: "2024-05-15",
      votes: 23
    },
    {
      id: 2,
      title: "UI/UX Design with Figma",
      category: "Design",
      status: "Approved",
      submittedDate: "2024-04-20",
      votes: 45
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      category: "Programming",
      status: "In Development",
      submittedDate: "2024-03-10",
      votes: 67
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate request submission
    toast({
      title: "Request Submitted!",
      description: "Your course request has been submitted for review.",
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      level: '',
      estimatedDuration: '',
      reason: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "In Development": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    navigate('/categories');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Course</h1>
          <p className="text-gray-600">Suggest a course you'd like to see on our platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Course Request Form</CardTitle>
              <CardDescription>Tell us what course you'd like us to create</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Course Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Advanced Machine Learning with Python"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Programming, Design, Business"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                    >
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Estimated Duration</label>
                    <Input
                      value={formData.estimatedDuration}
                      onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
                      placeholder="e.g., 20 hours"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Course Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe what this course should cover, learning objectives, and key topics..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Why do you need this course?</label>
                  <Textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                    placeholder="Tell us why this course would be valuable to you and other learners..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Previous Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Course Requests</CardTitle>
              <CardDescription>See what other students have requested</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{request.title}</h4>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>{request.category}</span>
                      <span>•</span>
                      <span>{request.votes} votes</span>
                    </div>
                    <span>{new Date(request.submittedDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      👍 Vote for this course
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Want to see more requests? 
                  <Button variant="link" className="p-0 h-auto ml-1">
                    View all requests
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseRequest;
