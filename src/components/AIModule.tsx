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

  // Updated with real course IDs from the course system
  const mockRecommendations: Recommendation[] = [
    {
      id: 1, // React Fundamentals
      title: "React Fundamentals",
      type: "course",
      description: "Perfect for expanding your web development skills based on your learning history",
      rating: 4.8,
      difficulty: "Beginner",
      category: "Web Development"
    },
    {
      id: 2, // JavaScript Advanced
      title: "JavaScript Advanced",
      type: "course",
      description: "Trending course that aligns with your interests in programming",
      rating: 4.9,
      difficulty: "Advanced",
      category: "Programming"
    },
    {
      id: 3, // Node.js Basics
      title: "Node.js Basics",
      type: "course",
      description: "Recommended based on your recent activity and interests",
      rating: 4.7,
      difficulty: "Intermediate",
      category: "Backend"
    }
  ];

  const mockAnalytics: AnalysisInsight[] = [
    {
      id: 1,
      title: "Average Completion Rate",
      value: "87%",
      trend: "up",
      description: "Students are completing courses at a higher rate this month",
      category: "learning"
    },
    {
      id: 2,
      title: "Engagement Score",
      value: "4.6/5",
      trend: "stable",
      description: "Student engagement remains consistently high",
      category: "engagement"
    },
    {
      id: 3,
      title: "Teaching Effectiveness",
      value: "92%",
      trend: "up",
      description: "Teacher performance indicators show improvement",
      category: "teaching"
    },
    {
      id: 4,
      title: "Quiz Success Rate",
      value: "78%",
      trend: "down",
      description: "Quiz completion rates need attention",
      category: "learning"
    }
  ];

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
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                Personalized Recommendations
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
                        <Badge variant="outline">{rec.difficulty}</Badge>
                        <Button 
                          size="sm"
                          onClick={() => navigate(`/course/${rec.id}`)}
                        >
                          View Details
                        </Button>
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
