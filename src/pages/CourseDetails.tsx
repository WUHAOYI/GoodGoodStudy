
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Award, 
  CheckCircle, 
  Download,
  Globe,
  Smartphone,
  Heart,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';
import Header from '@/components/Header';
import VideoPreview from '@/components/VideoPreview';
import CourseReviews from '@/components/CourseReviews';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Complete course data with all courses from the Courses page
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      instructor: "Tech Academy",
      instructorBio: "Leading technology education provider with 10+ years of experience",
      price: 299,
      originalPrice: 499,
      rating: 4.8,
      students: 12450,
      duration: "40 hours",
      level: "Beginner",
      category: "programming",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
      previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Master full-stack web development with our comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and database management.",
      whatYouWillLearn: [
        "Build responsive websites with HTML, CSS, and JavaScript",
        "Create dynamic web applications with React",
        "Develop server-side applications with Node.js",
        "Work with databases and APIs",
        "Deploy applications to production"
      ],
      curriculum: [
        { title: "Introduction to Web Development", duration: "2 hours", lessons: 8 },
        { title: "HTML & CSS Fundamentals", duration: "6 hours", lessons: 12 },
        { title: "JavaScript Programming", duration: "8 hours", lessons: 15 },
        { title: "React Development", duration: "12 hours", lessons: 20 },
        { title: "Node.js Backend", duration: "8 hours", lessons: 14 },
        { title: "Database Integration", duration: "4 hours", lessons: 10 }
      ],
      requirements: [
        "Basic computer skills",
        "No prior programming experience required",
        "Computer with internet connection"
      ],
      isPaid: true,
      language: "English",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      instructor: "Marketing Pro Institute",
      instructorBio: "Digital marketing experts with proven industry results",
      price: 0,
      rating: 4.6,
      students: 8930,
      duration: "25 hours",
      level: "Intermediate",
      category: "marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
      previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description: "Learn digital marketing strategies that drive real business results. From SEO to social media marketing.",
      whatYouWillLearn: [
        "SEO and content marketing strategies",
        "Social media marketing campaigns",
        "Email marketing automation",
        "Google Ads and PPC campaigns",
        "Analytics and performance measurement"
      ],
      curriculum: [
        { title: "Digital Marketing Overview", duration: "3 hours", lessons: 6 },
        { title: "SEO Fundamentals", duration: "5 hours", lessons: 10 },
        { title: "Social Media Strategy", duration: "6 hours", lessons: 12 },
        { title: "Email Marketing", duration: "4 hours", lessons: 8 },
        { title: "Paid Advertising", duration: "7 hours", lessons: 14 }
      ],
      requirements: [
        "Basic understanding of business concepts",
        "Access to social media platforms",
        "Computer with internet connection"
      ],
      isPaid: false,
      language: "English",
      lastUpdated: "2024-02-01"
    },
    {
      id: 3,
      title: "Project Management Professional (PMP)",
      instructor: "Business Excellence Academy",
      instructorBio: "Certified project management professionals with real-world experience",
      price: 199,
      rating: 4.9,
      students: 5670,
      duration: "60 hours",
      level: "Advanced",
      category: "business",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
      previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      description: "Comprehensive PMP certification preparation course covering all aspects of project management.",
      whatYouWillLearn: [
        "Project management lifecycle",
        "Risk management and mitigation",
        "Team leadership and communication",
        "Budget and schedule management",
        "Quality assurance processes"
      ],
      curriculum: [
        { title: "Project Management Fundamentals", duration: "10 hours", lessons: 15 },
        { title: "Planning and Execution", duration: "15 hours", lessons: 20 },
        { title: "Risk and Quality Management", duration: "15 hours", lessons: 18 },
        { title: "Leadership and Communication", duration: "10 hours", lessons: 12 },
        { title: "PMP Exam Preparation", duration: "10 hours", lessons: 16 }
      ],
      requirements: [
        "Bachelor's degree or equivalent",
        "Some project management experience",
        "Commitment to complete the course"
      ],
      isPaid: true,
      language: "English",
      lastUpdated: "2024-01-20"
    }
  ];

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === parseInt(id || '1'));
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // If course not found, redirect to courses page
      navigate('/courses');
    }
  }, [id, navigate]);

  const handlePurchase = () => {
    if (course?.isPaid) {
      navigate('/payment', { state: { course } });
    } else {
      // For free courses, start learning immediately
      navigate('/student-dashboard', { state: { enrolledCourse: course } });
    }
  };

  const handleShare = (platform?: string) => {
    const courseUrl = window.location.href;
    const shareText = `Check out this course: ${course?.title}`;
    
    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(courseUrl)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(courseUrl).then(() => {
            toast({
              title: "Link copied!",
              description: "Course link has been copied to clipboard",
            });
          }).catch(() => {
            toast({
              title: "Copy failed",
              description: "Unable to copy link to clipboard",
              variant: "destructive",
            });
          });
          setShowShareMenu(false);
          return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareMenu(false);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handlePlayLesson = (sectionIndex: number, lessonIndex?: number) => {
    toast({
      title: "Starting lesson",
      description: "Lesson playback would start here",
    });
    // In a real app, this would navigate to the lesson player
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
            <Button onClick={() => navigate('/courses')}>
              Browse All Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="outline" className="mb-2">{course.category}</Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleShare()}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    
                    {/* Share Menu */}
                    {showShareMenu && (
                      <div className="absolute top-12 right-0 bg-white border rounded-lg shadow-lg p-4 z-10 min-w-48">
                        <h4 className="font-semibold mb-3">Share this course</h4>
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleShare('facebook')}
                          >
                            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                            Facebook
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleShare('twitter')}
                          >
                            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                            Twitter
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleShare('linkedin')}
                          >
                            <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                            LinkedIn
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            onClick={() => handleShare('copy')}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Link
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Preview */}
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-gray-100"
                      onClick={() => setShowVideoPreview(true)}
                    >
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {course.whatYouWillLearn.map((item: string, index: number) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req: string, index: number) => (
                          <li key={index} className="text-gray-700">• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum" className="space-y-4">
                    <h3 className="text-xl font-semibold">Course Curriculum</h3>
                    <div className="space-y-3">
                      {course.curriculum.map((section: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{section.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {section.lessons} lessons • {section.duration}
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handlePlayLesson(index)}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor" className="space-y-4">
                    <h3 className="text-xl font-semibold">About the Instructor</h3>
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{course.instructor}</h4>
                        <p className="text-gray-600">{course.instructorBio}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    <CourseReviews courseId={parseInt(id || '1')} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <div className="text-lg text-gray-500 line-through">
                      ${course.originalPrice}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePurchase}
                >
                  {course.isPaid ? 'Buy Now' : 'Start Learning'}
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  30-day money-back guarantee
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{course.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-gray-500" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-gray-500" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <span>Language: {course.language}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowShareMenu(false)}
        />
      )}

      {/* Video Preview Modal */}
      {showVideoPreview && (
        <VideoPreview
          videoUrl={course.previewVideoUrl}
          thumbnail={course.image}
          title={course.title}
          onClose={() => setShowVideoPreview(false)}
        />
      )}
    </div>
  );
};

export default CourseDetails;
