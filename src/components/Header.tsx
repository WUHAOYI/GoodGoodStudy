
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, User, ShoppingCart, BookOpen, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    switch (userRole) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/student-dashboard');
    }
  };

  const handleRoleChange = (role: 'student' | 'teacher' | 'admin') => {
    setUserRole(role);
    // Auto-navigate to the appropriate dashboard when role changes
    switch (role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EduPlatform</h1>
              <p className="text-xs text-gray-500">Professional Learning</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/courses')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => navigate('/categories')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </button>
            <button 
              onClick={() => navigate('/for-business')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              For Business
            </button>
            <button 
              onClick={() => navigate('/teach')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Teach on Platform
            </button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>

                {/* Cart */}
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    2
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="hidden md:block">John Doe</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500 capitalize">{userRole}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Role Switcher for Demo */}
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      Switch Role (Demo)
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleRoleChange('student')}>
                      View as Student
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange('teacher')}>
                      View as Teacher
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
                      View as Admin
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDashboardNavigation}>
                      My Dashboard
                    </DropdownMenuItem>
                    
                    {userRole === 'student' && (
                      <>
                        <DropdownMenuItem>My Learning</DropdownMenuItem>
                        <DropdownMenuItem>My Cart</DropdownMenuItem>
                        <DropdownMenuItem>Wishlist</DropdownMenuItem>
                      </>
                    )}
                    
                    {userRole === 'teacher' && (
                      <>
                        <DropdownMenuItem>Teaching Dashboard</DropdownMenuItem>
                        <DropdownMenuItem>Create Course</DropdownMenuItem>
                        <DropdownMenuItem>My Courses</DropdownMenuItem>
                      </>
                    )}
                    
                    {userRole === 'admin' && (
                      <>
                        <DropdownMenuItem>Admin Dashboard</DropdownMenuItem>
                        <DropdownMenuItem>Course Reviews</DropdownMenuItem>
                        <DropdownMenuItem>User Management</DropdownMenuItem>
                        <DropdownMenuItem>Institution Management</DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Account Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
