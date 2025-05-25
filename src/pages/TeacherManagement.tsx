
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeacherManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for teachers
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      specialization: "Web Development",
      courses: 12,
      students: 3420,
      rating: 4.8,
      joinDate: "2023-01-15",
      status: "Active",
      institution: "Tech Academy"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 987-6543",
      specialization: "Data Science",
      courses: 8,
      students: 2150,
      rating: 4.9,
      joinDate: "2023-03-20",
      status: "Active",
      institution: "Data Institute"
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 456-7890",
      specialization: "Digital Marketing",
      courses: 15,
      students: 4200,
      rating: 4.7,
      joinDate: "2022-11-10",
      status: "Active",
      institution: "Marketing Pro"
    }
  ]);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTeacher = (teacherId: number, teacherName: string) => {
    if (confirm(`Are you sure you want to remove ${teacherName}?`)) {
      setTeachers(teachers.filter(t => t.id !== teacherId));
      toast({
        title: "Teacher Removed",
        description: `${teacherName} has been removed from the platform.`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Management</h1>
            <p className="text-gray-600">Manage teachers and instructors on the platform</p>
          </div>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search teachers by name, email, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <CardDescription className="mt-1">{teacher.specialization}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(teacher.status)}>
                    {teacher.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">Joined {new Date(teacher.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-3 border-t border-b">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="text-lg font-semibold">{teacher.courses}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-lg font-semibold">{teacher.students.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="text-lg font-semibold">{teacher.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Institution:</strong> {teacher.institution}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteTeacher(teacher.id, teacher.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No teachers found</h2>
            <p className="text-gray-600 mb-6">No teachers match your search criteria.</p>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;
