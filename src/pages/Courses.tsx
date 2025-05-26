import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Users, Award, Star, Filter } from 'lucide-react';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';
import { useCourses } from '@/contexts/CourseContext';

const Courses = () => {
  const { courses: contextCourses } = useCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Extended mock course data combined with published courses from context
  const staticCourses = [
    {
      id: 1001,
      title: "Full Stack Web Development Bootcamp",
      instructor: "Tech Academy",
      price: 299,
      originalPrice: 499,
      rating: 4.8,
      students: 12450,
      duration: "40 hours",
      level: "Beginner",
      category: "programming",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Marketing Pro Institute",
      price: 0,
      rating: 4.6,
      students: 8930,
      duration: "25 hours",
      level: "Intermediate",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 3,
      title: "Project Management Professional (PMP)",
      instructor: "Business Excellence Academy",
      price: 199,
      rating: 4.9,
      students: 5670,
      duration: "60 hours",
      level: "Advanced",
      category: "business",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 4,
      title: "UI/UX Design Masterclass",
      instructor: "Design Studio Pro",
      price: 0,
      rating: 4.7,
      students: 15230,
      duration: "35 hours",
      level: "Beginner",
      category: "design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 5,
      title: "Python for Data Science",
      instructor: "Data Science Institute",
      price: 249,
      rating: 4.8,
      students: 9340,
      duration: "45 hours",
      level: "Intermediate",
      category: "programming",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 6,
      title: "Mobile App Development with React Native",
      instructor: "Mobile Dev Academy",
      price: 0,
      rating: 4.5,
      students: 7820,
      duration: "50 hours",
      level: "Advanced",
      category: "programming",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 7,
      title: "Advanced JavaScript & ES6+",
      instructor: "Code Masters",
      price: 179,
      originalPrice: 299,
      rating: 4.7,
      students: 11200,
      duration: "30 hours",
      level: "Advanced",
      category: "programming",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 8,
      title: "Social Media Marketing Strategy",
      instructor: "Digital Growth Hub",
      price: 0,
      rating: 4.4,
      students: 6340,
      duration: "18 hours",
      level: "Beginner",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 9,
      title: "Entrepreneurship & Startup Fundamentals",
      instructor: "Business Innovators",
      price: 159,
      rating: 4.6,
      students: 4890,
      duration: "22 hours",
      level: "Beginner",
      category: "business",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: false
    },
    {
      id: 10,
      title: "Graphic Design with Adobe Creative Suite",
      instructor: "Creative Professionals",
      price: 0,
      rating: 4.5,
      students: 8750,
      duration: "28 hours",
      level: "Intermediate",
      category: "design",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 11,
      title: "Machine Learning with Python",
      instructor: "AI Research Lab",
      price: 399,
      originalPrice: 599,
      rating: 4.9,
      students: 7230,
      duration: "65 hours",
      level: "Advanced",
      category: "programming",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 12,
      title: "Content Marketing & SEO",
      instructor: "Growth Marketing Team",
      price: 129,
      rating: 4.3,
      students: 5120,
      duration: "20 hours",
      level: "Intermediate",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: false
    },
    {
      id: 13,
      title: "AWS Cloud Computing Fundamentals",
      instructor: "Cloud Solutions Academy",
      price: 199,
      rating: 4.6,
      students: 6780,
      duration: "35 hours",
      level: "Intermediate",
      category: "programming",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 14,
      title: "Digital Photography Masterclass",
      instructor: "Photo Masters Studio",
      price: 0,
      rating: 4.7,
      students: 9450,
      duration: "30 hours",
      level: "Beginner",
      category: "design",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 15,
      title: "Financial Planning & Investment",
      instructor: "Finance Expert Group",
      price: 179,
      rating: 4.5,
      students: 4320,
      duration: "25 hours",
      level: "Intermediate",
      category: "business",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: false
    },
    {
      id: 16,
      title: "Cybersecurity Essentials",
      instructor: "Security Institute",
      price: 249,
      rating: 4.8,
      students: 5890,
      duration: "40 hours",
      level: "Advanced",
      category: "programming",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 17,
      title: "Email Marketing Automation",
      instructor: "Marketing Automation Pro",
      price: 0,
      rating: 4.4,
      students: 7210,
      duration: "15 hours",
      level: "Beginner",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    },
    {
      id: 18,
      title: "Leadership & Team Management",
      instructor: "Executive Learning Center",
      price: 199,
      rating: 4.6,
      students: 3450,
      duration: "20 hours",
      level: "Intermediate",
      category: "business",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: false
    },
    {
      id: 19,
      title: "3D Animation with Blender",
      instructor: "Animation Studio",
      price: 159,
      rating: 4.7,
      students: 6120,
      duration: "45 hours",
      level: "Advanced",
      category: "design",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 20,
      title: "Node.js Backend Development",
      instructor: "Backend Masters",
      price: 0,
      rating: 4.5,
      students: 8930,
      duration: "38 hours",
      level: "Intermediate",
      category: "programming",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
      isPaid: false,
      isPopular: false
    }
  ];

  // Combine static courses with published courses from context
  const publishedContextCourses = contextCourses
    .filter(course => course.status === 'Published')
    .map(course => ({
      id: course.id,
      title: course.title,
      instructor: "Course Creator",
      price: course.price,
      rating: course.rating || 4.5,
      students: course.students,
      duration: course.duration,
      level: course.level,
      category: course.category.toLowerCase(),
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      isPaid: course.price > 0,
      isPopular: course.students > 1000
    }));

  const courses = [...staticCourses, ...publishedContextCourses];

  const categories = [
    { id: 'all', name: 'All Categories', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: BookOpen },
    { id: 'marketing', name: 'Marketing', icon: Users },
    { id: 'business', name: 'Business', icon: Award },
    { id: 'design', name: 'Design', icon: Star }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    // Fix the price filtering logic
    let matchesPrice = true;
    if (priceFilter === 'free') {
      matchesPrice = course.price === 0;
    } else if (priceFilter === 'paid') {
      matchesPrice = course.price > 0;
    }
    // 'all' matches everything, so matchesPrice stays true
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive catalog of professional courses designed to advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Price Filter */}
            <div className="flex gap-2">
              <Button
                variant={priceFilter === 'all' ? "default" : "outline"}
                onClick={() => setPriceFilter('all')}
                size="sm"
              >
                All Prices
              </Button>
              <Button
                variant={priceFilter === 'free' ? "default" : "outline"}
                onClick={() => setPriceFilter('free')}
                size="sm"
              >
                Free
              </Button>
              <Button
                variant={priceFilter === 'paid' ? "default" : "outline"}
                onClick={() => setPriceFilter('paid')}
                size="sm"
              >
                Paid
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Courses' : `${categories.find(c => c.id === selectedCategory)?.name} Courses`}
          </h2>
          <Badge variant="secondary" className="text-sm">
            {filteredCourses.length} courses found
          </Badge>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
