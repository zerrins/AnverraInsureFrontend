import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { UpcomingRenewal } from '../../../api/renewals.api';

interface RenewalsCalendarProps {
  renewals: UpcomingRenewal[];
  onDateClick: (date: Date, renewalsForDate: UpcomingRenewal[]) => void;
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export const RenewalsCalendar: React.FC<RenewalsCalendarProps> = ({ renewals, onDateClick, currentDate, onMonthChange }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Map renewals by date string (YYYY-MM-DD)
  const renewalsByDate = useMemo(() => {
    const map: Record<string, UpcomingRenewal[]> = {};
    renewals.forEach(r => {
      if (r.nextRenewalDate) {
        if (!map[r.nextRenewalDate]) map[r.nextRenewalDate] = [];
        map[r.nextRenewalDate].push(r);
      }
    });
    return map;
  }, [renewals]);

  const renderDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0,0,0,0);

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-transparent"></div>);
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      
      const dayRenewals = renewalsByDate[dateStr] || [];
      const hasRenewals = dayRenewals.length > 0;
      const isToday = date.getTime() === today.getTime();
      const isPast = date.getTime() < today.getTime();

      let bgClass = "bg-white hover:bg-gray-50";
      let borderClass = "border-gray-100";
      let textClass = "text-gray-700";

      if (hasRenewals) {
        bgClass = "bg-blue-50 hover:bg-blue-100 cursor-pointer";
        borderClass = "border-blue-200";
        textClass = "text-blue-900 font-semibold";
      }

      if (isToday && !hasRenewals) {
        bgClass = "bg-indigo-50";
        borderClass = "border-indigo-200";
        textClass = "text-indigo-900 font-bold";
      }

      days.push(
        <div 
          key={d} 
          role={hasRenewals ? "button" : undefined}
          tabIndex={hasRenewals ? 0 : undefined}
          onClick={() => hasRenewals && onDateClick(date, dayRenewals)}
          onKeyDown={(e) => {
            if (hasRenewals && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onDateClick(date, dayRenewals);
            }
          }}
          className={`min-h-[80px] p-2 border rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${bgClass} ${borderClass}`}
        >
          <div className="flex justify-between items-start">
            <span className={`inline-block w-6 h-6 text-center leading-6 rounded-full ${isToday ? 'bg-indigo-600 text-white' : textClass}`}>
              {d}
            </span>
            {hasRenewals && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${isPast ? 'bg-red-100 text-red-700' : 'bg-blue-200 text-blue-800'}`}>
                {dayRenewals.length}
              </span>
            )}
          </div>
          {hasRenewals && (
            <div className="mt-2 text-xs text-gray-500 truncate">
               {isPast ? 'Pending' : 'Upcoming'}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Renewals Calendar</h2>
        <div className="flex items-center gap-4">
          <button onClick={handlePrevMonth} className="p-2 border rounded-lg hover:bg-gray-50">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold min-w-[150px] text-center">
            {monthName} {year}
          </span>
          <button onClick={handleNextMonth} className="p-2 border rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {renderDays()}
      </div>
    </div>
  );
};
