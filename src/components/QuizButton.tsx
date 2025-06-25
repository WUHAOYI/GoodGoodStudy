
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Play, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuizButtonProps {
  courseId: number;
  courseTitle: string;
  isEnrolled: boolean;
  progress?: number;
}

const QuizButton = ({ courseId, courseTitle, isEnrolled, progress = 0 }: QuizButtonProps) => {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    if (!isEnrolled) {
      return;
    }
    // Navigate to quiz page with course context
    navigate('/quiz-management', { 
      state: { 
        courseId, 
        courseTitle,
        startQuiz: true 
      } 
    });
  };

  if (!isEnrolled) {
    return null;
  }

  const canTakeQuiz = progress >= 80; // Can take quiz when 80% complete
  const quizCompleted = progress === 100;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Course Quiz
        </CardTitle>
        <CardDescription>
          Test your knowledge and earn a certificate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {quizCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : canTakeQuiz ? (
                <Play className="h-5 w-5 text-blue-600" />
              ) : (
                <Clock className="h-5 w-5 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                {quizCompleted 
                  ? 'Quiz Completed' 
                  : canTakeQuiz 
                    ? 'Quiz Available' 
                    : `Complete ${80 - progress}% more to unlock quiz`
                }
              </span>
            </div>
            {canTakeQuiz && (
              <Badge variant={quizCompleted ? "default" : "secondary"}>
                {quizCompleted ? "Completed" : "Available"}
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={handleQuizClick}
            disabled={!canTakeQuiz}
            size="sm"
            className={canTakeQuiz ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            {quizCompleted ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                View Results
              </>
            ) : canTakeQuiz ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Locked
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizButton;
