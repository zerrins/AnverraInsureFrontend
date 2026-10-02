import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { User, Mail, Phone, Edit2 } from 'lucide-react';
import EditProfileModal from '../../components/profile/EditProfileModal';

export default function MyProfilePage() {
  const user = useAuthStore(state => state.user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 w-full object-cover" />
        
        <div className="px-6 py-4 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 bg-white dark:bg-gray-800 p-1 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.name || "Profile"} className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-2">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {user?.roles?.join(', ')}
              </span>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user?.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}
