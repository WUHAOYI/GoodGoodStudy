
import React from 'react';

interface VideoProgressBarProps {
  currentTime: number;
  totalTime: number;
  onSeek: (time: number) => void;
}

const VideoProgressBar = ({ currentTime, totalTime, onSeek }: VideoProgressBarProps) => {
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (totalTime === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * totalTime;
    onSeek(newTime);
  };

  const progressPercentage = totalTime > 0 && isFinite(currentTime) ? (currentTime / totalTime) * 100 : 0;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div 
        className="w-full bg-gray-200 rounded-full h-2 mb-4 cursor-pointer"
        onClick={handleSeek}
      >
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(totalTime)}
        </div>
      </div>
    </div>
  );
};

export default VideoProgressBar;
