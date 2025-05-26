import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import LessonPlayer from '@/components/LessonPlayer';
import VideoPreview from '@/components/VideoPreview';
import CourseReviews from '@/components/CourseReviews';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isEnrolled: checkEnrollment, enrollInCourse } = useEnrollment();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isLessonPlayerOpen, setIsLessonPlayerOpen] = useState(false);
  const [previewLesson, setPreviewLesson] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const courseId = parseInt(id || '1');
  const isEnrolled = checkEnrollment(courseId);

  // Mock course data - in a real app, this would be fetched based on the ID
  const course = {
    id: courseId,
    title: "Full Stack Web Development Bootcamp",
    instructor: "Dr. Sarah Johnson",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    students: 12543,
    duration: "40 hours",
    lessons: 156,
    level: "Beginner to Advanced",
    image: "/placeholder.svg",
    description: "Master full-stack web development with this comprehensive bootcamp. Learn HTML, CSS, JavaScript, React, Node.js, and more.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    requirements: [
      "Basic computer skills",
      "No prior programming experience required",
      "A computer with internet connection"
    ],
    curriculum: [
      { 
        title: "Introduction to Web Development", 
        lessons: [
          { id: 1, title: "What is Web Development?", duration: "15:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", isPreview: true },
          { id: 2, title: "Setting Up Your Development Environment", duration: "20:45", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isPreview: false },
          { id: 3, title: "Your First Web Page", duration: "18:20", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", isPreview: false }
        ], 
        duration: "2 hours" 
      },
      { 
        title: "HTML & CSS Fundamentals", 
        lessons: [
          { id: 4, title: "HTML Structure and Semantics", duration: "25:10", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", isPreview: true },
          { id: 5, title: "CSS Styling Basics", duration: "30:15", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", isPreview: false }
        ], 
        duration: "4 hours" 
      },
      { 
        title: "JavaScript Essentials", 
        lessons: [
          { id: 6, title: "Variables and Data Types", duration: "22:30", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", isPreview: false }
        ], 
        duration: "6 hours" 
      },
      { title: "React Framework", lessons: [], duration: "8 hours" },
      { title: "Backend Development", lessons: [], duration: "6 hours" },
      { title: "Database Integration", lessons: [], duration: "4 hours" },
      { title: "Deployment & DevOps", lessons: [], duration: "3 hours" },
      { title: "Final Project", lessons: [], duration: "7 hours" }
    ]
  };

  const handlePlayLesson = (lesson) => {
    console.log('Playing lesson:', lesson, 'isEnrolled:', isEnrolled);
    
    // Check if lesson is preview or user is enrolled
    if (lesson.isPreview || isEnrolled) {
      if (lesson.isPreview && !isEnrolled) {
        setPreviewLesson({
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration
        });
        setIsPreviewOpen(true);
      } else {
        setSelectedLesson(lesson);
        setIsLessonPlayerOpen(true);
      }
    } else {
      // Show enrollment prompt for non-preview lessons
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
    console.log('Playing main course video:', course.videoUrl);
    setPreviewLesson({
      title: course.title + " - Course Preview",
      videoUrl: course.videoUrl,
      duration: "2:30"
    });
    setIsPreviewOpen(true);
  };

  const handleEnroll = () => {
    console.log('Processing payment for:', course.title);
    navigate('/payment', { 
      state: { 
        course: course,
        amount: course.price,
        onSuccess: () => {
          enrollInCourse(courseId);
          toast({
            title: "Successfully Enrolled!",
            description: `You are now enrolled in ${course.title}`,
          });
        }
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
                                  <Badge variant="default" className="text-xs bg-green-600">Enrolled</Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handlePlayLesson(lesson)}
                                  className="h-8 px-2"
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
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                      <Badge variant="destructive" className="ml-auto">25% OFF</Badge>
                    </div>

                    <Button 
                      className="w-full mb-3" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
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
                    <p className="text-sm text-gray-600">Senior Full Stack Developer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Experienced developer with 10+ years in web development. 
                  Has taught over 50,000 students worldwide.
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
