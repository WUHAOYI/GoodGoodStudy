import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Plus,
  Edit,
  Eye,
  UserPlus,
  GraduationCap,
  Activity,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Students",
      value: "250",
      icon: Users,
      color: "blue"
    },
    {
      title: "Total Courses",
      value: "42",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "Enrollment Rate",
      value: "87%",
      icon: TrendingUp,
      color: "purple"
    },
    {
      title: "Revenue",
      value: "$45,000",
      icon: DollarSign,
      color: "orange"
    }
  ];

  const recentStudents = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@example.com",
      status: "Active"
    },
    {
      id: 2,
      name: "Bob Williams",
      email: "bob.w@example.com",
      status: "Inactive"
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.b@example.com",
      status: "Active"
    },
    {
      id: 4,
      name: "Diana Miller",
      email: "diana.m@example.com",
      status: "Active"
    }
  ];

  const platformActivities = [
    {
      id: 1,
      description: "New course 'React Fundamentals' added",
      timestamp: new Date().toISOString(),
      type: "Course Added"
    },
    {
      id: 2,
      description: "Student Alice Johnson enrolled in 'JavaScript Basics'",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      type: "Enrollment"
    },
    {
      id: 3,
      description: "Teacher Bob Williams created a new quiz",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: "Quiz Created"
    },
    {
      id: 4,
      description: "Payment received for course 'Web Development Pro'",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      type: "Payment"
    }
  ];

  const handleAddStudent = () => {
    navigate('/student-management?action=create');
  };

  const handleEditStudent = (studentId: number) => {
    navigate(`/student-management?action=edit&id=${studentId}`);
  };

  const handleViewStudent = (studentId: number) => {
    navigate(`/student-details/${studentId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button onClick={handleAddStudent}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
            <Button variant="outline" onClick={() => navigate('/teacher-management')}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Manage Teachers
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 w-12 h-12 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{stat.title}</CardTitle>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Students */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Students
              </CardTitle>
              <Button size="sm" onClick={() => navigate('/student-management')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => handleViewStudent(student.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditStudent(student.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {platformActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
