
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Users, Award, Star, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import UserTypeSelector from '@/components/UserTypeSelector';
import StatsPopup from '@/components/StatsPopup';
import { useCourses } from '@/contexts/CourseContext';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showStatsPopup, setShowStatsPopup] = useState<'courses' | 'students' | 'institutions' | null>(null);
  const navigate = useNavigate();
  const { courses } = useCourses();

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: BookOpen },
    { id: 'marketing', name: 'Marketing', icon: Users },
    { id: 'business', name: 'Business', icon: Award },
    { id: 'design', name: 'Design', icon: Star }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).slice(0, 4); // Show only first 4 courses on homepage

  const handleBrowseFreeCourses = () => {
    navigate('/courses?filter=free');
  };

  const handleViewPremiumPlans = () => {
    navigate('/courses?filter=paid');
  };

  // Transform courses to match CourseCard interface
  const transformedCourses = filteredCourses.map(course => ({
    id: course.id,
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    price: course.price,
    originalPrice: course.price > 0 ? course.price + 50 : 0,
    rating: course.rating,
    students: course.students,
    duration: course.duration,
    level: course.level,
    category: course.category,
    image: course.thumbnail,
    isPaid: course.price > 0,
    isPopular: course.students > 10000
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* User Type Selector */}
      <div className="container mx-auto px-6 py-4">
        <UserTypeSelector userType={userType} onUserTypeChange={setUserType} />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Advance Your Career with
            <span className="text-blue-600 block">Professional Skills Training</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals learning in-demand skills from industry experts. 
            Choose from free courses or premium certifications.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 shadow-lg"
            />
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              onClick={() => setShowStatsPopup('courses')}
            >
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{courses.length}+</div>
                <div className="text-gray-600">Expert Courses</div>
                <div className="text-xs text-blue-500 mt-1">Click to explore</div>
              </CardContent>
            </Card>
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              onClick={() => setShowStatsPopup('students')}
            >
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Active Students</div>
                <div className="text-xs text-green-500 mt-1">View leaderboard</div>
              </CardContent>
            </Card>
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              onClick={() => setShowStatsPopup('institutions')}
            >
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Partner Institutions</div>
                <div className="text-xs text-purple-500 mt-1">See partners</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-full"
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'Featured Courses' : `${categories.find(c => c.id === selectedCategory)?.name} Courses`}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCourses.length} courses found
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {transformedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join our community of learners and unlock your potential</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-3"
              onClick={handleBrowseFreeCourses}
            >
              Browse Free Courses
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
              onClick={handleViewPremiumPlans}
            >
              View Premium Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Popup */}
      {showStatsPopup && (
        <StatsPopup 
          type={showStatsPopup}
          onClose={() => setShowStatsPopup(null)}
        />
      )}
    </div>
  );
};

export default Index;
