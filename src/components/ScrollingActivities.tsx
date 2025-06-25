
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Trophy, Star } from 'lucide-react';

interface Activity {
  id: number;
  description: string;
  date: string;
  type: 'completion' | 'achievement' | 'start' | 'quiz';
  icon?: React.ReactNode;
}

const ScrollingActivities = () => {
  const [activities] = useState<Activity[]>([
    { 
      id: 1, 
      description: 'Completed "React Fundamentals" course', 
      date: '2024-07-15',
      type: 'completion',
      icon: <BookOpen className="h-4 w-4 text-green-600" />
    },
    { 
      id: 2, 
      description: 'Scored 92% on JavaScript quiz', 
      date: '2024-07-14',
      type: 'quiz',
      icon: <Star className="h-4 w-4 text-yellow-600" />
    },
    { 
      id: 3, 
      description: 'Started "Node.js Advanced" course', 
      date: '2024-07-10',
      type: 'start',
      icon: <BookOpen className="h-4 w-4 text-blue-600" />
    },
    { 
      id: 4, 
      description: 'Earned "Fast Learner" achievement', 
      date: '2024-07-08',
      type: 'achievement',
      icon: <Trophy className="h-4 w-4 text-orange-600" />
    },
    { 
      id: 5, 
      description: 'Completed "CSS Mastery" lesson', 
      date: '2024-07-05',
      type: 'completion',
      icon: <BookOpen className="h-4 w-4 text-green-600" />
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 overflow-hidden">
          <div className="animate-scroll-up space-y-3">
            {[...activities, ...activities].map((activity, index) => (
              <div key={`${activity.id}-${index}`} className="flex items-center gap-3 p-3 border rounded-lg bg-white">
                <div className="flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.date}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <style jsx>{`
        @keyframes scroll-up {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}</style>
    </Card>
  );
};

export default ScrollingActivities;
