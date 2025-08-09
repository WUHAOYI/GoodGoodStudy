
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Plus, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: number | string;
}

const QuizEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quiz, setQuiz] = useState<{
    id: number;
    title: string;
    subject: string;
    description: string;
    duration: number;
    status: 'draft' | 'published';
  }>({
    id: parseInt(id || '1'),
    title: "JavaScript Fundamentals Quiz",
    subject: "JavaScript",
    description: "Test your knowledge of JavaScript fundamentals including variables, functions, and basic concepts.",
    duration: 30,
    status: 'draft',
  });

  const [questions, setQuestions] = useState<Question[]>([
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
    }
  ]);

  const handleSaveQuiz = () => {
    // In a real app, this would save to the backend
    toast({
      title: "Quiz Saved",
      description: "Your quiz has been saved successfully.",
    });
  };

  const handlePublishQuiz = () => {
    setQuiz(prev => ({ ...prev, status: 'published' }));
    toast({
      title: "Quiz Published",
      description: "Your quiz is now published and available to students.",
    });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: 0
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (questionId: number, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (questionId: number) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const updateQuestionOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/quiz-management')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Quiz Management
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Quiz Editor</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/quiz-preview/${id}`)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleSaveQuiz}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublishQuiz}>
              Publish Quiz
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quiz Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={quiz.title}
                    onChange={(e) => setQuiz(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={quiz.subject} onValueChange={(value) => setQuiz(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JavaScript">JavaScript</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="Node.js">Node.js</SelectItem>
                      <SelectItem value="Python">Python</SelectItem>
                      <SelectItem value="CSS">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={quiz.description}
                    onChange={(e) => setQuiz(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration (minutes)</label>
                  <Input 
                    type="number"
                    value={quiz.duration}
                    onChange={(e) => setQuiz(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge className={quiz.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {quiz.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Questions ({questions.length})</CardTitle>
                  <Button onClick={addQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Question Text</label>
                        <Textarea 
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                          placeholder="Enter your question here..."
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Question Type</label>
                        <Select 
                          value={question.type} 
                          onValueChange={(value: any) => updateQuestion(question.id, { type: value })}
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

                      {question.type === 'multiple-choice' && (
                        <div>
                          <label className="text-sm font-medium">Answer Options</label>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  checked={question.correctAnswer === optionIndex}
                                  onChange={() => updateQuestion(question.id, { correctAnswer: optionIndex })}
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
