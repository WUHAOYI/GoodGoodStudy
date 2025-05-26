import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Calendar, BookOpen, Trophy, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';

const StudentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock student data - in real app, fetch based on ID
  const student = {
    id: parseInt(id || '1'),
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: '/placeholder.svg',
    enrollmentDate: '2024-01-15',
    status: 'active',
    totalHours: 124,
    coursesEnrolled: 5,
    completedCourses: 3,
    averageScore: 85,
    interests: ['Programming', 'AI', 'Web Development'],
    behavior: 'excellent',
    recentActivity: [
      { date: '2024-05-20', action: 'Completed lesson "React Hooks"', course: 'Advanced React' },
      { date: '2024-05-19', action: 'Started new course', course: 'Machine Learning Basics' },
      { date: '2024-05-18', action: 'Submitted assignment', course: 'JavaScript Fundamentals' }
    ],
    courseProgress: [
      { course: 'JavaScript Fundamentals', progress: 100, status: 'completed', score: 92 },
      { course: 'Advanced React', progress: 75, status: 'in_progress', score: 88 },
      { course: 'Machine Learning Basics', progress: 20, status: 'in_progress', score: 0 },
      { course: 'UI/UX Design', progress: 100, status: 'completed', score: 85 },
      { course: 'Node.js Backend', progress: 45, status: 'in_progress', score: 78 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/student-management')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Student Management
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Details</h1>
          <p className="text-gray-600">Detailed view of student information and performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Profile */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">{student.name}</h3>
                <p className="text-gray-600">{student.email}</p>
                <Badge className="mt-2">
                  {student.status}
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Enrolled</p>
                    <p className="font-medium">{student.enrollmentDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Total Learning Time</p>
                    <p className="font-medium">{student.totalHours} hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Average Score</p>
                    <p className="font-medium">{student.averageScore}%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {student.interests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Course progress and learning statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{student.coursesEnrolled}</p>
                  <p className="text-sm text-gray-600">Courses Enrolled</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{student.completedCourses}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{student.totalHours}h</p>
                  <p className="text-sm text-gray-600">Learning Time</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{student.averageScore}%</p>
                  <p className="text-sm text-gray-600">Avg Score</p>
                </div>
              </div>

              <h4 className="font-medium mb-4">Course Progress</h4>
              <div className="space-y-4">
                {student.courseProgress.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium">{course.course}</h5>
                      <Badge variant={course.status === 'completed' ? 'default' : 'outline'}>
                        {course.status === 'completed' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress: {course.progress}%</span>
                      {course.score > 0 && (
                        <span className="text-sm text-gray-600">Score: {course.score}%</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Student's latest learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-600">Course: {activity.course}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
