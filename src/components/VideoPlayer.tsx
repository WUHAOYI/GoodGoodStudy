
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (hasError: boolean) => void;
  poster?: string;
}

const VideoPlayer = ({ 
  videoUrl, 
  onTimeUpdate, 
  onDurationChange, 
  onPlayStateChange,
  onLoadingChange,
  onError,
  poster
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || !isLoaded || hasError) return;

    try {
      if (isPlaying) {
        video.pause();
      } else {
        await video.play();
      }
    } catch (error) {
      console.error('Error playing video:', error);
      setHasError(true);
      onError?.(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSkip = (direction: 'forward' | 'back') => {
    const video = videoRef.current;
    if (!video || !isLoaded) return;
    
    const skipAmount = 10;
    if (direction === 'forward') {
      video.currentTime = Math.min(video.currentTime + skipAmount, video.duration);
    } else {
      video.currentTime = Math.max(video.currentTime - skipAmount, 0);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    console.log('Loading video:', videoUrl);
    setIsLoading(true);
    setIsLoaded(false);
    setHasError(false);
    setIsPlaying(false);
    onLoadingChange?.(true);
    
    video.pause();
    video.currentTime = 0;
    video.src = videoUrl;
    video.preload = 'metadata';
    video.muted = isMuted;
    video.crossOrigin = 'anonymous';

    const handleLoadedMetadata = () => {
      const duration = video.duration;
      console.log('Video metadata loaded, duration:', duration);
      if (!isNaN(duration) && isFinite(duration) && duration > 0) {
        onDurationChange?.(duration);
        setIsLoaded(true);
        setIsLoading(false);
        setHasError(false);
        onLoadingChange?.(false);
        onError?.(false);
      } else {
        console.warn('Invalid video duration:', duration);
        setHasError(true);
        setIsLoading(false);
        onLoadingChange?.(false);
        onError?.(true);
      }
    };

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      if (isFinite(current)) {
        onTimeUpdate?.(current);
      }
    };

    const handlePlay = () => {
      console.log('Video playing');
      setIsPlaying(true);
      onPlayStateChange?.(true);
    };
    
    const handlePause = () => {
      console.log('Video paused');
      setIsPlaying(false);
      onPlayStateChange?.(false);
    };

    const handleError = () => {
      console.error('Video error occurred');
      setIsLoading(false);
      setIsLoaded(false);
      setHasError(true);
      setIsPlaying(false);
      onLoadingChange?.(false);
      onError?.(true);
      onPlayStateChange?.(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
      onLoadingChange?.(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsLoaded(true);
      onLoadingChange?.(false);
      onError?.(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl, isMuted, onTimeUpdate, onDurationChange, onPlayStateChange, onLoadingChange, onError]);

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="text-white text-center">
            <p className="text-lg mb-2">Unable to load video</p>
            <p className="text-sm opacity-75">Please try again later</p>
            <Button 
              variant="outline" 
              className="mt-4 text-white border-white"
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full"
        onClick={togglePlay}
        poster={poster}
        playsInline
        controls={false}
      >
        Your browser does not support the video tag.
      </video>
      
      {!isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="lg"
            onClick={togglePlay}
            className="bg-black/50 text-white hover:bg-black/70 w-16 h-16 rounded-full"
            disabled={!isLoaded}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 bg-black/70 rounded-lg p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSkip('back')}
            disabled={!isLoaded || hasError}
            className="text-white hover:bg-white/20"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={togglePlay}
            disabled={!isLoaded || isLoading || hasError}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSkip('forward')}
            disabled={!isLoaded || hasError}
            className="text-white hover:bg-white/20"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleMute}
            disabled={!isLoaded || hasError}
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleFullscreen}
            disabled={!isLoaded || hasError}
            className="text-white hover:bg-white/20"
          >
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
