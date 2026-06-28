/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, MessageSquare, ShoppingBag, Briefcase, User } from 'lucide-react';

interface NavbarProps {
  activeTab: 'products' | 'chats' | 'services' | 'profile';
  setActiveTab: (tab: 'products' | 'chats' | 'services' | 'profile') => void;
  userEmail?: string;
}

export default function Navbar({ activeTab, setActiveTab, userEmail = 'deenibuba@gmail.com' }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('products')}>
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
            B
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-gray-900 tracking-tight">Bareey</span>
              <span className="text-[10px] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wide">MVP</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Buy. Sell. Offer Services.</p>
          </div>
        </div>

        {/* Desktop Navigation Link Tabs */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Marketplace
          </button>
          
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'services'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Services
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'chats'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chats
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-black text-white'
                : 'text-gray-500 hover:text-black hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4" />
            My Store
          </button>
        </nav>

        {/* User Status / Trust Protection Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50/50 border border-green-100 text-green-700 rounded-xl text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-xl">
            <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="hidden lg:inline text-xs font-semibold text-gray-700">{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
