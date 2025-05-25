import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import StatsModal from '@/components/StatsModal';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [statsModal, setStatsModal] = useState<{ isOpen: boolean; type: string; title: string }>({
    isOpen: false,
    type: '',
    title: ''
  });

  const enrolledCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      progress: 65,
      totalLessons: 120,
      completedLessons: 78,
      nextLesson: "Building REST APIs with Node.js",
      instructor: "Tech Academy",
      timeLeft: "2 weeks remaining"
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      progress: 100,
      totalLessons: 45,
      completedLessons: 45,
      nextLesson: "Course Completed!",
      instructor: "Marketing Pro",
      timeLeft: "Completed"
    }
  ];

  const achievements = [
    { name: "First Course Completed", icon: Award, color: "text-yellow-600" },
    { name: "Week Streak", icon: Calendar, color: "text-blue-600" },
    { name: "Quick Learner", icon: TrendingUp, color: "text-green-600" }
  ];

  const recommendedCourses = [
    {
      id: 3,
      title: "Advanced React Patterns",
      description: "Based on your Full Stack course",
      instructor: "React Masters",
      rating: 4.7,
      students: 8500
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Expand your programming skills",
      instructor: "Data Science Institute",
      rating: 4.8,
      students: 9340
    }
  ];

  const mockEnrolledCourses = [
    { id: 1, title: "Full Stack Web Development", description: "Complete bootcamp", status: "In Progress", date: "2024-05-01" },
    { id: 2, title: "Digital Marketing Fundamentals", description: "Marketing strategies", status: "Completed", date: "2024-04-15" },
    { id: 3, title: "Python for Data Science", description: "Data analysis with Python", status: "In Progress", date: "2024-05-10" }
  ];

  const mockCompletedCourses = [
    { id: 2, title: "Digital Marketing Fundamentals", description: "Successfully completed", status: "Completed", date: "2024-04-30" },
    { id: 4, title: "Introduction to UX Design", description: "Design principles", status: "Completed", date: "2024-03-20" }
  ];

  const handleStatsClick = (type: string, title: string) => {
    setStatsModal({ isOpen: true, type, title });
  };

  const getStatsData = () => {
    switch (statsModal.type) {
      case 'enrolled':
        return mockEnrolledCourses;
      case 'completed':
        return mockCompletedCourses;
      default:
        return [];
    }
  };

  const handleContinueLearning = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleExploreCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and continue your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Enrolled Courses"
            value="12"
            subtitle=""
            icon={BookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            onClick={() => handleStatsClick('enrolled', 'Enrolled Courses')}
          />
          <StatCard
            title="Completed"
            value="8"
            subtitle=""
            icon={Award}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            onClick={() => handleStatsClick('completed', 'Completed Courses')}
          />
          <StatCard
            title="This Month"
            value="45h"
            subtitle=""
            icon={Clock}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Day Streak"
            value="7"
            subtitle=""
            icon={TrendingUp}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">by {course.instructor}</p>
                      </div>
                      <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                        {course.progress === 100 ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{course.nextLesson}</p>
                        <p className="text-xs text-gray-500">{course.timeLeft}</p>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={course.progress === 100}
                        onClick={() => handleContinueLearning(course.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {course.progress === 100 ? "Completed" : "Continue"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg">
                        <Icon className={`h-5 w-5 ${achievement.color}`} />
                      </div>
                      <span className="font-medium text-gray-900">{achievement.name}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Recommended */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>by {course.instructor}</span>
                        <span>•</span>
                        <span>⭐ {course.rating}</span>
                        <span>•</span>
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleExploreCourse(course.id)}
                      >
                        Explore Course
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Modal */}
      <StatsModal
        isOpen={statsModal.isOpen}
        onClose={() => setStatsModal({ isOpen: false, type: '', title: '' })}
        title={statsModal.title}
        items={getStatsData()}
      />
    </div>
  );
};

export default StudentDashboard;
