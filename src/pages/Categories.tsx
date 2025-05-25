
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Award, Star, Code, Briefcase, Palette, Camera, Music, Languages } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'programming',
      name: 'Programming & Development',
      description: 'Learn coding, web development, mobile apps, and software engineering',
      icon: Code,
      courseCount: 1250,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'business',
      name: 'Business & Management',
      description: 'Develop leadership, project management, and entrepreneurship skills',
      icon: Briefcase,
      courseCount: 890,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'design',
      name: 'Design & Creative',
      description: 'Master UI/UX design, graphic design, and creative tools',
      icon: Palette,
      courseCount: 670,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'marketing',
      name: 'Marketing & Sales',
      description: 'Learn digital marketing, social media, and sales strategies',
      icon: Users,
      courseCount: 520,
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'photography',
      name: 'Photography & Video',
      description: 'Capture stunning photos and create professional videos',
      icon: Camera,
      courseCount: 340,
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      id: 'music',
      name: 'Music & Audio',
      description: 'Learn instruments, music production, and audio engineering',
      icon: Music,
      courseCount: 280,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      id: 'languages',
      name: 'Languages',
      description: 'Master new languages and improve communication skills',
      icon: Languages,
      courseCount: 450,
      color: 'bg-teal-500',
      lightColor: 'bg-teal-50',
      textColor: 'text-teal-600'
    },
    {
      id: 'certification',
      name: 'Professional Certification',
      description: 'Prepare for industry certifications and advance your career',
      icon: Award,
      courseCount: 320,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/courses?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover courses across various fields and industries to advance your professional skills
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id} 
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`${category.lightColor} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${category.textColor}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4 text-sm">
                    {category.description}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {category.courseCount} courses
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular Categories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Most Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={`popular-${category.id}`}
                  className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`${category.color} p-3 rounded-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.courseCount} courses available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-xl mb-6 opacity-90">
              Request a course or suggest a new category
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-3"
              onClick={() => navigate('/course-request')}
            >
              Request a Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
