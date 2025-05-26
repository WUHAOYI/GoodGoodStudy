
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, Award } from 'lucide-react';

interface StatsPopupProps {
  type: 'courses' | 'students' | 'institutions';
  onClose: () => void;
}

const StatsPopup = ({ type, onClose }: StatsPopupProps) => {
  const getContent = () => {
    switch (type) {
      case 'courses':
        return {
          title: "Featured Expert Courses",
          items: [
            {
              title: "Advanced React Development",
              instructor: "Dr. Sarah Chen",
              rating: 4.9,
              students: "12.5k",
              level: "Advanced"
            },
            {
              title: "Machine Learning Fundamentals",
              instructor: "Prof. Michael Rodriguez",
              rating: 4.8,
              students: "8.9k",
              level: "Intermediate"
            },
            {
              title: "Full Stack JavaScript",
              instructor: "Emily Johnson",
              rating: 4.7,
              students: "15.2k",
              level: "Beginner"
            },
            {
              title: "Data Science with Python",
              instructor: "Dr. Alex Thompson",
              rating: 4.9,
              students: "6.7k",
              level: "Advanced"
            }
          ]
        };
      case 'students':
        return {
          title: "Top Active Students by Study Hours",
          items: [
            { name: "Jessica Wang", hours: "342 hrs", course: "Full Stack Development" },
            { name: "David Martinez", hours: "298 hrs", course: "Machine Learning" },
            { name: "Sarah Kim", hours: "276 hrs", course: "UI/UX Design" },
            { name: "Michael Chen", hours: "251 hrs", course: "Data Science" },
            { name: "Emma Wilson", hours: "234 hrs", course: "Digital Marketing" }
          ]
        };
      case 'institutions':
        return {
          title: "Partner Institutions",
          items: [
            { name: "Stanford University", type: "Research Partner" },
            { name: "MIT OpenCourseWare", type: "Content Partner" },
            { name: "Google Developers", type: "Technology Partner" },
            { name: "Microsoft Learn", type: "Platform Partner" },
            { name: "Harvard Extension", type: "Academic Partner" },
            { name: "IBM Skills Network", type: "Industry Partner" }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div 
      className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <Card 
        className="max-w-md w-full max-h-96 overflow-y-auto bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{content.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {type === 'courses' && content.items.map((course: any, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{course.title}</h4>
                  <Badge variant="outline" className="text-xs">{course.level}</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{course.students}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {type === 'students' && content.items.map((student: any, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-gray-600">{student.course}</p>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs font-medium">{student.hours}</span>
                </div>
              </div>
            ))}
            
            {type === 'institutions' && content.items.map((institution: any, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-sm">{institution.name}</p>
                  <p className="text-xs text-gray-600">{institution.type}</p>
                </div>
                <Award className="h-4 w-4 text-purple-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPopup;
