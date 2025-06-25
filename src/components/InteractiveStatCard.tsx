
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LucideIcon } from 'lucide-react';

interface DetailItem {
  name: string;
  value: string;
  extra?: string;
}

interface InteractiveStatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  details?: DetailItem[];
}

const InteractiveStatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBgColor, 
  iconColor,
  details = []
}: InteractiveStatCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card 
        className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-0 shadow-md"
        onClick={() => setShowDetails(true)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-sm text-gray-600 mb-1">{title}</div>
              <div className="text-xs text-blue-500">{subtitle}</div>
            </div>
            <div className={`${iconBgColor} p-3 rounded-full`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${iconColor}`} />
              {title} Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about your {title.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {details.length > 0 ? (
              details.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.value}
                    </Badge>
                  </div>
                  {item.extra && (
                    <p className="text-sm text-gray-600">{item.extra}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Icon className={`h-12 w-12 ${iconColor} mx-auto mb-4 opacity-50`} />
                <p className="text-gray-500">No data available yet</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InteractiveStatCard;
