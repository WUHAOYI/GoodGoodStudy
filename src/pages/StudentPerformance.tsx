
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, TrendingUp, Trophy, Clock, BookOpen, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const StudentPerformance = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const performanceData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      coursesCompleted: 5,
      averageScore: 92,
      totalHours: 124,
      rank: 1,
      trend: 'up',
      recentCourse: 'Advanced React',
      recentScore: 95
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      coursesCompleted: 4,
      averageScore: 88,
      totalHours: 98,
      rank: 2,
      trend: 'up',
      recentCourse: 'UI/UX Design',
      recentScore: 91
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      coursesCompleted: 3,
      averageScore: 85,
      totalHours: 76,
      rank: 3,
      trend: 'stable',
      recentCourse: 'JavaScript Fundamentals',
      recentScore: 87
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      coursesCompleted: 2,
      averageScore: 79,
      totalHours: 45,
      rank: 4,
      trend: 'down',
      recentCourse: 'Web Design Basics',
      recentScore: 75
    }
  ];

  const topPerformers = performanceData.slice(0, 3);

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Performance report has been exported successfully.",
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/admin-dashboard')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Performance Reports</h1>
              <p className="text-gray-600">Detailed performance tracking and achievement analysis</p>
            </div>
            <Button onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold">86%</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Completions</p>
                  <p className="text-2xl font-bold">234</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Learning Hours</p>
                  <p className="text-2xl font-bold">1,845</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold">67</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🏆 Top Performers</CardTitle>
            <CardDescription>Students with highest overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="text-center p-6 border rounded-lg bg-gradient-to-b from-yellow-50 to-white">
                  <div className="text-4xl mb-2">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <h3 className="font-bold text-lg">{student.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{student.email}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Score:</span>
                      <span className={`font-bold ${getScoreColor(student.averageScore)}`}>
                        {student.averageScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Courses:</span>
                      <span className="font-bold">{student.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hours:</span>
                      <span className="font-bold">{student.totalHours}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Analysis</CardTitle>
            <CardDescription>Comprehensive view of all student performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Courses Completed</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Recent Course</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">#{student.rank}</span>
                        {student.rank <= 3 && (
                          <span className="text-lg">
                            {student.rank === 1 ? '🥇' : student.rank === 2 ? '🥈' : '🥉'}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{student.coursesCompleted}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getScoreColor(student.averageScore)} bg-transparent border`}>
                        {student.averageScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{student.totalHours}h</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.recentCourse}</p>
                        <p className="text-sm text-gray-500">Score: {student.recentScore}%</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(student.trend)}
                        <span className="text-sm capitalize">{student.trend}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/student-details/${student.id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPerformance;
