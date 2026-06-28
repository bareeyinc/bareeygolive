/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertCircle, RefreshCw, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  type?: 'empty' | 'error';
  onRetry?: () => void;
  retryLabel?: string;
}

export default function EmptyState({
  title,
  description,
  type = 'empty',
  onRetry,
  retryLabel = 'Try Again'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-white border border-gray-100 rounded-2xl max-w-md mx-auto my-8 shadow-xs">
      <div className={`p-4 rounded-full mb-4 ${type === 'error' ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
        {type === 'error' ? (
          <AlertCircle className="w-8 h-8" />
        ) : (
          <Inbox className="w-8 h-8" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-xl transition-all shadow-sm active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </button>
      )}
    </div>
  );
}
