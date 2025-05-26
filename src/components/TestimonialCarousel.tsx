
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company?: string;
  rating: number;
  content: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const TestimonialCarousel = ({ 
  testimonials, 
  autoPlay = true, 
  autoPlayInterval = 5000 
}: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useState(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < currentTestimonial.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Avatar and Info */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {currentTestimonial.avatar ? (
                  <img 
                    src={currentTestimonial.avatar} 
                    alt={currentTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 font-semibold">
                    {currentTestimonial.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {currentTestimonial.name}
                </p>
                <p className="text-sm text-gray-600">
                  {currentTestimonial.title}
                  {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
        disabled={testimonials.length <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
        disabled={testimonials.length <= 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
