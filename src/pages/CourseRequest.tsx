
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Send, 
  ThumbsUp, 
  MessageSquare, 
  TrendingUp,
  Users,
  Calendar,
  Heart
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CourseRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'programming',
    difficulty: 'beginner'
  });

  const [courseRequests, setCourseRequests] = useState([
    {
      id: 1,
      title: "Advanced Machine Learning with Python",
      description: "A comprehensive course covering deep learning, neural networks, and AI applications",
      category: "data-science",
      difficulty: "advanced",
      votes: 145,
      comments: 23,
      requestedBy: "Alex Johnson",
      requestedDate: "2024-05-20",
      status: "under-review",
      hasVoted: false
    },
    {
      id: 2,
      title: "Mobile App Development with Flutter",
      description: "Learn to build cross-platform mobile apps using Flutter and Dart",
      category: "mobile",
      difficulty: "intermediate",
      votes: 98,
      comments: 15,
      requestedBy: "Sarah Chen",
      requestedDate: "2024-05-18",
      status: "approved",
      hasVoted: true
    },
    {
      id: 3,
      title: "Blockchain Fundamentals",
      description: "Understanding blockchain technology, cryptocurrencies, and smart contracts",
      category: "technology",
      difficulty: "beginner",
      votes: 76,
      comments: 8,
      requestedBy: "Mike Wilson",
      requestedDate: "2024-05-15",
      status: "pending",
      hasVoted: false
    }
  ]);

  const handleSubmitRequest = () => {
    if (newRequest.title && newRequest.description) {
      const request = {
        id: Date.now(),
        ...newRequest,
        votes: 1,
        comments: 0,
        requestedBy: "Current User",
        requestedDate: new Date().toISOString().split('T')[0],
        status: "pending",
        hasVoted: true
      };
      
      setCourseRequests([request, ...courseRequests]);
      setNewRequest({ title: '', description: '', category: 'programming', difficulty: 'beginner' });
      
      toast({
        title: "Course Requested!",
        description: "Your course request has been submitted successfully.",
      });
    }
  };

  const handleVote = (requestId: number) => {
    setCourseRequests(courseRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          votes: request.hasVoted ? request.votes - 1 : request.votes + 1,
          hasVoted: !request.hasVoted
        };
      }
      return request;
    }));

    const request = courseRequests.find(r => r.id === requestId);
    toast({
      title: request?.hasVoted ? "Vote Removed" : "Vote Added",
      description: request?.hasVoted ? "Your vote has been removed." : "Thank you for voting!",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-blue-100 text-blue-800';
      case 'data-science': return 'bg-green-100 text-green-800';
      case 'design': return 'bg-purple-100 text-purple-800';
      case 'business': return 'bg-orange-100 text-orange-800';
      case 'mobile': return 'bg-pink-100 text-pink-800';
      case 'technology': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'under-review': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Course</h1>
          <p className="text-gray-600">Suggest new courses for our platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Request Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Submit Course Request</CardTitle>
                <CardDescription>
                  Tell us what course you'd like to see on our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Course Title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                />
                
                <Textarea
                  placeholder="Course Description - What should this course cover?"
                  rows={4}
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newRequest.category}
                      onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                    >
                      <option value="programming">Programming</option>
                      <option value="data-science">Data Science</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="technology">Technology</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={newRequest.difficulty}
                      onChange={(e) => setNewRequest({...newRequest, difficulty: e.target.value})}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <Button onClick={handleSubmitRequest} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Course Requests */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Course Requests</CardTitle>
                <CardDescription>Popular requests from the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{request.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getCategoryColor(request.category)}>
                          {request.category}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{request.votes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{request.comments}</span>
                          </div>
                        </div>
                        
                        <Button
                          variant={request.hasVoted ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(request.id)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${request.hasVoted ? 'fill-current' : ''}`} />
                          {request.hasVoted ? 'Voted' : 'Vote'}
                        </Button>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Requested by {request.requestedBy} on {request.requestedDate}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRequest;
