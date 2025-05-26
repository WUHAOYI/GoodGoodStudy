
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, Plus, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCourses } from '@/contexts/CourseContext';

interface CourseManagementProps {
  onViewCourse: (courseId: number) => void;
  onEditCourse: (courseId: number) => void;
  onCreateCourse: () => void;
}

const CourseManagement = ({ 
  onViewCourse, 
  onEditCourse, 
  onCreateCourse
}: CourseManagementProps) => {
  const { toast } = useToast();
  const { courses, updateReviewStatus } = useCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCourses = courses.filter(course => course.status === 'Under Review');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Pending Deletion': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewCourse = (courseId: number) => {
    onViewCourse(courseId);
    toast({
      title: "Opening Course",
      description: "Navigating to course details...",
    });
  };

  const handleEditCourse = (courseId: number) => {
    onEditCourse(courseId);
    toast({
      title: "Edit Course",
      description: "Opening course editor...",
    });
  };

  const handleCreateCourse = () => {
    onCreateCourse();
    toast({
      title: "Create Course",
      description: "Opening course creation wizard...",
    });
  };

  const handleApproveCourse = (courseId: number) => {
    updateReviewStatus(courseId, 'Published');
    toast({
      title: "Course Approved",
      description: "The course has been approved and published to the catalog.",
      variant: "default",
    });
  };

  const handleRejectCourse = (courseId: number) => {
    updateReviewStatus(courseId, 'Draft', 'Course needs improvements before approval');
    toast({
      title: "Course Rejected",
      description: "The course has been rejected and sent back to draft.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Course Management</h3>
          <p className="text-sm text-gray-600">Manage all courses and review submissions</p>
        </div>
        <Button onClick={handleCreateCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="pending">Pending Review ({pendingCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Courses List */}
          <div className="grid gap-4">
            {filteredCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{course.title}</h4>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Level: {course.level}</span>
                        <span>Students: {course.students}</span>
                        <span>Price: ${course.price}</span>
                        <span>Updated: {course.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewCourse(course.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditCourse(course.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Courses Pending Review</CardTitle>
              <CardDescription>Review and approve or reject course submissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingCourses.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No courses pending review</p>
              ) : (
                pendingCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Level: {course.level}</span>
                          <span>Category: {course.category}</span>
                          <span>Price: ${course.price}</span>
                          <span>Submitted: {course.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewCourse(course.id)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" onClick={() => handleApproveCourse(course.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectCourse(course.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseManagement;
