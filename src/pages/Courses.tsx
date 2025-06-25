import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, Users, Award, Star, Filter, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import CourseCard from '@/components/CourseCard';

const Courses = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  // Get category from URL params on component mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');
    
    console.log('URL params - category:', categoryParam, 'filter:', filterParam);
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (filterParam === 'free') {
      setSelectedPrice('free');
    } else if (filterParam === 'paid') {
      setSelectedPrice('paid');
    }
  }, [searchParams]);

  // Mock course data
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      description: "Master both frontend and backend development with hands-on projects and real-world applications. Learn React, Node.js, and modern web technologies.",
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
      description: "Learn the essentials of digital marketing including SEO, social media marketing, content strategy, and analytics to grow your business online.",
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
      description: "Comprehensive preparation for PMP certification covering project lifecycle, risk management, and leadership skills for successful project delivery.",
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
      description: "Create stunning user interfaces and experiences with industry-standard design principles, prototyping tools, and user research methodologies.",
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
      title: "Advanced JavaScript Programming",
      description: "Deep dive into advanced JavaScript concepts, ES6+, and modern development patterns.",
      instructor: "Code Masters",
      price: 149,
      rating: 4.9,
      students: 8700,
      duration: "30 hours",
      level: "Advanced",
      category: "programming",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: true
    },
    {
      id: 6,
      title: "Photography Basics",
      description: "Learn the fundamentals of photography including composition, lighting, and post-processing.",
      instructor: "Visual Arts Academy",
      price: 89,
      rating: 4.5,
      students: 3200,
      duration: "20 hours",
      level: "Beginner",
      category: "photography",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=250&fit=crop",
      isPaid: true,
      isPopular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'programming', name: 'Programming', icon: BookOpen },
    { id: 'marketing', name: 'Marketing', icon: Users },
    { id: 'business', name: 'Business', icon: Award },
    { id: 'design', name: 'Design', icon: Star },
    { id: 'photography', name: 'Photography', icon: Star },
    { id: 'certification', name: 'Certification', icon: Award }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && !course.isPaid) ||
                        (selectedPrice === 'paid' && course.isPaid);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default: // popularity
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    }
  });

  console.log('Filtered courses:', sortedCourses.length, 'Category:', selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory === 'all' ? 'All Courses' : 
             categories.find(c => c.id === selectedCategory)?.name || 'Courses'}
          </h1>
          <p className="text-xl text-gray-600">
            Discover professional courses to advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={selectedPrice} onValueChange={setSelectedPrice}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="students">Most Students</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {sortedCourses.length} courses found
          </h2>
          <Badge variant="secondary">
            {selectedCategory !== 'all' && categories.find(c => c.id === selectedCategory)?.name}
          </Badge>
        </div>

        {/* Course Grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedPrice('all');
              }}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
