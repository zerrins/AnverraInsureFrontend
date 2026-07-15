import type { User } from './user';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface OtpResponse {
  message: string;
  phone: string;
  expiresAt: string;
  otp?: string; // DEV MODE ONLY
}

export type OtpPurpose = 'LOGIN' | 'REGISTRATION' | 'PASSWORD_RESET' | 'WITHDRAWAL';
