import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  PlayCircle, 
  Calendar,
  Target,
  Trophy,
  Star,
  CheckCircle,
  Users
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import StatCard from '@/components/StatCard';
import StatsModal from '@/components/StatsModal';
import CertificateModal from '@/components/CertificateModal';
import { useCourses } from '@/contexts/CourseContext';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { useToast } from '@/hooks/use-toast';
import CommunityHub from '@/components/CommunityHub';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { achievements } = useCourses();
  const { enrolledCourses } = useEnrollment();
  const { toast } = useToast();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    items: any[];
  }>({
    isOpen: false,
    title: '',
    items: []
  });
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [isCommunityHubOpen, setIsCommunityHubOpen] = useState(false);

  // Mock data for courses - filter based on enrolled courses and get real-time data
  const allCourses = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      progress: 75,
      duration: "40 hours",
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      title: "Advanced React Patterns", 
      progress: 50,
      duration: "20 hours",
      lastActivity: "Yesterday"
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      progress: 100,
      duration: "15 hours", 
      lastActivity: "Completed"
    },
    {
      id: 1001,
      title: "Full Stack Web Development Bootcamp",
      progress: 25,
      duration: "40 hours",
      lastActivity: "Just enrolled"
    }
  ];

  // Filter courses based on current enrollment state
  const courses = allCourses.filter(course => enrolledCourses.includes(course.id));

  // Mock data for learning paths
  const learningPaths = [
    {
      id: 1,
      title: "Web Development Career Path",
      progress: 60,
      coursesLeft: 5
    },
    {
      id: 2,
      title: "Data Science Career Path",
      progress: 30,
      coursesLeft: 8
    }
  ];

  // Update course count to reflect current enrollments
  const handleStatClick = (type: string) => {
    let items: any[] = [];
    let title = '';

    switch (type) {
      case 'courses':
        title = 'Enrolled Courses';
        items = courses.map(course => ({
          id: course.id,
          title: course.title,
          description: `Progress: ${course.progress}% • Last Activity: ${course.lastActivity}`,
          status: course.progress === 100 ? 'Completed' : 'In Progress',
          date: '2024-05-20'
        }));
        break;
      case 'paths':
        title = 'Learning Paths';
        items = learningPaths.map(path => ({
          id: path.id,
          title: path.title,
          description: `Progress: ${path.progress}% • Courses Left: ${path.coursesLeft}`,
          status: 'In Progress',
          date: '2024-05-20'
        }));
        break;
      case 'achievements':
        title = 'My Achievements';
        items = achievements.map(achievement => ({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          status: 'Earned',
          date: achievement.earnedDate
        }));
        break;
      case 'community':
        setIsCommunityHubOpen(true);
        return;
    }

    setModalState({
      isOpen: true,
      title,
      items
    });
  };

  const handleAchievementClick = (achievement: any) => {
    alert(`Achievement Clicked: ${achievement.title}`);
  };

  const handleCertificateClick = () => {
    setCertificateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
          <p className="text-gray-600">Your personalized learning dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Enrolled Courses"
            value={courses.length.toString()}
            subtitle="+2 this month"
            icon={BookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            onClick={() => handleStatClick('courses')}
          />
          
          <StatCard
            title="Learning Paths"
            value={learningPaths.length.toString()}
            subtitle="+1 this month"
            icon={TrendingUp}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            onClick={() => handleStatClick('paths')}
          />
          
          <StatCard
            title="Achievements"
            value={achievements.length.toString()}
            subtitle="+3 this month"
            icon={Trophy}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            onClick={() => handleStatClick('achievements')}
          />
          
          <StatCard
            title="Community Activity"
            value="12"
            subtitle="+4 this week"
            icon={Users}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            onClick={() => handleStatClick('community')}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Button className="h-16 flex flex-col gap-1" onClick={() => navigate('/courses')}>
            <BookOpen className="h-5 w-5" />
            <span className="text-sm">Browse Courses</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1"
            onClick={() => navigate('/continue-learning')}
          >
            <PlayCircle className="h-5 w-5" />
            <span className="text-sm">Continue Learning</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1"
            onClick={handleCertificateClick}
          >
            <Award className="h-5 w-5" />
            <span className="text-sm">Certificates</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1"
            onClick={() => navigate('/learning-goals')}
          >
            <Target className="h-5 w-5" />
            <span className="text-sm">Learning Goals</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex flex-col gap-1"
            onClick={() => setIsCommunityHubOpen(true)}
          >
            <Users className="h-5 w-5" />
            <span className="text-sm">Community Hub</span>
          </Button>
        </div>

        {/* Courses and Learning Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enrolled Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Courses</CardTitle>
              <CardDescription>Your active courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <Badge variant="outline">{course.lastActivity}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No enrolled courses yet</p>
                  <Button onClick={() => navigate('/courses')}>
                    Browse Courses
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Paths */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Paths</CardTitle>
              <CardDescription>Structured learning programs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
                    <Badge variant="secondary">{path.coursesLeft} courses left</Badge>
                  </div>
                  <Progress value={path.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest accomplishments</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.slice(0, 6).map((achievement) => (
              <div 
                key={achievement.id} 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleAchievementClick(achievement)}
              >
                <div className="flex items-center gap-3 mb-2">
                  {achievement.icon === 'trophy' && <Trophy className="h-5 w-5 text-yellow-500" />}
                  {achievement.icon === 'zap' && <Star className="h-5 w-5 text-blue-500" />}
                  {achievement.icon === 'book-open' && <BookOpen className="h-5 w-5 text-green-500" />}
                  {achievement.icon === 'check-circle' && <CheckCircle className="h-5 w-5 text-purple-500" />}
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-2">Earned on {achievement.earnedDate}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <StatsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        items={modalState.items}
      />

      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
      />

      <CommunityHub
        isOpen={isCommunityHubOpen}
        onClose={() => setIsCommunityHubOpen(false)}
      />
    </div>
  );
};

export default StudentDashboard;
