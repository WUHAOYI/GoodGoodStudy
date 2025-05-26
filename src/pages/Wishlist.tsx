
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (courseId: number, courseTitle: string) => {
    removeFromWishlist(courseId);
    toast({
      title: "Removed from Wishlist",
      description: `${courseTitle} has been removed from your wishlist.`,
    });
  };

  const handleEnrollNow = (courseId: number) => {
    navigate(`/course/${courseId}`);
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Courses you've saved for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start browsing courses and add them to your wishlist!</p>
            <Button onClick={() => navigate('/courses')}>
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleRemoveFromWishlist(course.id, course.title)}
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </Button>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      ${course.price}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleEnrollNow(course.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
