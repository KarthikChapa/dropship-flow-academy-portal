
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoSectionProps {
  title: string;
  description: string;
  videoUrl?: string;
  duration: string;
  onVideoStart?: () => void;
}

const VideoSection = ({ title, description, videoUrl, duration, onVideoStart }: VideoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!isPlaying && onVideoStart) {
      onVideoStart();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="h-5 w-5 text-blue-600" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
          {videoUrl ? (
            <video 
              className="w-full h-full object-cover"
              controls
              poster="/api/placeholder/800/450"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Video Tutorial</p>
                <p className="text-sm opacity-75">Duration: {duration}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Audio
            </Button>
          </div>
          <span className="text-sm text-gray-600">Duration: {duration}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSection;
