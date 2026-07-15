import { create } from 'zustand';

interface SessionState {
  isLocked: boolean;
  lastActivity: number;
  lock: () => void;
  unlock: () => void;
  updateActivity: () => void;
  otpTimer: number;
  startOtpTimer: () => void;
  decrementOtpTimer: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isLocked: false,
  lastActivity: Date.now(),
  lock: () => set({ isLocked: true }),
  unlock: () => set({ isLocked: false, lastActivity: Date.now() }),
  updateActivity: () => set({ lastActivity: Date.now() }),
  otpTimer: 0,
  startOtpTimer: () => set({ otpTimer: 60 }),
  decrementOtpTimer: () => set((state) => ({ otpTimer: Math.max(0, state.otpTimer - 1) }))
}));
