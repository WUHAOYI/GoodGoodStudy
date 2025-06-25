import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  PlayCircle,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle,
  Play
} from 'lucide-react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCourses } from '@/contexts/CourseContext';
import LessonPlayer from '@/components/LessonPlayer';
import VideoPreview from '@/components/VideoPreview';
import CourseReviews from '@/components/CourseReviews';
import QuizButton from '@/components/QuizButton';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isEnrolled: checkEnrollment, enrollInCourse, enrolledCourses } = useEnrollment();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { getCourseById } = useCourses();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLessonPlayerOpen, setIsLessonPlayerOpen] = useState(false);
  const [previewLesson, setPreviewLesson] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const courseId = parseInt(id || '1');
  const isEnrolled = checkEnrollment(courseId);

  // Get course data from CourseContext
  const courseFromContext = getCourseById(courseId);

  // Get course progress from enrolled courses
  const enrolledCourse = enrolledCourses.find(course => course.id === courseId);
  const courseProgress = enrolledCourse?.progress || 0;

  // Listen for enrollment changes and refresh the page data
  useEffect(() => {
    console.log('Enrollment status changed for course', courseId, ':', isEnrolled);
  }, [isEnrolled, courseId]);

  // Sample video URLs - ensuring each gets a working video
  const sampleVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
  ];

  // If course exists in CourseContext, use it; otherwise fall back to hardcoded data
  const course = courseFromContext ? {
    id: courseFromContext.id,
    title: courseFromContext.title,
    instructor: courseFromContext.instructor,
    price: courseFromContext.price,
    originalPrice: courseFromContext.price + 50, // Add some original price for display
    rating: courseFromContext.rating,
    students: courseFromContext.students,
    duration: courseFromContext.duration,
    lessons: courseFromContext.curriculum?.reduce((total, section) => total + (section.videoUrl ? 1 : 0), 0) || 10,
    level: courseFromContext.level,
    image: courseFromContext.thumbnail,
    description: courseFromContext.description,
    videoUrl: courseFromContext.curriculum?.[0]?.videoUrl || sampleVideos[0],
    category: courseFromContext.category,
    requirements: [
      "Basic computer skills",
      "No prior experience required",
      "A computer with internet connection"
    ],
    curriculum: courseFromContext.curriculum?.map((item, index) => ({
      title: `${courseFromContext.category} Section ${index + 1}`,
      lessons: [
        { 
          id: item.id, 
          title: item.title, 
          duration: item.duration || "15:30", 
          videoUrl: item.videoUrl || sampleVideos[index % sampleVideos.length], 
          isPreview: index === 0 
        }
      ],
      duration: item.duration || "2 hours"
    })) || [
      { 
        title: "Introduction", 
        lessons: [
          { id: 1, title: "Getting Started", duration: "15:30", videoUrl: sampleVideos[0], isPreview: true }
        ], 
        duration: "2 hours" 
      }
    ]
  } : getCourseData(courseId);

  // Fallback course data function (keeping the existing logic for courses not in CourseContext)
  function getCourseData(id: number) {
    const coursesData = {
      1: {
        id: 1,
        title: "Full Stack Web Development Bootcamp",
        instructor: "Tech Academy",
        price: 299,
        originalPrice: 499,
        rating: 4.8,
        students: 12450,
        duration: "40 hours",
        lessons: 156,
        level: "Beginner",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
        description: "Master both frontend and backend development with hands-on projects and real-world applications. Learn React, Node.js, and modern web technologies.",
        videoUrl: sampleVideos[0],
        category: "programming",
        requirements: [
          "Basic computer skills",
          "No prior programming experience required",
          "A computer with internet connection"
        ],
        curriculum: [
          { 
            title: "Introduction to Web Development", 
            lessons: [
              { id: 1, title: "What is Web Development?", duration: "15:30", videoUrl: sampleVideos[1], isPreview: true },
              { id: 2, title: "Setting Up Your Development Environment", duration: "20:45", videoUrl: sampleVideos[2], isPreview: false },
              { id: 3, title: "Your First Web Page", duration: "18:20", videoUrl: sampleVideos[3], isPreview: false }
            ], 
            duration: "2 hours" 
          },
          { 
            title: "HTML & CSS Fundamentals", 
            lessons: [
              { id: 4, title: "HTML Structure and Semantics", duration: "25:10", videoUrl: sampleVideos[4], isPreview: true },
              { id: 5, title: "CSS Styling Basics", duration: "30:15", videoUrl: sampleVideos[5], isPreview: false }
            ], 
            duration: "4 hours" 
          },
          { 
            title: "JavaScript Essentials", 
            lessons: [
              { id: 6, title: "Variables and Data Types", duration: "22:30", videoUrl: sampleVideos[0], isPreview: false }
            ], 
            duration: "6 hours" 
          },
          { title: "React Framework", lessons: [], duration: "8 hours" },
          { title: "Backend Development", lessons: [], duration: "6 hours" },
          { title: "Database Integration", lessons: [], duration: "4 hours" },
          { title: "Deployment & DevOps", lessons: [], duration: "3 hours" },
          { title: "Final Project", lessons: [], duration: "7 hours" }
        ]
      },
      2: {
        id: 2,
        title: "Digital Marketing Fundamentals",
        instructor: "Marketing Pro Institute",
        price: 0,
        originalPrice: 0,
        rating: 4.6,
        students: 8930,
        duration: "25 hours",
        lessons: 89,
        level: "Intermediate",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        description: "Learn the essentials of digital marketing including SEO, social media marketing, content strategy, and analytics to grow your business online.",
        videoUrl: sampleVideos[1],
        category: "marketing",
        requirements: [
          "Basic understanding of business concepts",
          "Access to social media platforms",
          "Computer with internet connection"
        ],
        curriculum: [
          { 
            title: "Digital Marketing Basics", 
            lessons: [
              { id: 1, title: "Introduction to Digital Marketing", duration: "12:30", videoUrl: sampleVideos[1], isPreview: true },
              { id: 2, title: "Understanding Your Audience", duration: "18:45", videoUrl: sampleVideos[2], isPreview: false }
            ], 
            duration: "3 hours" 
          },
          { 
            title: "SEO Fundamentals", 
            lessons: [
              { id: 3, title: "Search Engine Optimization Basics", duration: "25:10", videoUrl: sampleVideos[3], isPreview: true },
              { id: 4, title: "Keyword Research", duration: "22:15", videoUrl: sampleVideos[4], isPreview: false }
            ], 
            duration: "5 hours" 
          },
          { title: "Social Media Marketing", lessons: [], duration: "6 hours" },
          { title: "Content Strategy", lessons: [], duration: "4 hours" },
          { title: "Analytics & Measurement", lessons: [], duration: "7 hours" }
        ]
      },
      3: {
        id: 3,
        title: "Project Management Professional (PMP)",
        instructor: "Business Excellence Academy",
        price: 199,
        originalPrice: 299,
        rating: 4.9,
        students: 5670,
        duration: "60 hours",
        lessons: 203,
        level: "Advanced",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
        description: "Comprehensive preparation for PMP certification covering project lifecycle, risk management, and leadership skills for successful project delivery.",
        videoUrl: sampleVideos[2],
        category: "business",
        requirements: [
          "3+ years of project management experience",
          "Bachelor's degree or equivalent",
          "Understanding of project management concepts"
        ],
        curriculum: [
          { 
            title: "Project Management Framework", 
            lessons: [
              { id: 1, title: "Introduction to Project Management", duration: "20:30", videoUrl: sampleVideos[2], isPreview: true },
              { id: 2, title: "Project Lifecycle", duration: "35:45", videoUrl: sampleVideos[3], isPreview: false }
            ], 
            duration: "8 hours" 
          },
          { title: "Risk Management", lessons: [], duration: "10 hours" },
          { title: "Leadership & Communication", lessons: [], duration: "12 hours" },
          { title: "Quality Management", lessons: [], duration: "8 hours" },
          { title: "PMP Exam Preparation", lessons: [], duration: "22 hours" }
        ]
      }
    };

    return coursesData[id] || coursesData[1]; // Default to course 1 if ID not found
  }

  const handlePlayLesson = (lesson) => {
    console.log('Playing lesson:', lesson, 'isEnrolled:', isEnrolled);
    
    // If user is enrolled, they can play any lesson in full player
    if (isEnrolled) {
      console.log('User enrolled - playing in lesson player');
      setSelectedLesson({
        ...lesson,
        videoUrl: lesson.videoUrl
      });
      setIsLessonPlayerOpen(true);
    } else if (lesson.isPreview) {
      // Non-enrolled users can only play preview lessons in preview modal
      console.log('User not enrolled - playing preview');
      setPreviewLesson({
        title: lesson.title,
        videoUrl: lesson.videoUrl,
        duration: lesson.duration
      });
      setIsPreviewOpen(true);
    } else {
      // Show enrollment prompt for non-preview lessons
      console.log('User not enrolled - showing enrollment prompt');
      toast({
        title: "Enrollment Required",
        description: "Please enroll in this course to access this lesson.",
        action: (
          <Button size="sm" onClick={handleEnroll}>
            Enroll Now
          </Button>
        )
      });
    }
  };

  const handlePlayMainVideo = () => {
    console.log('Playing main course video:', course.videoUrl, 'isEnrolled:', isEnrolled);
    if (isEnrolled) {
      // If enrolled, play as a full lesson
      console.log('User enrolled - playing main video in lesson player');
      setSelectedLesson({
        id: 0,
        title: course.title + " - Course Introduction",
        videoUrl: course.videoUrl,
        duration: "2:30",
        isPreview: false
      });
      setIsLessonPlayerOpen(true);
    } else {
      // If not enrolled, play as preview
      console.log('User not enrolled - playing main video as preview');
      setPreviewLesson({
        title: course.title + " - Course Preview",
        videoUrl: course.videoUrl,
        duration: "2:30"
      });
      setIsPreviewOpen(true);
    }
  };

  const handleEnroll = () => {
    console.log('Processing payment for:', course.title);
    // Navigate to payment page with course data, but don't pass functions
    navigate('/payment', { 
      state: { 
        course: {
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          price: course.price,
          originalPrice: course.originalPrice,
          level: course.level,
          image: course.image,
          duration: course.duration
        },
        amount: course.price,
        courseId: courseId
      } 
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: course.title,
          text: `Check out this amazing course: ${course.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Course link has been copied to clipboard",
        });
      }
    } catch (error) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied",
          description: "Course link has been copied to clipboard",
        });
      } catch (clipboardError) {
        toast({
          title: "Share Failed",
          description: "Unable to share or copy link",
          variant: "destructive"
        });
      }
    }
  };

  const handleWishlist = () => {
    const wishlistItem = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      image: course.image,
      rating: course.rating
    };

    if (isInWishlist(course.id)) {
      removeFromWishlist(course.id);
      toast({
        title: "Removed from Wishlist",
        description: `${course.title} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(wishlistItem);
      toast({
        title: "Added to Wishlist",
        description: `${course.title} has been added to your wishlist`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {isEnrolled && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">You are enrolled in this course!</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-600">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{course.lessons} lessons</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant="secondary">{course.level}</Badge>
                <span className="text-gray-600">Created by {course.instructor}</span>
              </div>
            </div>

            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer group" onClick={handlePlayMainVideo}>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-colors">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold">Course Preview</h3>
                <p className="text-sm opacity-90">Get a preview of what you'll learn</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Build responsive websites with HTML, CSS, and JavaScript",
                    "Create interactive web applications with React",
                    "Develop backend APIs with Node.js and Express",
                    "Work with databases and data modeling",
                    "Deploy applications to production",
                    "Best practices for code organization and testing"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>{course.lessons} lessons • {course.duration} total length</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.curriculum.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">{section.title}</h4>
                        <span className="text-sm text-gray-600">{section.duration}</span>
                      </div>
                      {section.lessons && section.lessons.length > 0 && (
                        <div className="space-y-2 ml-4">
                          {section.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between py-2 border-l-2 border-gray-100 pl-4">
                              <div className="flex items-center gap-3">
                                <Play className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                                  <p className="text-xs text-gray-500">{lesson.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isPreview && (
                                  <Badge variant="outline" className="text-xs">Preview</Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && (
                                  <Badge variant="secondary" className="text-xs">Requires Enrollment</Badge>
                                )}
                                {isEnrolled && (
                                  <Badge variant="default" className="text-xs bg-green-600">Available</Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handlePlayLesson(lesson)}
                                  className="h-8 px-2"
                                  title={lesson.isPreview || isEnrolled ? "Play lesson" : "Preview not available"}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {(!section.lessons || section.lessons.length === 0) && (
                        <p className="text-sm text-gray-600 ml-4">Lessons coming soon...</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <QuizButton 
              courseId={course.id}
              courseTitle={course.title}
              isEnrolled={isEnrolled}
              progress={courseProgress}
            />

            <CourseReviews courseId={course.id} />
          </div>

          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="relative aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden cursor-pointer group" onClick={handlePlayMainVideo}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-3 group-hover:bg-black/70 transition-colors">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                {!isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                      {course.originalPrice > course.price && (
                        <>
                          <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                          <Badge variant="destructive" className="ml-auto">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                          </Badge>
                        </>
                      )}
                    </div>

                    <Button 
                      className="w-full mb-3" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>
                  </>
                ) : (
                  <div className="mb-4">
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-medium">Enrolled</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate('/continue-learning')}
                    >
                      Continue Learning
                    </Button>
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleWishlist}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist(course.id) ? 'text-red-500 fill-current' : ''}`} />
                    {isInWishlist(course.id) ? 'Remove' : 'Wishlist'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{course.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{course.instructor}</h4>
                    <p className="text-sm text-gray-600">Expert Instructor</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Experienced professional with years of expertise in the field. 
                  Has taught thousands of students worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <LessonPlayer
        isOpen={isLessonPlayerOpen}
        onClose={() => setIsLessonPlayerOpen(false)}
        lesson={selectedLesson}
        courseTitle={course.title}
      />

      <VideoPreview
        videoUrl={previewLesson?.videoUrl || ""}
        thumbnail={course.image}
        title={previewLesson?.title || ""}
        onClose={() => setIsPreviewOpen(false)}
        isOpen={isPreviewOpen}
      />
    </div>
  );
};

export default CourseDetails;
