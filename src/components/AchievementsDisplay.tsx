
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star, Target, Clock, BookOpen, Zap, Crown } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
}

const AchievementsDisplay = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first course",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      date: "2024-06-15",
      rarity: "common",
      category: "Learning"
    },
    {
      id: 2,
      title: "Speed Learner",
      description: "Completed 3 courses in one week",
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      date: "2024-07-01",
      rarity: "rare",
      category: "Speed"
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Scored 100% on a quiz",
      icon: <Star className="h-6 w-6 text-gold-600" />,
      date: "2024-07-10",
      rarity: "epic",
      category: "Excellence"
    },
    {
      id: 4,
      title: "Consistency Master",
      description: "Studied for 30 consecutive days",
      icon: <Target className="h-6 w-6 text-green-600" />,
      date: "2024-07-20",
      rarity: "legendary",
      category: "Dedication"
    },
    {
      id: 5,
      title: "Time Manager",
      description: "Completed 50 hours of learning",
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      date: "2024-07-25",
      rarity: "rare",
      category: "Progress"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'epic': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'rare': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Achievements & Certificates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`text-xs ${getRarityColor(achievement.rarity)}`}
                    >
                      {achievement.rarity}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {achievement.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsDisplay;
