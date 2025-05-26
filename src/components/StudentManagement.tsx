import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, Search, Eye, Ban, CheckCircle, AlertTriangle, BookOpen, Trophy, TrendingUp, Filter, Award, UserPlus, UserMinus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useEnrollment } from '@/contexts/EnrollmentContext';

interface Student {
  id: number;
  name: string;
  email: string;
  enrollmentDate: string;
  coursesEnrolled: number;
  completedCourses: number;
  status: 'active' | 'inactive' | 'suspended';
  lastActivity: string;
  totalHours: number;
  averageScore: number;
  interests: string[];
  behavior: 'excellent' | 'good' | 'warning' | 'poor';
  enrolledCourseIds: number[];
  certificates: Array<{
    id: number;
    courseName: string;
    issueDate: string;
    status: 'active' | 'revoked';
  }>;
}

const StudentManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { enrollInCourse, unenrollFromCourse } = useEnrollment();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [courseManagementOpen, setCourseManagementOpen] = useState(false);
  const [certificateManagementOpen, setCertificateManagementOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      enrollmentDate: '2024-01-15',
      coursesEnrolled: 5,
      completedCourses: 3,
      status: 'active',
      lastActivity: '2 hours ago',
      totalHours: 124,
      averageScore: 85,
      interests: ['Programming', 'AI', 'Web Development'],
      behavior: 'excellent',
      enrolledCourseIds: [1, 2, 3],
      certificates: [
        { id: 1, courseName: 'JavaScript Fundamentals', issueDate: '2024-04-15', status: 'active' },
        { id: 2, courseName: 'React Basics', issueDate: '2024-05-10', status: 'active' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      enrollmentDate: '2024-02-01',
      coursesEnrolled: 3,
      completedCourses: 2,
      status: 'active',
      lastActivity: '1 day ago',
      totalHours: 87,
      averageScore: 92,
      interests: ['Design', 'UI/UX', 'Creative Writing'],
      behavior: 'excellent',
      enrolledCourseIds: [4, 5],
      certificates: [
        { id: 3, courseName: 'UI/UX Design', issueDate: '2024-05-20', status: 'active' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      enrollmentDate: '2024-01-20',
      coursesEnrolled: 4,
      completedCourses: 1,
      status: 'active',
      lastActivity: '3 days ago',
      totalHours: 45,
      averageScore: 73,
      interests: ['Marketing', 'Business', 'Analytics'],
      behavior: 'good',
      enrolledCourseIds: [6, 7],
      certificates: []
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      enrollmentDate: '2024-03-01',
      coursesEnrolled: 2,
      completedCourses: 0,
      status: 'inactive',
      lastActivity: '2 weeks ago',
      totalHours: 12,
      averageScore: 65,
      interests: ['Photography', 'Art'],
      behavior: 'warning',
      enrolledCourseIds: [8],
      certificates: []
    }
  ]);

  // Available courses for enrollment management
  const availableCourses = [
    { id: 1, name: 'JavaScript Fundamentals' },
    { id: 2, name: 'React Basics' },
    { id: 3, name: 'Node.js Backend' },
    { id: 4, name: 'UI/UX Design' },
    { id: 5, name: 'Digital Marketing' },
    { id: 6, name: 'Python Programming' },
    { id: 7, name: 'Data Analysis' },
    { id: 8, name: 'Photography Basics' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBehaviorColor = (behavior: string) => {
    switch (behavior) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSuspendStudent = (studentId: number, studentName: string) => {
    if (confirm(`Are you sure you want to suspend ${studentName}?`)) {
      setStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? { ...student, status: 'suspended' as const }
            : student
        )
      );
      toast({
        title: "Student Suspended",
        description: `${studentName} has been suspended.`,
      });
    }
  };

  const handleActivateStudent = (studentId: number, studentName: string) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: 'active' as const }
          : student
      )
    );
    toast({
      title: "Student Activated",
      description: `${studentName} has been activated.`,
    });
  };

  const handleEnrollStudent = () => {
    if (!selectedStudent || !selectedCourse) return;
    
    const courseId = parseInt(selectedCourse);
    const courseName = availableCourses.find(c => c.id === courseId)?.name;
    
    setStudents(prev => 
      prev.map(student => 
        student.id === selectedStudent.id 
          ? { 
              ...student, 
              enrolledCourseIds: [...student.enrolledCourseIds, courseId],
              coursesEnrolled: student.coursesEnrolled + 1
            }
          : student
      )
    );
    
    // Update enrollment context
    enrollInCourse(courseId);
    
    toast({
      title: "Student Enrolled",
      description: `${selectedStudent.name} has been enrolled in ${courseName}.`,
    });
    
    setCourseManagementOpen(false);
    setSelectedCourse('');
  };

  const handleUnenrollStudent = (courseId: number) => {
    if (!selectedStudent) return;
    
    const courseName = availableCourses.find(c => c.id === courseId)?.name;
    
    setStudents(prev => 
      prev.map(student => 
        student.id === selectedStudent.id 
          ? { 
              ...student, 
              enrolledCourseIds: student.enrolledCourseIds.filter(id => id !== courseId),
              coursesEnrolled: student.coursesEnrolled - 1
            }
          : student
      )
    );
    
    // Update enrollment context
    unenrollFromCourse(courseId);
    
    toast({
      title: "Student Unenrolled",
      description: `${selectedStudent.name} has been unenrolled from ${courseName}.`,
    });
  };

  const handleIssueCertificate = () => {
    if (!selectedStudent || !selectedCourse) return;
    
    const courseName = availableCourses.find(c => c.id === parseInt(selectedCourse))?.name;
    
    const newCertificate = {
      id: Date.now(),
      courseName: courseName || 'Unknown Course',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'active' as const
    };
    
    setStudents(prev => 
      prev.map(student => 
        student.id === selectedStudent.id 
          ? { 
              ...student, 
              certificates: [...student.certificates, newCertificate]
            }
          : student
      )
    );
    
    toast({
      title: "Certificate Issued",
      description: `Certificate for ${courseName} has been issued to ${selectedStudent.name}.`,
    });
    
    setCertificateManagementOpen(false);
    setSelectedCourse('');
  };

  const handleRevokeCertificate = (certificateId: number) => {
    if (!selectedStudent) return;
    
    const certificate = selectedStudent.certificates.find(c => c.id === certificateId);
    
    setStudents(prev => 
      prev.map(student => 
        student.id === selectedStudent.id 
          ? { 
              ...student, 
              certificates: student.certificates.map(cert =>
                cert.id === certificateId ? { ...cert, status: 'revoked' as const } : cert
              )
            }
          : student
      )
    );
    
    toast({
      title: "Certificate Revoked",
      description: `Certificate for ${certificate?.courseName} has been revoked.`,
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const suspendedStudents = students.filter(s => s.status === 'suspended').length;
  const avgCompletionRate = Math.round(
    students.reduce((sum, s) => sum + (s.completedCourses / s.coursesEnrolled * 100), 0) / students.length
  );

  // Fix the interest analytics calculation
  const allInterests = students.flatMap(s => s.interests);
  const interestCounts = allInterests.reduce((acc, interest) => {
    acc[interest] = (acc[interest] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-gray-600">Monitor and manage student activities and performance</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/student-analytics')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics Dashboard
          </Button>
          <Button onClick={() => navigate('/student-performance')}>
            <Trophy className="h-4 w-4 mr-2" />
            Performance Reports
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Students</p>
                <p className="text-2xl font-bold">{activeStudents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold">{suspendedStudents}</p>
              </div>
              <Ban className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold">{avgCompletionRate}%</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
          <CardDescription>Manage and monitor all registered students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Behavior</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-xs text-gray-400">Enrolled: {student.enrollmentDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Enrolled: {student.coursesEnrolled}</p>
                      <p>Completed: {student.completedCourses}</p>
                      <p>Hours: {student.totalHours}h</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Avg Score: {student.averageScore}%</p>
                      <p>Completion: {Math.round((student.completedCourses / student.coursesEnrolled) * 100)}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getBehaviorColor(student.behavior)}>
                      {student.behavior}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{student.lastActivity}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/student-details/${student.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedStudent(student);
                          setCourseManagementOpen(true);
                        }}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Courses
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedStudent(student);
                          setCertificateManagementOpen(true);
                        }}
                      >
                        <Award className="h-4 w-4 mr-1" />
                        Certs
                      </Button>
                      {student.status === 'active' ? (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSuspendStudent(student.id, student.name)}
                          className="text-red-600"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleActivateStudent(student.id, student.name)}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Activate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Course Management Dialog */}
      <Dialog open={courseManagementOpen} onOpenChange={setCourseManagementOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Course Enrollment</DialogTitle>
            <DialogDescription>
              Enroll or unenroll {selectedStudent?.name} from courses
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Currently Enrolled Courses</h4>
              <div className="space-y-2">
                {selectedStudent?.enrolledCourseIds.map(courseId => {
                  const course = availableCourses.find(c => c.id === courseId);
                  return (
                    <div key={courseId} className="flex justify-between items-center p-2 border rounded">
                      <span>{course?.name}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleUnenrollStudent(courseId)}
                        className="text-red-600"
                      >
                        <UserMinus className="h-4 w-4 mr-1" />
                        Unenroll
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Enroll in New Course</h4>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses
                    .filter(course => !selectedStudent?.enrolledCourseIds.includes(course.id))
                    .map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseManagementOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnrollStudent} disabled={!selectedCourse}>
              <UserPlus className="h-4 w-4 mr-2" />
              Enroll Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certificate Management Dialog */}
      <Dialog open={certificateManagementOpen} onOpenChange={setCertificateManagementOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Certificates</DialogTitle>
            <DialogDescription>
              Issue or revoke certificates for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Current Certificates</h4>
              <div className="space-y-2">
                {selectedStudent?.certificates.map(certificate => (
                  <div key={certificate.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <span className="font-medium">{certificate.courseName}</span>
                      <p className="text-sm text-gray-500">Issued: {certificate.issueDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={certificate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {certificate.status}
                      </Badge>
                      {certificate.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRevokeCertificate(certificate.id)}
                          className="text-red-600"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {selectedStudent?.certificates.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No certificates issued</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Issue New Certificate</h4>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {availableCourses
                    .filter(course => selectedStudent?.enrolledCourseIds.includes(course.id))
                    .filter(course => !selectedStudent?.certificates.some(cert => 
                      cert.courseName === course.name && cert.status === 'active'
                    ))
                    .map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCertificateManagementOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleIssueCertificate} disabled={!selectedCourse}>
              <Award className="h-4 w-4 mr-2" />
              Issue Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Interest Analytics - Fixed calculation */}
      <Card>
        <CardHeader>
          <CardTitle>Student Interest Analytics</CardTitle>
          <CardDescription>Popular interests and learning preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(interestCounts).map(([interest, count]) => {
              const percentage = Math.round((count / totalStudents) * 100);
              return (
                <div key={interest} className="text-center p-4 border rounded-lg">
                  <p className="font-medium">{interest}</p>
                  <p className="text-2xl font-bold text-blue-600">{count}</p>
                  <p className="text-sm text-gray-500">{percentage}% of students</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
