
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Edit, Users, Clock, FileText } from 'lucide-react';
import Header from '@/components/Header';

const QuizPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock quiz data - in a real app, this would be fetched based on the ID
  const quiz = {
    id: parseInt(id || '1'),
    title: "JavaScript Fundamentals Quiz",
    subject: "JavaScript",
    description: "Test your knowledge of JavaScript fundamentals including variables, functions, and basic concepts.",
    questions: 15,
    duration: 30,
    status: 'published' as const,
    createdAt: '2024-05-20',
    attempts: 47,
    questions_data: [
      {
        id: 1,
        question: "What is the correct way to declare a variable in JavaScript?",
        type: "multiple-choice",
        options: ["var myVar;", "variable myVar;", "v myVar;", "declare myVar;"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which method is used to add an element to the end of an array?",
        type: "multiple-choice",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: 0
      },
      // Add more sample questions as needed
    ]
  };

  const handleStartQuiz = () => {
    // Navigate to quiz taking interface
    navigate(`/quiz-take/${id}`);
  };

  const handleEditQuiz = () => {
    navigate(`/quiz-editor/${id}`);
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
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/quiz-management')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz Management
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiz Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{quiz.title}</CardTitle>
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status}
                    </Badge>
                  </div>
                  <Button onClick={handleEditQuiz} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Quiz
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">{quiz.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-lg font-bold text-blue-600">{quiz.questions}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <div className="text-lg font-bold text-green-600">{quiz.duration}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <div className="text-lg font-bold text-purple-600">{quiz.attempts}</div>
                    <div className="text-sm text-gray-600">Attempts</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Badge className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                    <div className="text-lg font-bold text-orange-600">{quiz.subject}</div>
                    <div className="text-sm text-gray-600">Subject</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleStartQuiz} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Take Quiz
                  </Button>
                  <Button variant="outline" onClick={() => navigate(`/quiz-analytics/${id}`)}>
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Question Preview */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Question Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quiz.questions_data.slice(0, 3).map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border ${
                              optionIndex === question.correctAnswer 
                                ? 'bg-green-100 border-green-500' 
                                : 'border-gray-300'
                            }`} />
                            <span className="text-sm">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {quiz.questions_data.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      And {quiz.questions_data.length - 3} more questions...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quiz Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Created</label>
                  <p className="text-sm">{quiz.createdAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Modified</label>
                  <p className="text-sm">{quiz.createdAt}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <p className="text-sm">
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status}
                    </Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
