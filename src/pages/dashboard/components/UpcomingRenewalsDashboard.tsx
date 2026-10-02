import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../../../api/renewals.api';
import { Skeleton } from '../../../components/ui/Skeleton';
import { CalendarClock, AlertCircle, Clock, CalendarDays } from 'lucide-react';

export const UpcomingRenewalsDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['renewalDashboardStats'],
    queryFn: getDashboardStats,
  });

  if (isError) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
        Failed to load renewal stats.
      </div>
    );
  }

  const cards = [
    {
      title: '0-7 DAYS',
      count: stats?.zeroToSevenDays ?? 0,
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      colorClass: 'bg-red-50 border-red-100 text-red-700',
      iconBg: 'bg-red-100',
      filter: '0-7',
    },
    {
      title: '8-15 DAYS',
      count: stats?.eightToFifteenDays ?? 0,
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      colorClass: 'bg-orange-50 border-orange-100 text-orange-700',
      iconBg: 'bg-orange-100',
      filter: '8-15',
    },
    {
      title: '16-30 DAYS',
      count: stats?.sixteenToThirtyDays ?? 0,
      icon: <CalendarClock className="w-6 h-6 text-yellow-600" />,
      colorClass: 'bg-yellow-50 border-yellow-100 text-yellow-700',
      iconBg: 'bg-yellow-100',
      filter: '16-30',
    },
    {
      title: '31+ DAYS',
      count: stats?.thirtyOnePlusDays ?? 0,
      icon: <CalendarDays className="w-6 h-6 text-green-500" />,
      colorClass: 'bg-green-50 border-green-100 text-green-700',
      iconBg: 'bg-green-100',
      filter: '31+',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upcoming Renewals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))
          : cards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/upcoming-renewals?filter=${card.filter}`)}
                className={`relative overflow-hidden rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${card.colorClass}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-80 mb-1">{card.title}</p>
                    <h3 className="text-3xl font-bold">{card.count}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${card.iconBg}`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
