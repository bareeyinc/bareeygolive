/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'grid' | 'details' | 'chats';
}

export default function LoadingSkeleton({ type }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs animate-pulse w-72 shrink-0">
        <div className="bg-gray-200 h-44 w-full rounded-xl mb-3"></div>
        <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded-sm w-1/2 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded-sm w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-sm w-1/4"></div>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="flex gap-4 overflow-hidden py-2 px-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs animate-pulse w-72 shrink-0">
            <div className="bg-gray-200 h-44 w-full rounded-xl mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-sm w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-1/2 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded-sm w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs animate-pulse">
            <div className="bg-gray-200 h-48 w-full rounded-xl mb-4"></div>
            <div className="h-5 bg-gray-200 rounded-sm w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-4/5 mb-4"></div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded-sm w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chats') {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs animate-pulse">
            <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-sm w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded-sm w-1/6"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded-sm w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gray-200 h-16 w-16 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded-sm w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded-sm w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-sm w-full"></div>
        <div className="h-4 bg-gray-200 rounded-sm w-full"></div>
        <div className="h-4 bg-gray-200 rounded-sm w-2/3"></div>
      </div>
    </div>
  );
}
