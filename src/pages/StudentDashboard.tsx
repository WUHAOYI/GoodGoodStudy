
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, Target, Trophy, Zap, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/contexts/CourseContext';
import { useState } from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import StatsModal from '@/components/StatsModal';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { courses, achievements } = useCourses();
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({ title: '', items: [] });

  // Mock student data
  const enrolledCourseIds = [1, 2];
  const completedCourseIds = [3];
  const enrolledCourses = courses.filter(course => enrolledCourseIds.includes(course.id));
  const completedCourses = courses.filter(course => completedCourseIds.includes(course.id));

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'zap': return Zap;
      case 'book-open': return BookOpen;
      case 'check-circle': return CheckCircle;
      case 'target': return Target;
      default: return Award;
    }
  };

  const handleViewStats = (type: string) => {
    let items: any[] = [];
    let title = '';

    switch (type) {
      case 'enrolled':
        title = 'Enrolled Courses';
        items = enrolledCourses.map(course => ({
          id: course.id,
          title: course.title,
          description: `${course.level} • ${course.duration}`,
          status: 'In Progress',
          date: course.lastUpdated
        }));
        break;
      case 'completed':
        title = 'Completed Courses';
        items = completedCourses.map(course => ({
          id: course.id,
          title: course.title,
          description: `${course.level} • ${course.duration}`,
          status: 'Completed',
          date: course.lastUpdated
        }));
        break;
      case 'achievements':
        title = 'My Achievements';
        items = achievements.map(achievement => ({
          id: achievement.id,
          title: achievement.title,
          description: achievement.description,
          status: achievement.type,
          date: achievement.earnedDate
        }));
        break;
    }

    setModalData({ title, items });
    setIsStatsModalOpen(true);
  };

  // Learning progress data
  const progressData = [
    { week: 'Week 1', hours: 8, completed: 2 },
    { week: 'Week 2', hours: 12, completed: 3 },
    { week: 'Week 3', hours: 10, completed: 4 },
    { week: 'Week 4', hours: 15, completed: 6 },
    { week: 'Week 5', hours: 18, completed: 8 },
    { week: 'Week 6', hours: 14, completed: 5 }
  ];

  const skillsData = [
    { name: 'Programming', value: 45, color: '#3b82f6' },
    { name: 'Design', value: 30, color: '#10b981' },
    { name: 'Marketing', value: 15, color: '#f59e0b' },
    { name: 'Business', value: 10, color: '#ef4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Track your learning progress and achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Enrolled Courses"
            value={enrolledCourses.length.toString()}
            subtitle="2 in progress"
            icon={BookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            onClick={() => handleViewStats('enrolled')}
          />

          <StatCard
            title="Completed"
            value={completedCourses.length.toString()}
            subtitle="3 certificates earned"
            icon={Award}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            onClick={() => handleViewStats('completed')}
          />

          <StatCard
            title="Study Hours"
            value="127"
            subtitle="This month: 42h"
            icon={Clock}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />

          <StatCard
            title="Achievements"
            value={achievements.length.toString()}
            subtitle="2 new this week"
            icon={Trophy}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
            onClick={() => handleViewStats('achievements')}
          />
        </div>

        {/* Learning Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Weekly study hours and lessons completed</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Line type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={2} name="Hours" />
                  <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Distribution</CardTitle>
              <CardDescription>Your learning focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {skillsData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Current Courses ({enrolledCourses.length})</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.level} • {course.duration}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        In Progress
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Progress: 65%
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements ({achievements.length})</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.slice(0, 4).map((achievement) => {
                  const IconComponent = getAchievementIcon(achievement.icon);
                  return (
                    <Tooltip key={achievement.id}>
                      <TooltipTrigger asChild>
                        <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <div className="bg-yellow-100 p-2 rounded-lg">
                            <IconComponent className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">Earned on {achievement.earnedDate}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {achievement.type}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{achievement.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Courses ({completedCourses.length})</CardTitle>
            <CardDescription>Courses you've successfully finished</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">{course.level} • {course.duration}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Completed: 100% • Rating: {course.rating}/5
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      <Award className="h-4 w-4 mr-1" />
                      Certificate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Modal */}
      <StatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        title={modalData.title}
        items={modalData.items}
      />
    </div>
  );
};

export default StudentDashboard;
