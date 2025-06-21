import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar,
  Bot,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { enrolledCourses } = useEnrollment();
  const navigate = useNavigate();

  const [stats] = useState([
    { 
      title: 'Courses Enrolled', 
      value: enrolledCourses.length.toString(), 
      subtitle: '+2 this month',
      icon: BookOpen, 
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      title: 'Hours Studied', 
      value: '42', 
      subtitle: '+8 this week',
      icon: Clock, 
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Achievements', 
      value: '15', 
      subtitle: '+3 new badges',
      icon: Award, 
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    { 
      title: 'Goals Completed', 
      value: '8', 
      subtitle: '2 pending',
      icon: Target, 
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
  ]);

  const [learningTrends, setLearningTrends] = useState([
    { label: 'Consistency', value: 'High', trend: 'up' },
    { label: 'Engagement', value: 'Excellent', trend: 'up' },
    { label: 'Pace', value: 'Optimal', trend: 'stable' },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, description: 'Completed "React Fundamentals" course', date: '2024-07-15' },
    { id: 2, description: 'Scored 92% on JavaScript quiz', date: '2024-07-14' },
    { id: 3, description: 'Started "Node.js Advanced" course', date: '2024-07-10' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-2">Continue your learning journey</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/ai-assistant')} className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </Button>
            <Button onClick={() => navigate('/quiz-management')} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Quizzes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span>Progress:</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                  <div className="flex justify-between mt-4">
                    <Badge>{course.category}</Badge>
                    <Button onClick={() => navigate(`/course/${course.id}`)}>Continue Learning</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="flex items-center justify-between">
                  <p className="text-gray-700">{activity.description}</p>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
