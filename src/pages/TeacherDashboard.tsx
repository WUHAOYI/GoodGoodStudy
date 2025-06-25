
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
import InteractiveStatCard from '@/components/InteractiveStatCard';
import ScrollingActivities from '@/components/ScrollingActivities';

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

  const handleViewCourseDetails = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleEditCourse = (courseId: number) => {
    navigate(`/course-management/${courseId}`);
  };

  function getStatDetails(statType: string) {
    switch (statType) {
      case 'courses':
        return [
          { name: 'Advanced JavaScript', value: '50 students', extra: 'Highest enrollment' },
          { name: 'React Masterclass', value: '65 students', extra: 'Most popular' },
          { name: 'Node.js API Development', value: '35 students', extra: 'Recently updated' },
          { name: 'Python Basics', value: '28 students', extra: 'New course' },
          { name: 'Web Design Fundamentals', value: '42 students', extra: 'High completion rate' },
          { name: 'Database Management', value: '31 students', extra: 'Professional level' },
          { name: 'Mobile Development', value: '19 students', extra: 'Advanced course' }
        ];
      case 'students':
        return [
          { name: 'John Smith', value: 'JavaScript Course', extra: 'Completed 85% - Excellent progress' },
          { name: 'Emily Davis', value: 'React Course', extra: 'Completed 92% - Top performer' },
          { name: 'Michael Johnson', value: 'Node.js Course', extra: 'Completed 78% - Good engagement' },
          { name: 'Sarah Wilson', value: 'Python Course', extra: 'Completed 67% - Needs encouragement' },
          { name: 'David Brown', value: 'Web Design Course', extra: 'Completed 89% - Creative work' }
        ];
      case 'rating':
        return [
          { name: 'Course Content Quality', value: '4.9/5', extra: 'Students love the detailed explanations' },
          { name: 'Teaching Methodology', value: '4.8/5', extra: 'Clear and engaging delivery' },
          { name: 'Assignment Feedback', value: '4.7/5', extra: 'Helpful and constructive comments' },
          { name: 'Response Time', value: '4.8/5', extra: 'Quick responses to student queries' },
          { name: 'Course Structure', value: '4.9/5', extra: 'Well-organized and progressive' }
        ];
      case 'revenue':
        return [
          { name: 'Advanced JavaScript', value: '$3,200', extra: 'Top earning course this month' },
          { name: 'React Masterclass', value: '$4,100', extra: 'Highest revenue generator' },
          { name: 'Node.js API Development', value: '$2,300', extra: 'Steady income source' },
          { name: 'Python Basics', value: '$1,800', extra: 'Growing enrollment' },
          { name: 'Web Design Fundamentals', value: '$700', extra: 'Recently launched' }
        ];
      default:
        return [];
    }
  }

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
          <InteractiveStatCard
            title="Total Courses"
            value={teacherStats.totalCourses.toString()}
            subtitle="Click to view details"
            icon={BookOpen}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            details={getStatDetails('courses')}
          />
          <InteractiveStatCard
            title="Active Students"
            value={teacherStats.activeStudents.toString()}
            subtitle="Click to view details"
            icon={Users}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            details={getStatDetails('students')}
          />
          <InteractiveStatCard
            title="Average Rating"
            value={teacherStats.averageRating.toString()}
            subtitle="Click to view details"
            icon={Award}
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            details={getStatDetails('rating')}
          />
          <InteractiveStatCard
            title="Revenue Generated"
            value={`$${teacherStats.revenueGenerated}`}
            subtitle="Click to view details"
            icon={TrendingUp}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
            details={getStatDetails('revenue')}
          />
        </div>

        {/* Updated layout with proper spacing */}
        <div className="space-y-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleViewCourseDetails(course.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCourse(course.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full">
            <ScrollingActivities />
          </div>
        </div>

        {/* AI Assistant Module */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Teaching Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Create Advanced React Hooks Course</h4>
                <p className="text-sm text-blue-700">High demand topic - 85% of students request advanced React content</p>
              </div>
              <div className="p-3 border rounded-lg bg-green-50">
                <h4 className="font-medium text-green-900 mb-2">Add TypeScript Integration Module</h4>
                <p className="text-sm text-green-700">Popular skill - Would increase course completion by 23%</p>
              </div>
              <div className="p-3 border rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-900 mb-2">Expand Database Design Section</h4>
                <p className="text-sm text-purple-700">Students struggle with this concept - needs more examples</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                Student Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border rounded-lg bg-orange-50">
                <h4 className="font-medium text-orange-900 mb-2">Weak Area: Async Programming</h4>
                <p className="text-sm text-orange-700">67% of students need additional support in this topic</p>
              </div>
              <div className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-900 mb-2">High Interest: Machine Learning</h4>
                <p className="text-sm text-red-700">42 students requested ML course - consider creating one</p>
              </div>
              <div className="p-3 border rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-900 mb-2">Trending: Mobile Development</h4>
                <p className="text-sm text-yellow-700">Search volume increased 156% - great opportunity</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
