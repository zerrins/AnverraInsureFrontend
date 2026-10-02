import apiClient from './apiClient';

export interface RenewalDashboardStats {
  zeroToSevenDays: number;
  eightToFifteenDays: number;
  sixteenToThirtyDays: number;
  thirtyOnePlusDays: number;
}

export interface UpcomingRenewal {
  id: number;
  policyNumber: string;
  policyHolderName: string;
  policyEndDate: string;
  nextRenewalDate: string;
  premiumAmount: number;
  productCode: string;
  companyCode: string;
  reminderStatus: string;
  reminderCount: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const getDashboardStats = async (): Promise<RenewalDashboardStats> => {
  const response = await apiClient.get('/policies/renewals/dashboard-stats');
  return response.data.data;
};

export const getUpcomingRenewals = async (
  startDate: string,
  endDate: string,
  page: number = 0,
  size: number = 10
): Promise<PageResponse<UpcomingRenewal>> => {
  const response = await apiClient.get('/policies/renewals/upcoming', {
    params: { startDate, endDate, page, size },
  });
  return response.data.data;
};
