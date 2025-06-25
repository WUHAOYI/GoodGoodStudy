
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LucideIcon } from 'lucide-react';

interface InteractiveStatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  detailsData?: any[];
  detailsTitle?: string;
}

const InteractiveStatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBgColor, 
  iconColor,
  detailsData = [],
  detailsTitle
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
              {detailsTitle || title}
            </DialogTitle>
            <DialogDescription>
              Detailed information about your {title.toLowerCase()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {detailsData.length > 0 ? (
              detailsData.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{item.title || item.name}</h4>
                    {item.status && (
                      <Badge variant={item.status === 'completed' ? 'default' : 'outline'}>
                        {item.status}
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
                  {item.progress !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{item.progress}%</span>
                    </div>
                  )}
                  {item.hours && (
                    <p className="text-xs text-gray-500 mt-1">{item.hours} hours</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
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
