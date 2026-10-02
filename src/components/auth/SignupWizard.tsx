import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import OtpForm from './OtpForm';
import { authApi } from '../../api/auth.api';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  agentCode: z.string().optional(),
  city: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignupFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onDetailsSubmit = async (data: SignupFormValues) => {
    setFormData(data);
    setStep(2); // Move to OTP
  };

  const handleSignup = async (otp: string) => {
    if (!formData) return;
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await authApi.signup({
        ...formData,
        otp,
        roles: ['CUSTOMER'] // Or whichever is appropriate
      });
      navigate('/login', { state: { message: 'Signup successful! Please log in.' } });
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || err.message || 'Signup failed');
      setIsSubmitting(false);
    }
  };

  if (step === 1) {
    return (
      <form onSubmit={handleSubmit(onDetailsSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">First Name</label>
            <input {...register('firstName')} className="w-full px-3 py-2 border rounded-md" />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Last Name</label>
            <input {...register('lastName')} className="w-full px-3 py-2 border rounded-md" />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input {...register('email')} className="w-full px-3 py-2 border rounded-md" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Phone</label>
          <input {...register('phone')} className="w-full px-3 py-2 border rounded-md" placeholder="+91" />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input type="password" {...register('password')} className="w-full px-3 py-2 border rounded-md" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Continue
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-4">
      <h3 className="text-lg font-medium">Verify your phone number</h3>
      <p className="text-sm text-gray-500">We need to verify {formData?.phone}</p>
      
      {errorMsg && (
        <div className="p-3 mb-4 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm border border-red-200 dark:border-red-800">
          {errorMsg}
        </div>
      )}

      {isSubmitting ? (
        <div className="py-8">Creating your account...</div>
      ) : (
        <OtpForm 
          purpose="REGISTRATION" 
          onVerify={(otp) => handleSignup(otp)} 
          initialPhone={formData?.phone || ''}
        />


      )}
    </div>
  );
}
