import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  Send, 
  Star, 
  TrendingUp, 
  Users, 
  BookOpen,
  BarChart3,
  Target,
  Award,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Recommendation {
  id: number;
  title: string;
  type: 'course' | 'topic' | 'resource';
  description: string;
  rating?: number;
  difficulty?: string;
  category?: string;
}

interface AnalysisInsight {
  id: number;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
  category: 'learning' | 'teaching' | 'engagement';
}

const AIModule = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${user?.name || 'there'}! I'm your AI assistant. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generate recommendations from actual courses in the course library
  const getTeacherRecommendations = (): Recommendation[] => {
    if (user?.role === 'teacher') {
      return [
        {
          id: 1,
          title: "Advanced React Hooks Course",
          type: "course" as const,
          description: "High demand topic - 85% of students request advanced React content. Focus on useContext, useReducer, and custom hooks.",
          category: "Course Creation"
        },
        {
          id: 2,
          title: "TypeScript Integration Module",
          type: "topic" as const,
          description: "Popular skill enhancement - Would increase course completion by 23%. Cover basic types, interfaces, and generics.",
          category: "Knowledge Area"
        },
        {
          id: 3,
          title: "Database Design Fundamentals",
          type: "topic" as const,
          description: "Students struggle with this concept - needs more examples and practical exercises. Focus on normalization and relationships.",
          category: "Knowledge Area"
        },
        {
          id: 4,
          title: "API Development Best Practices",
          type: "course" as const,
          description: "Trending topic with 40% increase in student inquiries. Cover REST APIs, authentication, and error handling.",
          category: "Course Creation"
        },
        {
          id: 5,
          title: "Async Programming Concepts",
          type: "topic" as const,
          description: "67% of students need additional support. Break down promises, async/await, and error handling patterns.",
          category: "Knowledge Area"
        }
      ];
    }
    
    // Fallback to course recommendations for students
    return courses.slice(0, 3).map(course => ({
      id: course.id,
      title: course.title,
      type: "course" as const,
      description: `Perfect for expanding your skills based on your learning history - ${course.description.substring(0, 80)}...`,
      rating: course.rating,
      difficulty: course.level,
      category: course.category
    }));
  };

  // Default analytics for students
  const studentAnalytics: AnalysisInsight[] = [
    {
      id: 1,
      title: "Learning Progress",
      value: "85%",
      trend: "up",
      description: "You're making excellent progress across all enrolled courses.",
      category: "learning"
    },
    {
      id: 2,
      title: "Course Completion Rate",
      value: "92%",
      trend: "up",
      description: "Your completion rate is above average. Keep up the great work!",
      category: "learning"
    },
    {
      id: 3,
      title: "Weekly Study Time",
      value: "8.5 hrs",
      trend: "stable",
      description: "Consistent study habits are helping you maintain steady progress.",
      category: "engagement"
    }
  ];

  // Teacher-specific analytics insights
  const getTeacherAnalytics = (): AnalysisInsight[] => {
    if (user?.role === 'teacher') {
      return [
        {
          id: 1,
          title: "Weak Knowledge Area: Async Programming",
          value: "67%",
          trend: "down",
          description: "Students struggle with promises and async/await concepts. Consider adding more interactive examples.",
          category: "learning"
        },
        {
          id: 2,
          title: "High Interest: Machine Learning",
          value: "42 requests",
          trend: "up",
          description: "Students actively requesting ML course content. Great opportunity for new course creation.",
          category: "engagement"
        },
        {
          id: 3,
          title: "Course Completion Challenge",
          value: "78%",
          trend: "down",
          description: "JavaScript Advanced course has lower completion rates. Consider breaking into smaller modules.",
          category: "teaching"
        },
        {
          id: 4,
          title: "Trending Topic: Mobile Development",
          value: "156% increase",
          trend: "up",
          description: "Search volume and student interest in mobile development is rapidly growing.",
          category: "engagement"
        },
        {
          id: 5,
          title: "Student Feedback: More Practice",
          value: "89%",
          trend: "stable",
          description: "Students consistently request more hands-on coding exercises across all courses.",
          category: "learning"
        }
      ];
    }
    
    // Fallback analytics for students
    return studentAnalytics;
  };

  const mockRecommendations: Recommendation[] = getTeacherRecommendations();
  const mockAnalytics: AnalysisInsight[] = getTeacherAnalytics();

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputMessage, user?.role || 'student'),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (message: string, userRole: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      if (userRole === 'student') {
        return "Based on your learning history and performance, I recommend checking out the React Fundamentals course. It builds on concepts you've already mastered and will help you advance to the next level.";
      } else if (userRole === 'teacher') {
        return "I suggest focusing on interactive teaching methods for your next course. Data shows that students engage 40% more with hands-on projects. Would you like me to suggest some specific techniques?";
      }
    }
    
    if (lowerMessage.includes('progress') || lowerMessage.includes('performance')) {
      return "Your learning progress is excellent! You've completed 85% of your enrolled courses with an average score of 4.3/5. Keep up the great work!";
    }
    
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return "I can help you with quiz-related questions! Are you looking to create a new quiz, review your quiz performance, or get tips for taking quizzes?";
    }
    
    return "I'm here to help with personalized recommendations, learning analytics, and any questions about your educational journey. What would you like to know more about?";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Bot className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">AI Assistant</h1>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="recommendations">
            {user?.role === 'teacher' ? 'Teaching Recommendations' : 'Recommendations'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {user?.role === 'teacher' ? 'Student Analytics' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 mb-4 p-4 border rounded-lg">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your learning journey..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {user?.role === 'teacher' ? 'Course Creation & Knowledge Area Recommendations' : 'Personalized Recommendations'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecommendations.map((rec) => (
                  <Card key={rec.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={rec.type === 'course' ? 'default' : 'secondary'}>
                          {rec.type}
                        </Badge>
                        {rec.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{rec.rating}</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold mb-2">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{rec.category}</Badge>
                        {user?.role === 'teacher' ? (
                          <Button 
                            size="sm"
                            onClick={() => navigate('/course-management/new')}
                          >
                            Create Course
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/course/${rec.id}`)}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                AI-Powered Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAnalytics.map((insight) => (
                  <Card key={insight.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        {getTrendIcon(insight.trend)}
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {insight.value}
                      </div>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      <Badge 
                        variant="outline" 
                        className="mt-2"
                      >
                        {insight.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIModule;
