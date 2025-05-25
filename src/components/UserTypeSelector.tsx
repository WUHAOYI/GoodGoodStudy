
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserTypeSelectorProps {
  userType: 'student' | 'teacher' | 'admin';
  onUserTypeChange: (type: 'student' | 'teacher' | 'admin') => void;
}

const UserTypeSelector = ({ userType, onUserTypeChange }: UserTypeSelectorProps) => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: 'student' as const,
      name: 'Student',
      description: 'Learn new skills and advance your career',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      activeColor: 'bg-blue-600',
      route: '/student-dashboard'
    },
    {
      id: 'teacher' as const,
      name: 'Teacher',
      description: 'Create and manage courses for students',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      activeColor: 'bg-green-600',
      route: '/teacher-dashboard'
    },
    {
      id: 'admin' as const,
      name: 'Admin',
      description: 'Manage platform and review content',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      activeColor: 'bg-purple-600',
      route: '/admin-dashboard'
    }
  ];

  const handleUserTypeClick = (type: 'student' | 'teacher' | 'admin') => {
    onUserTypeChange(type);
    const selectedType = userTypes.find(ut => ut.id === type);
    if (selectedType) {
      navigate(selectedType.route);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">View as:</h3>
          <Badge variant="outline" className="text-sm">
            Demo Mode
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userTypes.map((type) => {
            const Icon = type.icon;
            const isActive = userType === type.id;
            
            return (
              <Button
                key={type.id}
                variant="ghost"
                onClick={() => handleUserTypeClick(type.id)}
                className={`h-auto p-4 flex flex-col items-center gap-3 transition-all duration-200 ${
                  isActive 
                    ? `${type.activeColor} text-white hover:${type.activeColor}/90` 
                    : `hover:${type.bgColor} ${type.color}`
                }`}
              >
                <div className={`p-3 rounded-full ${isActive ? 'bg-white/20' : type.bgColor}`}>
                  <Icon className={`h-6 w-6 ${isActive ? 'text-white' : type.color}`} />
                </div>
                <div className="text-center">
                  <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {type.name}
                  </div>
                  <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                    {type.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTypeSelector;
