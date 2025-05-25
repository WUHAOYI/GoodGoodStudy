
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, TrendingUp, Shield, Zap, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';

const ForBusiness = () => {
  const features = [
    {
      icon: Users,
      title: 'Team Management',
      description: 'Easily manage and track your team\'s learning progress with advanced analytics'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Get detailed insights into skill development and course completion rates'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SSO integration and compliance certifications'
    },
    {
      icon: Zap,
      title: 'Custom Learning Paths',
      description: 'Create tailored learning journeys aligned with your business objectives'
    },
    {
      icon: Award,
      title: 'Certification Programs',
      description: 'Offer industry-recognized certificates to validate employee skills'
    },
    {
      icon: Building2,
      title: 'White-label Solutions',
      description: 'Customize the platform with your branding and specific requirements'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: 'per month',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 25 users',
        'Basic analytics',
        'Email support',
        'Course library access',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: 'per month',
      description: 'Ideal for growing organizations',
      features: [
        'Up to 100 users',
        'Advanced analytics',
        'Priority support',
        'Custom learning paths',
        'API access',
        'SSO integration'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with specific needs',
      features: [
        'Unlimited users',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'Training consulting'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      company: 'TechCorp Inc.',
      logo: '🏢',
      quote: 'EduPlatform transformed our employee training. We saw a 40% increase in skill completion rates.',
      author: 'Sarah Johnson',
      role: 'HR Director'
    },
    {
      company: 'Innovation Labs',
      logo: '🚀',
      quote: 'The custom learning paths helped us align training with our specific technology stack.',
      author: 'Mike Chen',
      role: 'CTO'
    },
    {
      company: 'Global Solutions',
      logo: '🌍',
      quote: 'Outstanding platform with excellent analytics. Our teams love the user experience.',
      author: 'Emily Rodriguez',
      role: 'Learning & Development Manager'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            For Business
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Upskill Your Team with
            <span className="text-blue-600 block">Enterprise Learning Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empower your workforce with cutting-edge skills training. Boost productivity, 
            retention, and innovation with our comprehensive business platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3">
              Schedule Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Trust Us</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">2M+</div>
              <div className="text-gray-600">Employees Trained</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
              <div className="text-gray-600">Productivity Increase</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Enterprise Features Built for Scale
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Choose the Right Plan for Your Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          What Our Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl">{testimonial.logo}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.company}</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of companies already using EduPlatform to upskill their teams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForBusiness;
