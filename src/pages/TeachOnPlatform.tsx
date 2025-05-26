import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Clock,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import TestimonialCarousel from '@/components/TestimonialCarousel';

const TeachOnPlatform = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const instructorTestimonials = [
    {
      id: 1,
      name: "Dr. Jennifer Walsh",
      title: "Data Science Instructor",
      company: "Top-Rated Teacher",
      rating: 5,
      content: "Teaching on this platform has been incredibly rewarding. I've reached over 10,000 students globally and the support team is fantastic. The earnings potential is real!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mark Thompson",
      title: "Web Development Expert",
      company: "Full-Stack Specialist",
      rating: 5,
      content: "I've made over $50,000 in my first year teaching here. The platform tools make it easy to create engaging content and track student progress effectively.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      title: "Digital Marketing Guru",
      company: "Marketing Strategist",
      rating: 5,
      content: "The flexibility to teach on my schedule while helping others learn digital marketing has been amazing. My courses consistently rank in the top 10!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1d4?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleGetStarted = () => {
    if (!user) {
      navigate('/register');
      return;
    }

    if (user.role === 'teacher') {
      navigate('/teacher-dashboard');
    } else {
      navigate('/instructor-application');
    }
  };

  const handleWatchDemo = () => {
    navigate('/how-it-works');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4" variant="secondary">
              Become an Instructor
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Share Your Expertise with the World
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Create engaging courses, reach millions of students, and earn money doing what you love. Join our community of expert instructors today.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={handleGetStarted}
              >
                Get Started Today
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" onClick={handleWatchDemo}>
                <Play className="mr-2 h-4 w-4" />
                Watch How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Teach With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of instructors who are already earning and making an impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Earn Great Money</CardTitle>
                <CardDescription>
                  Top instructors earn over $100,000 annually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Keep 70% of course revenue
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Monthly payments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Bonus programs available
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>
                  Teach students from around the world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    5M+ active learners
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    190+ countries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multiple languages supported
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Professional Tools</CardTitle>
                <CardDescription>
                  Everything you need to create amazing courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Video recording tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Course builder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Analytics dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5M+</div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-gray-600">Paid to Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Start teaching in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Plan Your Course",
                description: "Choose your topic, outline your curriculum, and set learning objectives"
              },
              {
                step: "2", 
                title: "Create Content",
                description: "Record videos, create assignments, and build engaging course materials"
              },
              {
                step: "3",
                title: "Publish & Earn",
                description: "Launch your course, attract students, and start earning from day one"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories from Our Instructors
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from real instructors making real impact
            </p>
          </div>

          <TestimonialCarousel testimonials={instructorTestimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Teaching?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of expert instructors and start making an impact today. Your knowledge can change lives.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={handleGetStarted}
          >
            Become an Instructor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TeachOnPlatform;
