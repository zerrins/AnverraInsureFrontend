import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '../../api/auth.api';
import { useAuth } from '../../hooks/useAuth';
import { useSessionStore } from '../../store/useSessionStore';
import type { OtpPurpose } from '../../types/auth';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpForm({ purpose, onVerify }: { purpose: OtpPurpose, onVerify?: (otp: string) => void }) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<1 | 2>(1); // 1 = enter phone, 2 = enter otp
  const [errorMsg, setErrorMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const { otpTimer: timer, startOtpTimer: setTimer, decrementOtpTimer } = useSessionStore();
  const { otpLogin, isOtpLoggingIn } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema)
  });

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => decrementOtpTimer(), 1000);
    }
    return () => clearInterval(interval);
  }, [timer, decrementOtpTimer]);

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      setErrorMsg('Enter a valid phone number');
      return;
    }
    try {
      setErrorMsg('');
      setIsSending(true);
      await authApi.sendOtp({ phone, purpose });
      setStep(2);
      setTimer();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || 'Failed to send OTP');
    } finally {
      setIsSending(false);
    }
  };

  const verifyOtpSubmit = (data: OtpFormValues) => {
    setErrorMsg('');
    if (purpose === 'LOGIN') {
      otpLogin(
        { phone, otp: data.otp, purpose },
        {
          onError: (err: any) => setErrorMsg(err.response?.data?.error || err.message || 'Verification failed'),
          onSuccess: () => {
            if (onVerify) onVerify(data.otp);
          }
        }
      );
    } else {
      // General verification flow (e.g. signup)
      authApi.verifyOtp({ phone, otp: data.otp, purpose })
        .then(() => {
          if (onVerify) onVerify(data.otp);
        })
        .catch((err: any) => {
          setErrorMsg(err.response?.data?.error || err.message || 'Verification failed');
        });
    }
  };

  const isFormLoading = isSending || isOtpLoggingIn;

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
      {errorMsg && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm border border-red-200 dark:border-red-800">
          {errorMsg}
        </div>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="+1234567890"
            />
          </div>
          <button 
            onClick={sendOtp}
            disabled={!phone || isSending}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center"
          >
            {isSending ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(verifyOtpSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Enter OTP Code</label>
            <input 
              {...register('otp')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="123456"
              maxLength={6}
            />
            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isFormLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center"
          >
            {isFormLoading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-500 dark:text-gray-400">Resend code in {timer}s</p>
            ) : (
              <button 
                type="button" 
                onClick={sendOtp}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                disabled={isSending}
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
