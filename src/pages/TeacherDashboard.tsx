
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Plus,
  Eye,
  Edit,
  BarChart3,
  Bot,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [teacherStats] = useState({
    totalCourses: 7,
    activeStudents: 150,
    averageRating: 4.8,
    revenueGenerated: 12000,
  });

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript",
      description: "Deep dive into JavaScript concepts",
      students: 50,
      rating: 4.7,
      progress: 80,
    },
    {
      id: 2,
      title: "React Masterclass",
      description: "Build complex UIs with React",
      students: 65,
      rating: 4.9,
      progress: 60,
    },
    {
      id: 3,
      title: "Node.js API Development",
      description: "Create scalable APIs with Node.js",
      students: 35,
      rating: 4.6,
      progress: 70,
    },
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      course: "Advanced JavaScript",
      activity: "New assignment submitted",
      time: "2 hours ago",
    },
    {
      id: 2,
      course: "React Masterclass",
      activity: "Quiz completed by students",
      time: "5 hours ago",
    },
    {
      id: 3,
      course: "Node.js API Development",
      activity: "New discussion started",
      time: "1 day ago",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track student progress</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/course-management/new')} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
            <Button onClick={() => navigate('/ai-assistant')} variant="outline" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </Button>
            <Button onClick={() => navigate('/quiz-management')} variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quiz Management
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={teacherStats.totalCourses.toString()}
            subtitle="+2 this month"
            icon={BookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Active Students"
            value={teacherStats.activeStudents.toString()}
            subtitle="+15 new enrollments"
            icon={Users}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Average Rating"
            value={teacherStats.averageRating.toString()}
            subtitle="Excellent feedback"
            icon={Award}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Revenue Generated"
            value={`$${teacherStats.revenueGenerated}`}
            subtitle="+12% from last month"
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge className="ml-2">
                      {course.progress >= 75 ? "High Engagement" : "Moderate"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Students: {course.students}</span>
                    <span className="text-sm text-gray-500">Rating: {course.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="secondary" size="sm" onClick={() => navigate(`/course-management/${course.id}`)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <Card>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-3">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{activity.course}</p>
                        <p className="text-sm text-gray-600">{activity.activity}</p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
