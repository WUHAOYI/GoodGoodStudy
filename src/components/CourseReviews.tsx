
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: number;
  userName: string;
  userRole: 'student' | 'teacher' | 'admin';
  rating: number;
  comment: string;
  date: string;
}

interface CourseReviewsProps {
  courseId: number;
}

const CourseReviews = ({ courseId }: CourseReviewsProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      userName: "John Doe",
      userRole: "student",
      rating: 5,
      comment: "Excellent course! Very comprehensive and well-structured.",
      date: "2024-05-20"
    },
    {
      id: 2,
      userName: "Jane Smith",
      userRole: "teacher",
      rating: 4,
      comment: "Good content, but could use more practical examples.",
      date: "2024-05-18"
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to submit a review",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      userName: user.name,
      userRole: user.role,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setNewComment('');
    setNewRating(5);

    toast({
      title: "Review submitted",
      description: "Your review has been posted successfully",
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    if (user?.role !== 'admin') return;

    setReviews(reviews.filter(review => review.id !== reviewId));
    toast({
      title: "Review deleted",
      description: "The review has been removed",
    });
  };

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onClick?.(star)}
          />
        ))}
      </div>
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Student Reviews ({reviews.length})</h3>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">
            {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No ratings'}
          </span>
        </div>
      </div>

      {/* Add Review Form */}
      {user && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Write a Review</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-2">Rating</label>
                {renderStars(newRating, true, setNewRating)}
              </div>
              <div>
                <label className="text-sm font-medium block mb-2">Comment</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this course..."
                  rows={3}
                />
              </div>
              <Button onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      <Badge className={getRoleBadgeColor(review.userRole)}>
                        {review.userRole}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseReviews;
