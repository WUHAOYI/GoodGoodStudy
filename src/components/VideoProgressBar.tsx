
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
    return `${mins.toString().padStart(1, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (totalTime === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(totalTime, percent * totalTime));
    onSeek(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (totalTime === 0) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (moveEvent.clientX - rect.left) / rect.width;
      const newTime = Math.max(0, Math.min(totalTime, percent * totalTime));
      onSeek(newTime);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const progressPercentage = totalTime > 0 && isFinite(currentTime) ? (currentTime / totalTime) * 100 : 0;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div 
        className="w-full bg-gray-200 rounded-full h-3 mb-4 cursor-pointer relative hover:h-4 transition-all duration-200"
        onClick={handleSeek}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-300 relative"
          style={{ width: `${Math.max(0, Math.min(100, progressPercentage))}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-600 rounded-full shadow-lg cursor-grab hover:cursor-grabbing transition-all duration-200 hover:scale-110"></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 font-medium">
          <span className="text-blue-600">{formatTime(currentTime)}</span>
          <span className="mx-2 text-gray-400">/</span>
          <span>{formatTime(totalTime)}</span>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {totalTime > 0 ? `${Math.round(progressPercentage)}% complete` : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default VideoProgressBar;
