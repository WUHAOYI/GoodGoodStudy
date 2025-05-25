
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  PlayCircle, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const ContinueLearning = () => {
  const navigate = useNavigate();

  // Mock data for current learning progress
  const currentCourses = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      progress: 75,
      currentLesson: "Building REST APIs with Node.js",
      totalLessons: 45,
      currentLessonIndex: 34,
      estimatedTime: "15 minutes",
      lastWatched: "2 days ago"
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      progress: 50,
      currentLesson: "Higher Order Components",
      totalLessons: 28,
      currentLessonIndex: 14,
      estimatedTime: "22 minutes",
      lastWatched: "Yesterday"
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      progress: 100,
      currentLesson: "Course Completed",
      totalLessons: 20,
      currentLessonIndex: 20,
      estimatedTime: "0 minutes",
      lastWatched: "1 week ago"
    }
  ];

  const handleContinueCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleBack = () => {
    navigate('/student-dashboard');
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
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Continue Learning</h1>
          <p className="text-gray-600">Pick up where you left off</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                    <Badge variant={course.progress === 100 ? "default" : "secondary"}>
                      {course.progress === 100 ? "Completed" : `${course.progress}% Complete`}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Progress value={course.progress} className="h-2" />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    {course.progress === 100 ? "Course Completed!" : `Current: ${course.currentLesson}`}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.currentLessonIndex}/{course.totalLessons} lessons</span>
                    </div>
                    {course.progress < 100 && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Last watched: {course.lastWatched}</p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => handleContinueCourse(course.id)}
                  disabled={course.progress === 100}
                >
                  {course.progress === 100 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentCourses.filter(c => c.progress < 100).length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All caught up!</h2>
            <p className="text-gray-600 mb-6">You've completed all your current courses.</p>
            <Button onClick={() => navigate('/courses')}>
              Browse New Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinueLearning;
