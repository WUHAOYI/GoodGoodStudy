
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface LessonPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    title: string;
    duration: string;
    videoUrl?: string;
  } | null;
  courseTitle: string;
}

const LessonPlayer = ({ isOpen, onClose, lesson, courseTitle }: LessonPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(3600);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSkip = (direction: 'forward' | 'back') => {
    if (videoRef.current) {
      const skipAmount = 10;
      if (direction === 'forward') {
        videoRef.current.currentTime = Math.min(videoRef.current.currentTime + skipAmount, totalTime);
      } else {
        videoRef.current.currentTime = Math.max(videoRef.current.currentTime - skipAmount, 0);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setTotalTime(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * totalTime;
    videoRef.current.currentTime = newTime;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleClose = () => {
    // Pause video before closing
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Don't render if lesson is null
  if (!lesson) {
    return null;
  }

  // Default video URL for demo purposes
  const videoUrl = lesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{lesson.title}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Video Player */}
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full"
              onClick={togglePlay}
              poster="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play/Pause Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlay}
                className="bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          </div>
          
          {/* Controls */}
          <div className="bg-gray-50 p-4 rounded-lg">
            {/* Progress Bar */}
            <div 
              className="w-full bg-gray-200 rounded-full h-2 mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSkip('back')}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  onClick={togglePlay}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSkip('forward')}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
                
                <Button variant="ghost" size="sm" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                
                <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                {formatTime(currentTime)} / {formatTime(totalTime)}
              </div>
            </div>
          </div>
          
          {/* Lesson Info */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold mb-2">About this lesson</h3>
            <p className="text-gray-600 text-sm">
              Duration: {lesson.duration}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Course: {courseTitle}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              In this lesson, you'll learn the fundamentals covered in "{lesson.title}". 
              Follow along with the video and practice the concepts presented.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonPlayer;
