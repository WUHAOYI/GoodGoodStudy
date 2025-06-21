
import Header from '@/components/Header';
import QuizModule from '@/components/QuizModule';

const QuizManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <QuizModule />
      </div>
    </div>
  );
};

export default QuizManagement;
