import { useState } from 'react';
import OtpForm from '../../components/auth/OtpForm';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transition-all">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {isVerified ? "Enter a new password" : "We'll send you an OTP to reset it"}
          </p>
        </div>

        <div className="mt-8">
          {!isVerified ? (
            <OtpForm purpose="PASSWORD_RESET" onVerify={() => setIsVerified(true)} />
          ) : (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md text-sm">
                Phone verified! However, new password component is pending implementation.
              </div>
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline inline-block mt-4">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
