import Header from '@/components/Header';
import QuizModule from '@/components/QuizModule';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Quiz {
  id: number;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  attempts: number;
}

const QuizManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      subject: "JavaScript",
      questions: 15,
      duration: 30,
      status: 'published',
      createdAt: '2024-05-20',
      attempts: 47
    },
    {
      id: 2,
      title: "React Components Assessment",
      subject: "React",
      questions: 20,
      duration: 45,
      status: 'published',
      createdAt: '2024-05-18',
      attempts: 32
    },
    {
      id: 3,
      title: "Node.js Backend Quiz",
      subject: "Node.js",
      questions: 12,
      duration: 25,
      status: 'draft',
      createdAt: '2024-05-15',
      attempts: 0
    }
  ]);

  const handleCreateQuiz = () => {
    // Simulate creating a new quiz
    const newQuiz: Quiz = {
      id: Date.now(),
      title: "New Quiz",
      subject: "General",
      questions: 0,
      duration: 15,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      attempts: 0
    };
    
    setQuizzes(prev => [newQuiz, ...prev]);
    toast({
      title: "Quiz Created",
      description: "New quiz has been created successfully. You can now edit it.",
    });
  };

  const handleEditQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      // For now, navigate to course management with quiz ID
      navigate(`/course-management/${quizId}`);
      toast({
        title: "Opening Quiz Editor",
        description: `Editing: ${quiz.title}`,
      });
    }
  };

  const handleViewQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      // For now, navigate to course details with quiz ID
      navigate(`/course/${quizId}`);
      toast({
        title: "Viewing Quiz",
        description: `Opening: ${quiz.title}`,
      });
    }
  };

  const handleDeleteQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setQuizzes(prev => prev.filter(q => q.id !== quizId));
      toast({
        title: "Quiz Deleted",
        description: `${quiz.title} has been deleted.`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/teacher-dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
          </div>
          <Button 
            onClick={handleCreateQuiz}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{quizzes.length}</div>
              <p className="text-sm text-gray-600">Total Quizzes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {quizzes.filter(q => q.status === 'published').length}
              </div>
              <p className="text-sm text-gray-600">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {quizzes.filter(q => q.status === 'draft').length}
              </div>
              <p className="text-sm text-gray-600">Drafts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">
                {quizzes.reduce((sum, quiz) => sum + quiz.attempts, 0)}
              </div>
              <p className="text-sm text-gray-600">Total Attempts</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz List */}
        <Card>
          <CardHeader>
            <CardTitle>My Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{quiz.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Subject: {quiz.subject}</span>
                        <span>{quiz.questions} questions</span>
                        <span>{quiz.duration} minutes</span>
                        <span>Created: {quiz.createdAt}</span>
                        {quiz.attempts > 0 && <span>{quiz.attempts} attempts</span>}
                      </div>
                    </div>
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewQuiz(quiz.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditQuiz(quiz.id)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Original Quiz Module */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz Builder Module</h2>
          <QuizModule />
        </div>
      </div>
    </div>
  );
};

export default QuizManagement;
