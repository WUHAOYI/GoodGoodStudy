
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
  onClose: () => void;
  isOpen: boolean;
}

const VideoPreview = ({ videoUrl, thumbnail, title, onClose, isOpen }: VideoPreviewProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const videoDuration = video.duration;
      if (!isNaN(videoDuration) && isFinite(videoDuration)) {
        setDuration(videoDuration);
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    const handleCanPlayThrough = () => {
      const videoDuration = video.duration;
      if (!isNaN(videoDuration) && isFinite(videoDuration)) {
        setDuration(videoDuration);
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    const handleTimeUpdate = () => {
      if (isLoaded) {
        setCurrentTime(video.currentTime);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleLoadStart = () => {
      setIsLoading(true);
      setIsLoaded(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsLoaded(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
    };
  }, [isLoaded]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Reset video state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentTime(0);
      setIsPlaying(false);
      setIsLoading(true);
      setIsLoaded(false);
      setDuration(0);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (videoRef.current && isLoaded) {
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

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoClick = () => {
    if (isLoaded) {
      togglePlay();
    }
  };

  const handleClose = () => {
    // Pause video before closing
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setIsLoaded(false);
    setDuration(0);
    onClose();
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !isLoaded || duration === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    videoRef.current.currentTime = newTime;
  };

  if (!isOpen) return null;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <Card className="relative max-w-5xl w-full bg-black border-0">
        <div className="relative" onMouseMove={handleMouseMove}>
          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Video Title */}
          <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-1 rounded">
            <h3 className="font-medium">{title} - Preview</h3>
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full aspect-video bg-black cursor-pointer"
            poster={thumbnail}
            onClick={handleVideoClick}
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Play/Pause Button Center */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              showControls && !isLoading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={togglePlay}
              className="bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
              disabled={!isLoaded}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div 
              className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                  disabled={!isLoaded}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Notice */}
        <div className="p-4 bg-gray-900 text-white text-center">
          <p className="text-sm opacity-80">
            This is a preview of the course content. 
            <span className="font-medium"> Enroll to access the full course.</span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default VideoPreview;
