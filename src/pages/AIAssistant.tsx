
import Header from '@/components/Header';
import AIModule from '@/components/AIModule';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIAssistant = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        </div>
        <AIModule />
      </div>
    </div>
  );
};

export default AIAssistant;
