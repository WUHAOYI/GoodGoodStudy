
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatItem {
  id: number;
  title: string;
  description?: string;
  status?: string;
  date?: string;
}

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: StatItem[];
}

const StatsModal = ({ isOpen, onClose, title, items }: StatsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                    )}
                  </div>
                  {item.status && (
                    <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsModal;
