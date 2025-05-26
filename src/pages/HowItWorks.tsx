
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Play, 
  BookOpen, 
  Users, 
  Award, 
  Video,
  Upload,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import VideoPreview from '@/components/VideoPreview';

const HowItWorks = () => {
  const navigate = useNavigate();
  const [showVideoPreview, setShowVideoPreview] = useState(false);

  const handleVideoClick = () => {
    setShowVideoPreview(true);
  };

  const handleVideoClose = () => {
    setShowVideoPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/teach')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Teach
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-purple-100 text-purple-700 mb-4" variant="secondary">
              How It Works
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              From Idea to Income in 4 Simple Steps
            </h1>
            <p className="text-lg text-gray-600">
              Join thousands of instructors earning money by sharing their expertise
            </p>
          </div>

          {/* Video Section */}
          <div 
            className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-12 cursor-pointer group"
            onClick={handleVideoClick}
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
              alt="How to create courses"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="bg-white/20 rounded-full p-6 group-hover:bg-white/30 transition-colors">
                <Play className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold mb-2">Watch: How to Create Your First Course</h3>
              <p className="text-sm opacity-90">5 minutes • Step-by-step tutorial</p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Plan Your Course</CardTitle>
                <CardDescription>
                  Choose your expertise area and outline your curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Pick a topic you're passionate about</li>
                  <li>• Research your target audience</li>
                  <li>• Create a detailed course outline</li>
                  <li>• Set clear learning objectives</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Create Content</CardTitle>
                <CardDescription>
                  Record videos and build engaging course materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Record high-quality video lessons</li>
                  <li>• Add quizzes and assignments</li>
                  <li>• Create downloadable resources</li>
                  <li>• Use our built-in editing tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Publish & Promote</CardTitle>
                <CardDescription>
                  Launch your course and attract students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Set your course price</li>
                  <li>• Write compelling descriptions</li>
                  <li>• Create promotional materials</li>
                  <li>• Launch to our marketplace</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <CardHeader className="pt-8">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Earn & Optimize</CardTitle>
                <CardDescription>
                  Start earning and improve based on feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Get paid monthly</li>
                  <li>• Receive student feedback</li>
                  <li>• Analyze performance metrics</li>
                  <li>• Continuously improve content</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Tools Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Powerful Tools at Your Fingertips</CardTitle>
              <CardDescription className="text-center">
                Everything you need to create professional courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Video Editor</h3>
                  <p className="text-sm text-gray-600">Built-in tools for trimming, merging, and enhancing your videos</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-sm text-gray-600">Track student progress, engagement, and revenue</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Student Management</h3>
                  <p className="text-sm text-gray-600">Communicate with students and manage Q&A</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Instructor Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$120K</div>
                  <p className="text-sm text-gray-600">Average annual earnings for top instructors</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">15K</div>
                  <p className="text-sm text-gray-600">Average students per successful course</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.6/5</div>
                  <p className="text-sm text-gray-600">Average instructor satisfaction rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Teaching?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our community of successful instructors and start earning today
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/teach')}>
                Become an Instructor
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/register')}>
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <VideoPreview
        isOpen={showVideoPreview}
        onClose={handleVideoClose}
        videoUrl="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"
        title="How to Create Your First Course"
      />
    </div>
  );
};

export default HowItWorks;
