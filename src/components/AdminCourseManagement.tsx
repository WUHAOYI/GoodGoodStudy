
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Clock,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: number;
  title: string;
  instructor: string;
  status: 'active' | 'pending' | 'draft' | 'archived';
  category: string;
  enrollments: number;
  rating: number;
  createdAt: string;
  description: string;
  price: number;
}

const AdminCourseManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'React Fundamentals',
      instructor: 'John Smith',
      status: 'active',
      category: 'Programming',
      enrollments: 1247,
      rating: 4.8,
      createdAt: '2024-01-15',
      description: 'Learn the basics of React development',
      price: 99
    },
    {
      id: 2,
      title: 'Advanced Machine Learning',
      instructor: 'Dr. Sarah Johnson',
      status: 'pending',
      category: 'Data Science',
      enrollments: 0,
      rating: 0,
      createdAt: '2024-05-20',
      description: 'Deep dive into ML algorithms and techniques',
      price: 199
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Mike Wilson',
      status: 'active',
      category: 'Marketing',
      enrollments: 856,
      rating: 4.6,
      createdAt: '2024-02-10',
      description: 'Complete guide to digital marketing',
      price: 149
    },
    {
      id: 4,
      title: 'Python for Beginners',
      instructor: 'Alice Brown',
      status: 'pending',
      category: 'Programming',
      enrollments: 0,
      rating: 0,
      createdAt: '2024-05-22',
      description: 'Introduction to Python programming',
      price: 79
    }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCourses = courses.filter(course => course.status === 'pending');
  const activeCourses = courses.filter(course => course.status === 'active');

  const handleApproveCourse = (courseId: number) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, status: 'active' as const }
          : course
      )
    );
    toast({
      title: "Course Approved",
      description: "The course has been approved and is now live.",
    });
  };

  const handleRejectCourse = (courseId: number) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, status: 'archived' as const }
          : course
      )
    );
    toast({
      title: "Course Rejected",
      description: "The course has been rejected.",
    });
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses(prev => prev.filter(course => course.id !== courseId));
    toast({
      title: "Course Deleted",
      description: "The course has been permanently deleted.",
    });
  };

  const handleEditCourse = (courseId: number) => {
    toast({
      title: "Edit Course",
      description: `Editing course with ID: ${courseId}`,
    });
    // TODO: Implement edit modal
  };

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      title: 'New Course',
      instructor: 'Admin',
      status: 'draft',
      category: 'General',
      enrollments: 0,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      description: 'Course description',
      price: 0
    };
    setCourses(prev => [...prev, newCourse]);
    toast({
      title: "Course Created",
      description: "New course has been created in draft mode.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
          <p className="text-sm text-gray-600">by {course.instructor}</p>
          <p className="text-xs text-gray-500 mt-1">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <span>Category: {course.category}</span>
            <span>Price: ${course.price}</span>
            {course.enrollments > 0 && <span>{course.enrollments} enrolled</span>}
            {course.rating > 0 && <span>Rating: {course.rating}/5</span>}
          </div>
        </div>
        <Badge className={getStatusColor(course.status)}>
          {course.status}
        </Badge>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleEditCourse(course.id)}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        {course.status === 'pending' && (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleApproveCourse(course.id)}
              className="text-green-600"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleRejectCourse(course.id)}
              className="text-red-600"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => handleDeleteCourse(course.id)}
          className="text-red-600"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-600">Manage courses and review submissions</p>
        </div>
        <Button onClick={handleCreateCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{pendingCourses.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold">{activeCourses.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold">
                  {courses.reduce((sum, course) => sum + course.enrollments, 0)}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({pendingCourses.length})</TabsTrigger>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search courses by title or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Courses ({filteredCourses.length})</CardTitle>
              <CardDescription>Manage all courses on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review ({pendingCourses.length})</CardTitle>
              <CardDescription>Courses awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Courses ({activeCourses.length})</CardTitle>
              <CardDescription>Currently available courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCourseManagement;
