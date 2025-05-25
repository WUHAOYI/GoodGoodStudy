
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Users, BookOpen, TrendingUp, Video, FileText, Award, Heart, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

const TeachOnPlatform = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Money',
      description: 'Keep up to 85% of your course revenue with our competitive instructor rates',
      stat: '85%'
    },
    {
      icon: Users,
      title: 'Reach Students Globally',
      description: 'Access our community of 50,000+ learners from around the world',
      stat: '50K+'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Track your course performance with detailed analytics and student feedback',
      stat: '24/7'
    },
    {
      icon: Award,
      title: 'Build Your Brand',
      description: 'Establish yourself as an expert and grow your professional reputation',
      stat: '⭐'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Plan Your Course',
      description: 'Define your course topic, learning objectives, and target audience',
      icon: FileText
    },
    {
      number: '2',
      title: 'Create Content',
      description: 'Record videos, create assignments, and develop course materials',
      icon: Video
    },
    {
      number: '3',
      title: 'Publish & Promote',
      description: 'Launch your course and start earning from your first student enrollment',
      icon: BookOpen
    }
  ];

  const requirements = [
    'Industry expertise or professional experience in your teaching subject',
    'Ability to create engaging, high-quality video content',
    'Commitment to student success and responsive communication',
    'Basic technical skills for content creation and platform navigation'
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Data Science Instructor',
      avatar: '👩‍🔬',
      quote: 'Teaching on EduPlatform has allowed me to reach thousands of students and generate significant passive income.',
      earnings: '$15K+/month'
    },
    {
      name: 'Marcus Johnson',
      role: 'Web Development Expert',
      avatar: '👨‍💻',
      quote: 'The platform provides excellent tools for course creation and the student community is amazing.',
      earnings: '$8K+/month'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Digital Marketing Specialist',
      avatar: '👩‍💼',
      quote: 'I love how easy it is to create and manage courses. The analytics help me improve constantly.',
      earnings: '$12K+/month'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            For Instructors
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Share Your Knowledge,
            <span className="text-blue-600 block">Earn Income</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of instructors who are teaching what they love and earning money 
            doing it. Create engaging courses and build a thriving online teaching business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              Start Teaching Today
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Teach on EduPlatform?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardHeader>
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          How to Get Started
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg relative">
                <CardHeader className="text-center">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.number}
                  </div>
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600">
                    {step.description}
                  </CardDescription>
                </CardContent>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-200"></div>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Requirements Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Instructor Requirements
          </h2>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Look For:</h3>
                  <ul className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Apply?</h3>
                  <p className="text-gray-600 mb-4">
                    Fill out our instructor application form and we'll review your profile within 2-3 business days.
                  </p>
                  <Button className="w-full">
                    Apply to Teach
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Success Stories from Our Instructors
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {testimonial.earnings}
                    </Badge>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Start Your Teaching Journey
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 48 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Full Name
                  </label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email Address
                  </label>
                  <Input type="email" placeholder="Enter your email" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Area of Expertise
                </label>
                <Input placeholder="e.g., Web Development, Data Science, Marketing" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Teaching Experience
                </label>
                <Textarea 
                  placeholder="Tell us about your teaching or professional experience..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Course Ideas
                </label>
                <Textarea 
                  placeholder="What courses would you like to create on our platform?"
                  className="min-h-[100px]"
                />
              </div>
              
              <Button className="w-full" size="lg">
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Teaching?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of expert instructors and start earning today
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-3">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TeachOnPlatform;
