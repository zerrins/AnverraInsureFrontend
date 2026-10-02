import React, { useState } from 'react';
import type { UpcomingRenewal } from '../../../api/renewals.api';
import { X, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface PolicyRemindersModalProps {
  date: Date;
  renewals: UpcomingRenewal[];
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export const PolicyRemindersModal: React.FC<PolicyRemindersModalProps> = ({ date, renewals, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(renewals.length / ITEMS_PER_PAGE);

  const paginatedRenewals = renewals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formattedDate = date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isElapsed = new Date(date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50/80">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Renewals on {formattedDate}</h3>
            <p className="text-sm text-gray-500 mt-1">{renewals.length} policy{renewals.length !== 1 ? 'ies' : ''} found</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {paginatedRenewals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No renewals for this date.
            </div>
          ) : (
            paginatedRenewals.map((renewal) => (
              <div key={renewal.id} className="border rounded-xl p-4 hover:border-blue-200 transition-colors bg-white">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md mb-2">
                      {renewal.productCode} • {renewal.companyCode}
                    </span>
                    <h4 className="font-semibold text-gray-900">{renewal.policyHolderName}</h4>
                    <p className="text-sm text-gray-500 font-mono mt-1">{renewal.policyNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{renewal.premiumAmount.toLocaleString('en-IN')}</p>
                    
                    {/* Status Badge */}
                    {isElapsed ? (
                        <div className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending Status
                        </div>
                    ) : (
                        <div className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                           Upcoming
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
