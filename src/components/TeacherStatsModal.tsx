
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Star, TrendingUp } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  specialization: string;
  courses: number;
  students: number;
  rating: number;
  status: string;
  institution: string;
}

interface Institution {
  name: string;
  teachers: number;
  courses: number;
  students: number;
}

interface TeacherStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherStatsModal = ({ isOpen, onClose }: TeacherStatsModalProps) => {
  // Mock data for teachers
  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Web Development",
      courses: 12,
      students: 3420,
      rating: 4.8,
      status: "Active",
      institution: "Tech Academy"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      specialization: "Data Science",
      courses: 8,
      students: 2150,
      rating: 4.9,
      status: "Active",
      institution: "Data Institute"
    },
    {
      id: 3,
      name: "Jane Smith",
      specialization: "Digital Marketing",
      courses: 15,
      students: 4200,
      rating: 4.7,
      status: "Active",
      institution: "Marketing Pro"
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      specialization: "Cybersecurity",
      courses: 6,
      students: 1850,
      rating: 4.6,
      status: "Active",
      institution: "Security Institute"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      specialization: "UI/UX Design",
      courses: 10,
      students: 2900,
      rating: 4.8,
      status: "Active",
      institution: "Design Hub"
    }
  ];

  // Group teachers by institution
  const institutions: Institution[] = teachers.reduce((acc, teacher) => {
    const existing = acc.find(inst => inst.name === teacher.institution);
    if (existing) {
      existing.teachers += 1;
      existing.courses += teacher.courses;
      existing.students += teacher.students;
    } else {
      acc.push({
        name: teacher.institution,
        teachers: 1,
        courses: teacher.courses,
        students: teacher.students
      });
    }
    return acc;
  }, [] as Institution[]);

  const totalTeachers = teachers.length;
  const totalCourses = teachers.reduce((sum, teacher) => sum + teacher.courses, 0);
  const totalStudents = teachers.reduce((sum, teacher) => sum + teacher.students, 0);
  const averageRating = teachers.reduce((sum, teacher) => sum + teacher.rating, 0) / teachers.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Teachers & Institutions Overview</DialogTitle>
          <DialogDescription>
            Detailed breakdown of teachers and institutional partnerships
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Teachers</p>
                    <p className="text-2xl font-bold">{totalTeachers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold">{totalCourses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold">{totalStudents.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Teachers and Institutions */}
          <Tabs defaultValue="teachers" className="space-y-6">
            <TabsList>
              <TabsTrigger value="teachers">All Teachers</TabsTrigger>
              <TabsTrigger value="institutions">Partner Institutions</TabsTrigger>
            </TabsList>

            <TabsContent value="teachers">
              <Card>
                <CardHeader>
                  <CardTitle>All Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Institution</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">{teacher.name}</TableCell>
                          <TableCell>{teacher.specialization}</TableCell>
                          <TableCell>{teacher.institution}</TableCell>
                          <TableCell>{teacher.courses}</TableCell>
                          <TableCell>{teacher.students.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              {teacher.rating}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(teacher.status)}>
                              {teacher.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="institutions">
              <Card>
                <CardHeader>
                  <CardTitle>Partner Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Institution</TableHead>
                        <TableHead>Teachers</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Students</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {institutions.map((institution, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{institution.name}</TableCell>
                          <TableCell>{institution.teachers}</TableCell>
                          <TableCell>{institution.courses}</TableCell>
                          <TableCell>{institution.students.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherStatsModal;
