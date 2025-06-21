
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useRef } from 'react';
import VideoPlayer from './VideoPlayer';
import VideoProgressBar from './VideoProgressBar';

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
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setCurrentTime(0);
    setTotalTime(0);
    onClose();
  };

  const handleSeek = (time: number) => {
    // This would be handled by the VideoPlayer component internally
    // For now, we'll just update the current time
    setCurrentTime(time);
  };

  if (!lesson) {
    return null;
  }

  const videoUrl = lesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{lesson.title}</DialogTitle>
          <DialogDescription>
            Course: {courseTitle} • Duration: {lesson.duration}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <VideoPlayer
            videoUrl={videoUrl}
            onTimeUpdate={setCurrentTime}
            onDurationChange={setTotalTime}
            poster="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop"
          />
          
          <VideoProgressBar
            currentTime={currentTime}
            totalTime={totalTime}
            onSeek={handleSeek}
          />
          
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
