import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  FileText,
  Award,
  BarChart3,
  Users,
  Play,
  Trophy
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  courseId: number;
  courseName: string;
  questions: Question[];
  timeLimit: number; // in minutes
  totalPoints: number;
  attempts: number;
  isPublished: boolean;
  createdAt: Date;
}

interface QuizAttempt {
  id: number;
  quizId: number;
  studentId: number;
  studentName: string;
  answers: Record<number, string>;
  score: number;
  totalPoints: number;
  completedAt: Date;
  timeSpent: number; // in minutes
}

interface QuizTaking {
  quizId: number;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  startTime: Date;
  timeRemaining: number;
}

const QuizModule = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      description: "Test your knowledge of JavaScript basics",
      courseId: 1,
      courseName: "Full Stack Web Development",
      questions: [
        {
          id: 1,
          text: "What is the correct way to declare a variable in JavaScript?",
          type: "multiple-choice",
          options: ["var x = 1", "let x = 1", "const x = 1", "All of the above"],
          correctAnswer: "All of the above",
          points: 10
        },
        {
          id: 2,
          text: "JavaScript is a compiled language.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: "False",
          points: 5
        }
      ],
      timeLimit: 30,
      totalPoints: 15,
      attempts: 5,
      isPublished: true,
      createdAt: new Date()
    },
    {
      id: 2,
      title: "React Components Quiz",
      description: "Test your understanding of React components",
      courseId: 2,
      courseName: "React Development",
      questions: [
        {
          id: 1,
          text: "What is JSX?",
          type: "multiple-choice",
          options: ["JavaScript XML", "Java Syntax Extension", "JSON Extension", "JavaScript Exchange"],
          correctAnswer: "JavaScript XML",
          points: 10
        }
      ],
      timeLimit: 20,
      totalPoints: 10,
      attempts: 3,
      isPublished: true,
      createdAt: new Date()
    }
  ]);

  const [attempts, setAttempts] = useState<QuizAttempt[]>([
    {
      id: 1,
      quizId: 1,
      studentId: 1,
      studentName: "John Doe",
      answers: { 1: "All of the above", 2: "False" },
      score: 15,
      totalPoints: 15,
      completedAt: new Date('2024-07-15'),
      timeSpent: 15
    },
    {
      id: 2,
      quizId: 2,
      studentId: 1,
      studentName: "John Doe",
      answers: { 1: "JavaScript XML" },
      score: 10,
      totalPoints: 10,
      completedAt: new Date('2024-07-10'),
      timeSpent: 8
    }
  ]);

  const [currentQuizTaking, setCurrentQuizTaking] = useState<QuizTaking | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    courseId: 1,
    timeLimit: 30,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    points: 10
  });

  const createQuiz = () => {
    if (!newQuiz.title || !newQuiz.description) return;

    const quiz: Quiz = {
      id: quizzes.length + 1,
      title: newQuiz.title,
      description: newQuiz.description,
      courseId: newQuiz.courseId || 1,
      courseName: "Full Stack Web Development",
      questions: newQuiz.questions || [],
      timeLimit: newQuiz.timeLimit || 30,
      totalPoints: (newQuiz.questions || []).reduce((sum, q) => sum + q.points, 0),
      attempts: 0,
      isPublished: false,
      createdAt: new Date()
    };

    setQuizzes(prev => [...prev, quiz]);
    setNewQuiz({ title: '', description: '', courseId: 1, timeLimit: 30, questions: [] });
    setIsCreateQuizOpen(false);
  };

  const addQuestion = () => {
    if (!currentQuestion.text || !newQuiz.questions) return;

    const question: Question = {
      id: (newQuiz.questions.length || 0) + 1,
      text: currentQuestion.text,
      type: currentQuestion.type || 'multiple-choice',
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer || '',
      points: currentQuestion.points || 10
    };

    setNewQuiz(prev => ({
      ...prev,
      questions: [...(prev.questions || []), question]
    }));

    setCurrentQuestion({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      points: 10
    });
  };

  const generateAssessmentReport = (attempt: QuizAttempt) => {
    const percentage = (attempt.score / attempt.totalPoints) * 100;
    let performance = 'Needs Improvement';
    let recommendations = 'Focus on reviewing the course materials and practice more exercises.';

    if (percentage >= 90) {
      performance = 'Excellent';
      recommendations = 'Outstanding performance! Consider taking advanced courses in this subject.';
    } else if (percentage >= 80) {
      performance = 'Good';
      recommendations = 'Good work! Review the topics you missed and continue practicing.';
    } else if (percentage >= 70) {
      performance = 'Satisfactory';
      recommendations = 'You have a basic understanding. Spend more time on challenging concepts.';
    }

    return {
      performance,
      percentage: percentage.toFixed(1),
      recommendations,
      timeEfficiency: attempt.timeSpent < 20 ? 'Efficient' : 'Needs more time management',
      strengths: percentage >= 80 ? 'Strong grasp of fundamental concepts' : 'Basic understanding',
      improvements: percentage < 80 ? 'Review course materials thoroughly' : 'Continue advanced practice'
    };
  };

  const startQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    setCurrentQuizTaking({
      quizId,
      currentQuestionIndex: 0,
      answers: {},
      startTime: new Date(),
      timeRemaining: quiz.timeLimit * 60 // Convert to seconds
    });
  };

  const submitAnswer = () => {
    if (!currentQuizTaking || !selectedAnswer) return;

    const updatedAnswers = {
      ...currentQuizTaking.answers,
      [currentQuizTaking.currentQuestionIndex + 1]: selectedAnswer
    };

    const quiz = quizzes.find(q => q.id === currentQuizTaking.quizId);
    if (!quiz) return;

    if (currentQuizTaking.currentQuestionIndex < quiz.questions.length - 1) {
      // Move to next question
      setCurrentQuizTaking({
        ...currentQuizTaking,
        currentQuestionIndex: currentQuizTaking.currentQuestionIndex + 1,
        answers: updatedAnswers
      });
      setSelectedAnswer('');
    } else {
      // Quiz completed, calculate score
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (updatedAnswers[index + 1] === question.correctAnswer) {
          score += question.points;
        }
      });

      const newAttempt: QuizAttempt = {
        id: attempts.length + 1,
        quizId: quiz.id,
        studentId: 1,
        studentName: user?.name || "Student",
        answers: updatedAnswers,
        score,
        totalPoints: quiz.totalPoints,
        completedAt: new Date(),
        timeSpent: Math.round((Date.now() - currentQuizTaking.startTime.getTime()) / 60000)
      };

      setAttempts(prev => [...prev, newAttempt]);
      setCurrentQuizTaking(null);
      setSelectedAnswer('');
    }
  };

  if (user?.role === 'teacher' || user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quiz Management</h1>
          <Dialog open={isCreateQuizOpen} onOpenChange={setIsCreateQuizOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Quiz Title</Label>
                    <Input
                      id="title"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      value={newQuiz.timeLimit}
                      onChange={(e) => setNewQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newQuiz.description}
                    onChange={(e) => setNewQuiz(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter quiz description"
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Add Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Question Text</Label>
                      <Textarea
                        value={currentQuestion.text}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
                        placeholder="Enter question text"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Question Type</Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, type: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="short-answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                        />
                      </div>
                    </div>

                    {currentQuestion.type === 'multiple-choice' && (
                      <div>
                        <Label>Options</Label>
                        <div className="space-y-2">
                          {currentQuestion.options?.map((option, index) => (
                            <Input
                              key={index}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(currentQuestion.options || [])];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                              }}
                              placeholder={`Option ${index + 1}`}
                            />
                          ))}
                        </div>
                        <div className="mt-2">
                          <Label>Correct Answer</Label>
                          <Select
                            value={currentQuestion.correctAnswer}
                            onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select correct answer" />
                            </SelectTrigger>
                            <SelectContent>
                              {currentQuestion.options?.map((option, index) => (
                                <SelectItem key={index} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <Button onClick={addQuestion}>Add Question</Button>
                  </CardContent>
                </Card>

                {newQuiz.questions && newQuiz.questions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Questions ({newQuiz.questions.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {newQuiz.questions.map((question, index) => (
                          <div key={question.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">Q{index + 1}: {question.text}</p>
                                <Badge variant="outline">{question.type}</Badge>
                                <span className="ml-2 text-sm text-gray-600">{question.points} points</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateQuizOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createQuiz} disabled={!newQuiz.title || !newQuiz.questions?.length}>
                    Create Quiz
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="quizzes">
          <TabsList>
            <TabsTrigger value="quizzes">My Quizzes</TabsTrigger>
            <TabsTrigger value="results">Quiz Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <Badge variant={quiz.isPublished ? "default" : "secondary"}>
                        {quiz.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span>{quiz.questions.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Limit:</span>
                        <span>{quiz.timeLimit} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attempts:</span>
                        <span>{quiz.attempts}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={quiz.isPublished ? "secondary" : "default"}
                        onClick={() => {
                          setQuizzes(prev => prev.map(q => 
                            q.id === quiz.id ? { ...q, isPublished: !q.isPublished } : q
                          ));
                        }}
                      >
                        {quiz.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Attempts & Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attempts.map((attempt) => {
                    const report = generateAssessmentReport(attempt);
                    return (
                      <Card key={attempt.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">{attempt.studentName}</h4>
                              <p className="text-sm text-gray-600">
                                Quiz: {quizzes.find(q => q.id === attempt.quizId)?.title}
                              </p>
                            </div>
                            <Badge variant={
                              parseFloat(report.percentage) >= 80 ? "default" : 
                              parseFloat(report.percentage) >= 70 ? "secondary" : "destructive"
                            }>
                              {report.percentage}%
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <strong>Score:</strong> {attempt.score}/{attempt.totalPoints}
                            </div>
                            <div>
                              <strong>Time:</strong> {attempt.timeSpent} min
                            </div>
                            <div>
                              <strong>Performance:</strong> {report.performance}
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm"><strong>AI Assessment:</strong> {report.recommendations}</p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Quizzes</p>
                      <p className="text-2xl font-bold">{quizzes.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Attempts</p>
                      <p className="text-2xl font-bold">{attempts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold">
                        {attempts.length > 0 
                          ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.totalPoints) * 100, 0) / attempts.length)
                          : 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Avg. Time</p>
                      <p className="text-2xl font-bold">
                        {attempts.length > 0 
                          ? Math.round(attempts.reduce((sum, a) => sum + a.timeSpent, 0) / attempts.length)
                          : 0} min
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Student view for taking quizzes
  if (currentQuizTaking) {
    const quiz = quizzes.find(q => q.id === currentQuizTaking.quizId);
    const currentQuestion = quiz?.questions[currentQuizTaking.currentQuestionIndex];

    if (!quiz || !currentQuestion) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{quiz.title}</CardTitle>
              <Badge variant="outline">
                Question {currentQuizTaking.currentQuestionIndex + 1} of {quiz.questions.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{currentQuestion.text}</h3>
                <p className="text-sm text-gray-600">Points: {currentQuestion.points}</p>
              </div>

              {currentQuestion.type === 'multiple-choice' && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === 'true-false' && (
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="True" id="true" />
                    <Label htmlFor="true">True</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="False" id="false" />
                    <Label htmlFor="false">False</Label>
                  </div>
                </RadioGroup>
              )}

              {currentQuestion.type === 'short-answer' && (
                <Textarea
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                />
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuizTaking(null)}
                >
                  Exit Quiz
                </Button>
                <Button
                  onClick={submitAnswer}
                  disabled={!selectedAnswer}
                >
                  {currentQuizTaking.currentQuestionIndex < quiz.questions.length - 1 
                    ? 'Next Question' 
                    : 'Submit Quiz'
                  }
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Quizzes</h1>
      
      <Tabs defaultValue="available">
        <TabsList>
          <TabsTrigger value="available">Available Quizzes</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.filter(q => q.isPublished).map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span>{quiz.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span>{quiz.timeLimit} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Points:</span>
                      <span>{quiz.totalPoints}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => startQuiz(quiz.id)}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">Quizzes Completed</p>
                      <p className="text-2xl font-bold">{attempts.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold">
                        {attempts.length > 0 
                          ? Math.round(attempts.reduce((sum, a) => sum + (a.score / a.totalPoints) * 100, 0) / attempts.length)
                          : 0}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Time</p>
                      <p className="text-2xl font-bold">
                        {attempts.reduce((sum, a) => sum + a.timeSpent, 0)} min
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {attempts.map((attempt) => {
              const quiz = quizzes.find(q => q.id === attempt.quizId);
              const percentage = (attempt.score / attempt.totalPoints) * 100;
              
              return (
                <Card key={attempt.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{quiz?.title}</h4>
                        <p className="text-sm text-gray-600">
                          Completed on {attempt.completedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        percentage >= 80 ? "default" : 
                        percentage >= 70 ? "secondary" : "destructive"
                      }>
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Score:</strong> {attempt.score}/{attempt.totalPoints}
                      </div>
                      <div>
                        <strong>Time:</strong> {attempt.timeSpent} min
                      </div>
                      <div>
                        <strong>Performance:</strong> {
                          percentage >= 90 ? 'Excellent' :
                          percentage >= 80 ? 'Good' :
                          percentage >= 70 ? 'Satisfactory' : 'Needs Improvement'
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizModule;
