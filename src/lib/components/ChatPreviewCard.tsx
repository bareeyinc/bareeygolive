/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Users, Briefcase, ChevronRight, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { Chat } from '../../types';

interface CategoryCardProps {
  title: string;
  description: string;
  type: 'customer' | 'service';
  count: number;
  onClick: () => void;
}

export function ChatCategoryCard({ title, description, type, count, onClick }: CategoryCardProps) {
  const Icon = type === 'customer' ? Users : Briefcase;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-orange-200/50 transition-all flex items-center justify-between cursor-pointer group w-full"
    >
      <div className="flex items-center gap-5">
        {/* Animated Icon container */}
        <div className={`p-4 rounded-2xl ${
          type === 'customer' 
            ? 'bg-black text-white' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Content details */}
        <div>
          <div className="flex items-center gap-2.5">
            <h4 className="font-extrabold text-gray-900 text-lg group-hover:text-black">
              {title}
            </h4>
            {count > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-100 text-red-600 rounded-full animate-pulse">
                {count} active
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 max-w-sm mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

interface ThreadRowProps {
  key?: any;
  chat: Chat;
  onClick: () => void;
}

export function ChatThreadRow({ chat, onClick }: ThreadRowProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'preparing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700 animate-pulse';
      case 'delivered':
        return 'bg-teal-100 text-teal-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.005, borderColor: '#fed7aa' }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all backdrop-blur-md ${
        chat.unread ? 'bg-orange-50/30 border-orange-200' : 'bg-white/60 border-white/40 shadow-2xs hover:bg-white/80'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Avatar Placeholder */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 border border-gray-200 text-sm">
            {chat.otherUserName.charAt(0)}
          </div>
          {chat.unread && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-black border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Text Area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <span className="font-bold text-gray-900 truncate text-sm sm:text-base">
              {chat.otherUserName}
            </span>
            <span className="text-xs text-gray-400 font-medium shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {chat.lastMessageTime}
            </span>
          </div>

          <p className="text-xs text-gray-500 font-semibold mb-1 truncate flex items-center gap-1">
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-bold uppercase text-[9px]">
              {chat.targetType}
            </span>
            <span className="text-gray-900 truncate font-semibold">
              {chat.targetTitle}
            </span>
          </p>

          <p className={`text-xs truncate ${chat.unread ? 'text-black font-semibold' : 'text-gray-400'}`}>
            {chat.lastMessageText}
          </p>
        </div>
      </div>

      {/* Escrow Status or Price */}
      <div className="ml-4 shrink-0 flex flex-col items-end gap-1.5">
        {chat.targetPrice && (
          <span className="text-xs sm:text-sm font-bold text-gray-900">
            {chat.targetPrice}
          </span>
        )}
        {chat.status && (
          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-sm ${getStatusColor(chat.status)}`}>
            {chat.status}
          </span>
        )}
      </div>
    </motion.div>
  );
}
