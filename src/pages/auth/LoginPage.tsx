import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import OtpForm from '../../components/auth/OtpForm';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl transition-all">
        {message && (
          <div className="p-4 mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md text-sm border border-green-200 dark:border-green-800 text-center font-medium shadow-sm">
            {message}
          </div>
        )}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Welcome to AnverraGlobal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'otp'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('otp')}
          >
            OTP Login
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'password' ? <LoginForm /> : <OtpForm purpose="LOGIN" />}
        </div>
        
        <div className="text-center text-sm mt-6">
          <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
          <a href="/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
