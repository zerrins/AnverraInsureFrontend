export type UserRole = 'ADMIN' | 'AGENT' | 'BROKER' | 'SUB_AGENT' | 'DE_AGENT';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export interface UserProfile {
  id?: number;
  agentCode?: string;
  brokerCode?: string;
  company?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  addressLine1?: string;
  addressLine2?: string;
}

export interface User {
  id: number;
  uuid?: string;
  email: string;
  name: string;
  phone: string;
  roles: UserRole[];
  role?: UserRole; // Helper for primary role
  status: UserStatus;
  profileImage?: string;
  rewardPoints: number;
  profile?: UserProfile;
  createdAt?: string;
  updatedAt?: string;
}
