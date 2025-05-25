
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Plus, Edit, Trash2, Mail, Phone, Calendar, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  coursesCount: number;
  studentsCount: number;
  status: 'Active' | 'Inactive' | 'Pending';
  specialization: string;
  totalRevenue: number;
}

const TeacherManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 234 567 8901",
      joinedDate: "2024-01-15",
      coursesCount: 8,
      studentsCount: 1245,
      status: "Active",
      specialization: "Web Development",
      totalRevenue: 25600
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 234 567 8902",
      joinedDate: "2024-02-20",
      coursesCount: 5,
      studentsCount: 890,
      status: "Active",
      specialization: "Data Science",
      totalRevenue: 18900
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 234 567 8903",
      joinedDate: "2024-03-10",
      coursesCount: 3,
      studentsCount: 456,
      status: "Pending",
      specialization: "Digital Marketing",
      totalRevenue: 7800
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || teacher.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Teacher Management</h1>
            <p className="text-gray-600">Manage teachers and instructors on the platform</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin-dashboard')}>
              Back to Dashboard
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teachers by name, email, or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? "default" : "outline"}
                  onClick={() => setStatusFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'active' ? "default" : "outline"}
                  onClick={() => setStatusFilter('active')}
                  size="sm"
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? "default" : "outline"}
                  onClick={() => setStatusFilter('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'inactive' ? "default" : "outline"}
                  onClick={() => setStatusFilter('inactive')}
                  size="sm"
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teachers List */}
        <div className="space-y-4">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                        <p className="text-sm text-gray-600">{teacher.specialization}</p>
                      </div>
                      <Badge className={getStatusColor(teacher.status)}>
                        {teacher.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(teacher.joinedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{teacher.coursesCount} courses</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{teacher.coursesCount}</div>
                        <div className="text-xs text-gray-600">Courses</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{teacher.studentsCount.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Students</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">${teacher.totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Revenue</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No teachers found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;
