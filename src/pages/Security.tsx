
import Header from '@/components/Header';
import SecurityManagement from '@/components/SecurityManagement';

const Security = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <SecurityManagement />
      </div>
    </div>
  );
};

export default Security;
