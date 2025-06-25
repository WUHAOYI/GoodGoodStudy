

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
  Bot,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import InteractiveStatCard from '@/components/InteractiveStatCard';
import ScrollingActivities from '@/components/ScrollingActivities';
import AchievementsDisplay from '@/components/AchievementsDisplay';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { enrolledCourses } = useEnrollment();
  const navigate = useNavigate();

  // Filter out courses with missing data
  const validEnrolledCourses = enrolledCourses.filter(course => course && course.title && course.id);

  const [stats] = useState([
    { 
      title: 'Courses Enrolled', 
      value: validEnrolledCourses.length.toString(), 
      subtitle: `${validEnrolledCourses.length} active courses`,
      icon: BookOpen, 
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      details: validEnrolledCourses.map(course => ({
        name: course.title,
        value: `${course.progress}% complete`,
        extra: course.category
      }))
    },
    { 
      title: 'Hours Studied', 
      value: '42', 
      subtitle: '+8 this week',
      icon: Clock, 
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      details: [
        { name: 'React Fundamentals', value: '15 hours', extra: 'Web Development' },
        { name: 'JavaScript Advanced', value: '12 hours', extra: 'Programming' },
        { name: 'Node.js Basics', value: '8 hours', extra: 'Backend' },
        { name: 'CSS Mastery', value: '7 hours', extra: 'Design' }
      ]
    },
    { 
      title: 'Achievements', 
      value: '15', 
      subtitle: '+3 new badges',
      icon: Award, 
      iconBgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      details: [
        { name: 'First Steps', value: 'Completed first course', extra: 'Jun 15' },
        { name: 'Speed Learner', value: '3 courses in one week', extra: 'Jul 1' },
        { name: 'Perfect Score', value: '100% on quiz', extra: 'Jul 10' },
        { name: 'Consistency Master', value: '30 consecutive days', extra: 'Jul 20' }
      ]
    },
    { 
      title: 'Goals Completed', 
      value: '8', 
      subtitle: '2 pending',
      icon: Target, 
      iconBgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      details: [
        { name: 'Complete React Course', value: 'Completed', extra: 'Jul 15' },
        { name: 'Score 90% on Quiz', value: 'Completed', extra: 'Jul 10' },
        { name: 'Study 40 hours', value: 'Completed', extra: 'Jul 20' },
        { name: 'Master JavaScript', value: 'In Progress', extra: '75% done' }
      ]
    },
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
            <InteractiveStatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Enrolled Courses</h2>
          {validEnrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No enrolled courses</h3>
              <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course</p>
              <Button onClick={() => navigate('/courses')}>
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {validEnrolledCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress:</span>
                      <span className="text-sm font-bold text-blue-600">{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="mb-4 h-2" />
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary" className="text-xs">{course.category}</Badge>
                      <Button 
                        onClick={() => navigate(`/course/${course.id}`)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8 mb-8">
          <div className="w-full">
            <ScrollingActivities />
          </div>
          <div className="w-full">
            <AchievementsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

