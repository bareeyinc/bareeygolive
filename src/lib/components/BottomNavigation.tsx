/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, MessageSquare, Briefcase, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'products' | 'chats' | 'services' | 'profile';
  setActiveTab: (tab: 'products' | 'chats' | 'services' | 'profile') => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: 'products', label: 'Market', icon: ShoppingBag },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'chats', label: 'Chats', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
      <div className="bg-black/85 backdrop-blur-xl rounded-2xl py-2 px-3 shadow-2xl border border-white/10 flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 py-1.5 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-x-2 inset-y-0.5 bg-white/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 mb-1 transition-colors ${
                isActive ? 'text-white scale-105' : 'text-gray-400 hover:text-white'
              }`} />
              
              <span className={`text-[10px] font-bold transition-colors ${
                isActive ? 'text-white font-black' : 'text-gray-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
