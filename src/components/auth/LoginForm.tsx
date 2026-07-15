import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { PasswordInput } from '../ui/PasswordInput';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false }
  });
  
  const { login, isLoggingIn, loginError } = useAuth();
  
  const onSubmit = (data: LoginFormValues) => {
    login({ email: data.email, password: data.password });
  };

  const errorMessage = loginError ? (loginError as any).response?.data?.error || (loginError as any).message || 'Login failed' : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
      {errorMessage && (
        <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm border border-red-200 dark:border-red-800">
          {errorMessage}
        </div>
      )}
      
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input 
          {...register('email')} 
          disabled={isLoggingIn}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <PasswordInput 
          {...register('password')} 
          disabled={isLoggingIn}
          error={errors.password?.message}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input 
            type="checkbox" 
            {...register('rememberMe')} 
            className="rounded text-blue-600 focus:ring-blue-500"
            disabled={isLoggingIn}
          />
          <span className="text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          Forgot Password?
        </Link>
      </div>

      <button 
        type="submit" 
        disabled={isLoggingIn}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all shadow-sm"
      >
        {isLoggingIn ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : 'Sign In'}
      </button>
    </form>
  );
}
