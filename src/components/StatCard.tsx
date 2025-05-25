
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, subtitle, icon: Icon, iconBgColor, iconColor, onClick }: StatCardProps) => {
  return (
    <Card className={`${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`} onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={`${iconBgColor} p-2 rounded-lg`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-600">{title}</p>
            {subtitle && <p className="text-xs text-green-600">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
