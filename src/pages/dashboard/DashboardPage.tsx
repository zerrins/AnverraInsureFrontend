import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingRenewals } from '../../api/renewals.api';
import type { UpcomingRenewal } from '../../api/renewals.api';
import { UpcomingRenewalsDashboard } from './components/UpcomingRenewalsDashboard';
import { RenewalsCalendar } from './components/RenewalsCalendar';
import { PolicyRemindersModal } from './components/PolicyRemindersModal';

export const DashboardPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedRenewals, setSelectedRenewals] = useState<UpcomingRenewal[]>([]);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth() + 1;
  const lastDay = new Date(year, month, 0).getDate();

  const startDateStr = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDateStr = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const { data: renewalsPage } = useQuery({
    queryKey: ['upcomingRenewals', startDateStr, endDateStr, 0, 500],
    queryFn: () => getUpcomingRenewals(startDateStr, endDateStr, 0, 500),
  });

  const handleDateClick = (date: Date, renewals: UpcomingRenewal[]) => {
    setSelectedDate(date);
    setSelectedRenewals(renewals);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setSelectedRenewals([]);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the AnverraGlobal Platform.</p>
      </div>

      <UpcomingRenewalsDashboard />
      
      <RenewalsCalendar 
        renewals={renewalsPage?.content || []} 
        onDateClick={handleDateClick}
        currentDate={currentCalendarDate}
        onMonthChange={setCurrentCalendarDate}
      />

      {selectedDate && (
        <PolicyRemindersModal 
          date={selectedDate} 
          renewals={selectedRenewals} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};
