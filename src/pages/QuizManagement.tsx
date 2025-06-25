
import Header from '@/components/Header';
import QuizModule from '@/components/QuizModule';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/student-dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">My Quizzes</h1>
        </div>
        <QuizModule />
      </div>
    </div>
  );
};

export default QuizManagement;
