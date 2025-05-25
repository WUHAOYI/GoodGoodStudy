
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, DollarSign, Play, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPreview from './VideoPreview';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  category: string;
  image: string;
  isPaid: boolean;
  isPopular: boolean;
  previewVideoUrl?: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const navigate = useNavigate();

  // Sample video URLs for demo purposes - ensuring each course gets a working video
  const sampleVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
  ];
  
  const previewVideoUrl = course.previewVideoUrl || sampleVideos[course.id % sampleVideos.length];

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  const formatStudentCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Opening video preview for:', course.title, 'with URL:', previewVideoUrl);
    setShowVideoPreview(true);
  };

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (course.isPaid) {
      navigate('/payment', { state: { course } });
    } else {
      navigate('/student-dashboard', { state: { enrolledCourse: course } });
    }
  };

  return (
    <>
      <Card 
        className="group h-full bg-white hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-gray-100"
              onClick={handlePreviewClick}
            >
              <Play className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {course.isPopular && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Popular
              </Badge>
            )}
            {!course.isPaid && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Free
              </Badge>
            )}
          </div>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
              {course.title}
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-gray-600">
            {course.instructor}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Rating and Students */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{formatStudentCount(course.students)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Level Badge */}
          <Badge variant="outline" className="mb-4 text-xs">
            {course.level}
          </Badge>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            
            <Button 
              size="sm"
              className={`transition-all duration-200 ${
                course.isPaid 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              onClick={handleBuyClick}
            >
              {course.isPaid ? (
                <>
                  <DollarSign className="h-4 w-4 mr-1" />
                  Buy Now
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Start Free
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Video Preview Modal */}
      <VideoPreview
        videoUrl={previewVideoUrl}
        thumbnail={course.image}
        title={course.title}
        onClose={() => setShowVideoPreview(false)}
        isOpen={showVideoPreview}
      />
    </>
  );
};

export default CourseCard;
