
import React from 'react';
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
  const activities: Activity[] = [
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
    },
    { 
      id: 6, 
      description: 'Perfect score on TypeScript quiz', 
      date: '2024-07-03',
      type: 'quiz',
      icon: <Star className="h-4 w-4 text-yellow-600" />
    }
  ];

  // Create enough copies to ensure continuous scrolling without gaps
  const repeatedActivities = Array(4).fill(activities).flat().map((activity, index) => ({
    ...activity,
    id: `${activity.id}-${Math.floor(index / activities.length)}`
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 overflow-hidden">
          <div 
            className="animate-marquee-continuous space-y-3"
          >
            {repeatedActivities.map((activity, index) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
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
                    <Badge variant="outline" className="text-xs capitalize">
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <style>{`
        @keyframes marquee-continuous {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .animate-marquee-continuous {
          animation: marquee-continuous 60s linear infinite;
        }
      `}</style>
    </Card>
  );
};

export default ScrollingActivities;
