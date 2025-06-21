
import Header from '@/components/Header';
import AIModule from '@/components/AIModule';

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <AIModule />
      </div>
    </div>
  );
};

export default AIAssistant;
