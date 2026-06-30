/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, ArrowRight, MessageSquare, Plus, Check, X,
  Smartphone, RefreshCw, Star, Info, ChevronDown, 
  HelpCircle, Zap, Shield, Sparkles, Send, Landmark, AlertTriangle, Play, CheckCircle2,
  Lock, ArrowDownLeft, ArrowUpRight, Scale, ShieldAlert, BadgeCheck
} from 'lucide-react';
import PlatformView from './PlatformView';
import PolicyView from './PolicyView';
import RemoveAccountView from './RemoveAccountView';

// Play Store Link
const BAREEY_PLAYSTORE_URL = "https://play.google.com/store/apps/details?id=com.bareeyinc.bareey&hl=en";

// Types for Mock Smartphone App State
interface MockEscrowTrade {
  id: string;
  title: string;
  counterparty: string;
  amount: number;
  role: 'buyer' | 'seller';
  status: 'held' | 'shipped' | 'released' | 'disputed';
  category: string;
  messages: {
    sender: 'buyer' | 'seller' | 'system';
    text: string;
    time: string;
  }[];
}

export default function App() {
  // Navigation active state
  const [activeNav, setActiveNav] = useState<'features' | 'how-it-works' | 'simulator' | 'calculator' | 'faqs'>('features');
  const [viewMode, setViewMode] = useState<'marketing' | 'platform'>('marketing');

  // Simple custom SPA routing for Google Play policies check
  const getNormalizedPath = (): string => {
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      return pathname;
    }
    const hash = window.location.hash;
    if (hash) {
      const cleanHash = hash.startsWith('#/') ? hash.substring(1) : (hash.startsWith('#') ? hash.substring(1) : '');
      if (cleanHash) {
        return cleanHash.split('?')[0].split('#')[0];
      }
    }
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p') || params.get('route') || params.get('path');
    if (p) {
      return p.startsWith('/') ? p : '/' + p;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getNormalizedPath);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getNormalizedPath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Interactive Fee Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(50000);
  const [calcSplit, setCalcSplit] = useState<'buyer' | 'seller' | 'split'>('split');

  // FAQ Expanded index state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // App Simulator state (inside the Phone Mockup)
  const [phoneScreen, setPhoneScreen] = useState<'dashboard' | 'chat' | 'create'>('dashboard');
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>("trade-1");
  
  // Custom Create Escrow Form inside mockup phone
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState<number>(15000);
  const [formRole, setFormRole] = useState<'buyer' | 'seller'>('buyer');
  const [formParty, setFormParty] = useState('');
  const [formCategory, setFormCategory] = useState('Electronics');

  // Secure chats input inside mockup phone
  const [chatInput, setChatInput] = useState('');

  // List of trades in simulated smartphone
  const [mockTrades, setMockTrades] = useState<MockEscrowTrade[]>([
    {
      id: "trade-1",
      title: "Double Chocolate Cake",
      counterparty: "Amina Bello",
      amount: 45000,
      role: 'seller', // I am seller
      status: 'held',
      category: 'Catering',
      messages: [
        { sender: 'system', text: "Deal created. Amina Bello deposited ₦45,000 into Bareey Escrow.", time: "10:30 AM" },
        { sender: 'buyer', text: "Hello! Is the chocolate cake ready for pickup? Please use priority dispatch.", time: "10:32 AM" },
        { sender: 'seller', text: "Hi Amina, yes it is ready! I am boxing it now with priority cooling packs.", time: "10:35 AM" }
      ]
    },
    {
      id: "trade-2",
      title: "UX Audit MVP Design",
      counterparty: "John Okafor",
      amount: 120000,
      role: 'buyer', // I am buyer
      status: 'shipped',
      category: 'Digital Service',
      messages: [
        { sender: 'system', text: "Deal created. You deposited ₦120,000 into Bareey Escrow.", time: "Yesterday" },
        { sender: 'seller', text: "I have uploaded the 15-page PDF draft for your review. Check it out!", time: "Yesterday" },
        { sender: 'system', text: "John Okafor marked the delivery as dispatch/delivered.", time: "Yesterday" },
        { sender: 'buyer', text: "Reviewing the leakage points and micro-interactions now. Thanks!", time: "9:00 AM" }
      ]
    },
    {
      id: "trade-3",
      title: "Saffiano Leather Handbag",
      counterparty: "Zara Boutique",
      amount: 85000,
      role: 'buyer',
      status: 'released',
      category: 'Fashion',
      messages: [
        { sender: 'system', text: "Deal created. You deposited ₦85,000 into Bareey Escrow.", time: "2 days ago" },
        { sender: 'seller', text: "Shipped via GIG Logistics. Tracker ref: GIG-9812-NG.", time: "2 days ago" },
        { sender: 'buyer', text: "Perfect! Received and inspected. Excellent quality leather.", time: "1 day ago" },
        { sender: 'system', text: "Buyer confirmed delivery. ₦85,000 payout released to Zara Boutique.", time: "1 day ago" }
      ]
    }
  ]);

  // Handle click on an active trade in smartphone mockup
  const handleSelectTrade = (id: string) => {
    setSelectedTradeId(id);
    setPhoneScreen('chat');
  };

  // Escrow Calculations (1.5% fee capped at ₦5,000)
  const calculateEscrowFee = (amount: number) => {
    const fee = Math.min(amount * 0.015, 5000);
    return Math.round(fee);
  };

  const getCalcResults = () => {
    const fee = calculateEscrowFee(calcAmount);
    let buyerPays = 0;
    let sellerReceives = calcAmount;

    if (calcSplit === 'buyer') {
      buyerPays = calcAmount + fee;
      sellerReceives = calcAmount;
    } else if (calcSplit === 'seller') {
      buyerPays = calcAmount;
      sellerReceives = calcAmount - fee;
    } else {
      buyerPays = calcAmount + (fee / 2);
      sellerReceives = calcAmount - (fee / 2);
    }

    return {
      fee,
      buyerPays: Math.round(buyerPays),
      sellerReceives: Math.round(sellerReceives)
    };
  };

  const calcResults = getCalcResults();

  // Create Escrow inside smartphone mockup
  const handleCreateMockEscrow = (e: FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formParty || formAmount <= 0) return;

    const newTrade: MockEscrowTrade = {
      id: `trade-${Date.now()}`,
      title: formTitle,
      counterparty: formParty,
      amount: formAmount,
      role: formRole,
      status: 'held',
      category: formCategory,
      messages: [
        { 
          sender: 'system', 
          text: formRole === 'buyer' 
            ? `Deal created. You deposited ₦${formAmount.toLocaleString()} into Bareey Escrow.` 
            : `Deal created. ${formParty} deposited ₦${formAmount.toLocaleString()} into Bareey Escrow.`, 
          time: "Just now" 
        },
        { sender: 'system', text: "Bareey Trust Protocol fully active. Chat lines are secure.", time: "Just now" }
      ]
    };

    setMockTrades([newTrade, ...mockTrades]);
    setFormTitle('');
    setFormParty('');
    setFormAmount(15000);
    setPhoneScreen('dashboard');
  };

  // Send message inside mockup phone chat
  const handleSendMockMessage = () => {
    if (!chatInput.trim() || !selectedTradeId) return;

    setMockTrades(prev => prev.map(t => {
      if (t.id === selectedTradeId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            { sender: t.role, text: chatInput, time: "Just now" }
          ]
        };
      }
      return t;
    }));

    const currentInput = chatInput;
    setChatInput('');

    // Simulated Auto-Reply from Counterparty after 1.5 seconds
    setTimeout(() => {
      setMockTrades(prev => prev.map(t => {
        if (t.id === selectedTradeId) {
          let replyText = "Received! I will update the status right away.";
          if (t.status === 'held' && t.role === 'buyer') {
            replyText = "Thanks for funding escrow! I am shipping out the package shortly.";
          } else if (t.status === 'shipped' && t.role === 'seller') {
            replyText = "Awesome! Let me know as soon as you receive and test it.";
          }

          return {
            ...t,
            messages: [
              ...t.messages,
              { sender: t.role === 'buyer' ? 'seller' : 'buyer', text: replyText, time: "Just now" }
            ]
          };
        }
        return t;
      }));
    }, 1200);
  };

  // Action: Confirm Dispatch / Ship inside mockup phone
  const handleMockDispatch = (id: string) => {
    setMockTrades(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'shipped',
          messages: [
            ...t.messages,
            { sender: 'system', text: "Seller marked the deal as shipped. Payout is held securely pending buyer inspection.", time: "Just now" }
          ]
        };
      }
      return t;
    }));
  };

  // Action: Release Escrow Payout to Seller inside mockup phone
  const handleMockRelease = (id: string) => {
    setMockTrades(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'released',
          messages: [
            ...t.messages,
            { sender: 'system', text: `Buyer confirmed delivery. ₦${t.amount.toLocaleString()} payout has been released to the seller!`, time: "Just now" }
          ]
        };
      }
      return t;
    }));
  };

  // Action: File Dispute inside mockup phone
  const handleMockDispute = (id: string) => {
    setMockTrades(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: 'disputed',
          messages: [
            ...t.messages,
            { sender: 'system', text: "Dispute initiated. Bareey support has been joined to arbitrate this transaction.", time: "Just now" }
          ]
        };
      }
      return t;
    }));
  };

  // FAQs List
  const faqs = [
    {
      q: "What is Bareey and how does Escrow protect me?",
      a: "Bareey is a premium secure escrow platform built to protect peer-to-peer commerce in Nigeria. When transacting online, the buyer deposits the money into Bareey's secure vault. We notify the seller to deliver the goods or services. Once the buyer receives and inspects the item, they confirm satisfaction, and Bareey releases the payment instantly to the seller. This totally eliminates payment-first scams and delivery anxiety."
    },
    {
      q: "Who pays the Escrow transaction fees?",
      a: "Bareey's transaction fee is a transparent 1.5%, capped at a maximum of ₦5,000. When creating an escrow contract, you can choose if the buyer pays the fee, the seller absorbs it, or if it is split 50/50."
    },
    {
      q: "What happens if there is a dispute or if the seller ships the wrong item?",
      a: "If the product is wrong, damaged, or defective, the buyer can lock the payout by clicking 'Initiate Dispute'. Bareey's team immediately freezes the funds and initiates arbitration, reviewing chat agreements and shipment proofs to resolve the dispute fairly."
    },
    {
      q: "How fast are withdrawals processed to my Nigerian bank account?",
      a: "Once escrow is released by the buyer, funds land instantly in the seller's wallet. Withdrawals to any commercial or microfinance bank in Nigeria (GTBank, Zenith, Access, Kuda, Moniepoint) are processed via real-time settlements, typically landing in less than 3 minutes."
    },
    {
      q: "Is Bareey free to download on mobile?",
      a: "Yes! The Bareey app is completely free to download and install. Our app is live on the Google Play Store, providing a highly lightweight, smooth, and secure experience for mobile users."
    }
  ];

  const activeTrade = mockTrades.find(t => t.id === selectedTradeId);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentPath === '/check' || currentPath.startsWith('/check') || currentPath.startsWith('check')) {
    return <PolicyView onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/settings/remove' || currentPath.startsWith('/settings/remove') || currentPath.startsWith('/settings-remove') || currentPath.startsWith('settings/remove')) {
    return <RemoveAccountView onBack={() => navigateTo('/')} />;
  }

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-gray-900 font-sans flex flex-col selection:bg-orange-100 selection:text-orange-900 relative overflow-x-hidden">
      
      {/* Top Premium Notification Ribbon with Dual-Mode toggle */}
      <div className="bg-black text-white px-4 py-2.5 text-xs font-semibold flex flex-col sm:flex-row justify-between items-center gap-2 relative z-50 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="bg-orange-600 text-[10px] uppercase font-black px-1.5 py-0.5 rounded-sm">MVP Platform Mode</span>
          <span>Explore Bareey on Web or Mobile:</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('marketing')}
            className={`px-3 py-1 rounded-lg transition-all font-bold text-[11px] uppercase tracking-wider cursor-pointer ${
              viewMode === 'marketing' 
                ? 'bg-orange-600 text-white shadow-xs' 
                : 'bg-neutral-900 text-gray-400 hover:text-white'
            }`}
          >
            📱 Marketing & Simulator
          </button>
          <button 
            onClick={() => setViewMode('platform')}
            className={`px-3 py-1 rounded-lg transition-all font-bold text-[11px] uppercase tracking-wider cursor-pointer ${
              viewMode === 'platform' 
                ? 'bg-orange-600 text-white shadow-xs' 
                : 'bg-neutral-900 text-gray-400 hover:text-white'
            }`}
          >
            💻 Web MVP Platform
          </button>
        </div>
      </div>

      {viewMode === 'platform' ? (
        <PlatformView 
          BAREEY_PLAYSTORE_URL={BAREEY_PLAYSTORE_URL} 
          onBackToMarketing={() => setViewMode('marketing')} 
        />
      ) : (
        <>
          {/* Mesh background glows */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[110px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-amber-100/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] bg-orange-100/20 rounded-full blur-[100px]" />
      </div>

      {/* Global Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-lg">
              <span className="text-orange-500 font-extrabold">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-gray-900 leading-none">bareey</span>
              <span className="text-[9px] text-gray-400 font-bold mt-0.5">Secure Escrow</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-500 hover:text-black text-sm font-semibold transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-500 hover:text-black text-sm font-semibold transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('simulator')} 
              className="text-gray-500 hover:text-black text-sm font-semibold transition-colors cursor-pointer"
            >
              App Simulator
            </button>
            <button 
              onClick={() => scrollToSection('calculator')} 
              className="text-gray-500 hover:text-black text-sm font-semibold transition-colors cursor-pointer"
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="text-gray-500 hover:text-black text-sm font-semibold transition-colors cursor-pointer"
            >
              FAQs
            </button>
          </nav>

          {/* CTA Group */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('platform')}
              className="px-4 py-2 text-xs font-bold text-gray-700 hover:text-black border border-gray-200 hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
            >
              Launch Web MVP
            </button>
            <a 
              href={BAREEY_PLAYSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-4.5 py-2 text-xs font-bold text-white bg-black hover:bg-gray-800 rounded-xl transition-all shadow-xs items-center gap-1.5 cursor-pointer"
            >
              <span>Download App</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">

        {/* HERO SECTION */}
        <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero text block */}
          <div className="lg:col-span-7 space-y-8 pr-2">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-xs font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bareey App is Live on Google Play Store</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Trade safely. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">
                Eliminate scams.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl">
              Discover trusted products, connect with service providers, chat instantly, and shop with confidence. Bareey acts as your bulletproof escrow, holding payments safely until both parties confirm perfect delivery.
            </p>

            {/* Direct Playstore Badges */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href={BAREEY_PLAYSTORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-black hover:bg-gray-900 text-white rounded-2xl transition-all shadow-xs cursor-pointer group"
              >
                <div className="text-orange-500">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M5.25 2.25c-.24 0-.47.1-.64.27L14.1 12 4.6 21.5c.17.16.4.25.64.25c.23 0 .44-.08.61-.22l11.41-6.59l-3.23-3.23l-3.23-3.23L5.86 2.47c-.17-.14-.38-.22-.61-.22zM21.2 11.2l-3.2 1.8l-3.2-1.8l3.2-1.8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest leading-none">GET IT ON</p>
                  <p className="text-sm font-extrabold text-white">Google Play</p>
                </div>
              </a>

              <div className="flex items-center gap-3 px-5 py-3 bg-gray-100 text-gray-400 rounded-2xl border border-gray-200 select-none cursor-not-allowed">
                <div>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.99 1.12.09 2.27-.58 2.98-1.43z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest leading-none font-sans">COMING SOON TO</p>
                  <p className="text-sm font-extrabold text-gray-500">App Store</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setViewMode('platform')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl transition-all shadow-md active:scale-95 text-sm font-extrabold cursor-pointer group"
            >
              <span>Launch Interactive Web MVP Platform</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            {/* App metrics summary */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100 max-w-md">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">₦10B+</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Secured Trades</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">99.9%</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dispute-Free</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900">Instant</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Bank Withdrawals</p>
              </div>
            </div>

          </div>

          {/* Interactive Phone Mockup (Right Hero panel) */}
          <div id="simulator" className="lg:col-span-5 flex justify-center scroll-mt-24">
            
            <div className="relative w-full max-w-[340px] aspect-[9/19] bg-black rounded-[46px] p-3 shadow-2xl border-4 border-gray-800">
              
              {/* Dynamic Island and Notch */}
              <div className="absolute top-5.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full" />
                <div className="w-12 h-1 bg-zinc-900 rounded-full" />
              </div>

              {/* Speaker Grill */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-full z-30" />

              {/* Simulated Phone UI Context */}
              <div className="w-full h-full bg-[#FAF9F6] rounded-[34px] overflow-hidden flex flex-col relative z-10 text-gray-900 select-none">
                
                {/* Phone Top Status Bar */}
                <div className="h-9 bg-white px-5 pt-3.5 flex justify-between items-center text-[10px] font-bold text-gray-600 z-20 shrink-0">
                  <span>16:24</span>
                  <div className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    <span>5G</span>
                    <div className="w-4.5 h-2.5 border border-gray-400 rounded-xs p-0.5 flex items-center">
                      <div className="w-full h-full bg-gray-600 rounded-3xs" />
                    </div>
                  </div>
                </div>

                {/* Simulated App Wrapper */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                  
                  <AnimatePresence mode="wait">
                    
                    {/* APP SCREEN 1: ESCROW DASHBOARD */}
                    {phoneScreen === 'dashboard' && (
                      <motion.div 
                        key="dashboard"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center text-white font-extrabold text-xs">
                              B
                            </div>
                            <span className="font-extrabold text-xs tracking-tight text-gray-900">bareey</span>
                          </div>
                          <span className="text-[8px] bg-orange-50 text-orange-600 border border-orange-100 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">PlayStore App</span>
                        </div>

                        {/* Interactive Wallet Balance Card */}
                        <div className="bg-black text-white p-4 rounded-2xl space-y-3 relative overflow-hidden shadow-xs shrink-0">
                          <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-orange-500/10 rounded-full blur-xl" />
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Escrow Balance</span>
                            <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 font-extrabold rounded-full">SECURED</span>
                          </div>
                          <div>
                            <p className="text-xl font-extrabold text-orange-400 leading-none">₦165,000</p>
                            <p className="text-[8px] text-gray-400 mt-1">Pending Release: ₦120,000</p>
                          </div>
                          
                          <button 
                            onClick={() => setPhoneScreen('create')} 
                            className="w-full py-1.5 bg-white hover:bg-gray-100 text-black text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3 text-orange-500" />
                            <span>New Escrow Deal</span>
                          </button>
                        </div>

                        {/* Instructions */}
                        <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-2.5 text-[9px] text-orange-950 flex gap-2 shrink-0">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
                          <span>Click a transaction card below to open its chat workspace and release payments!</span>
                        </div>

                        {/* Active Trades list */}
                        <div className="space-y-1.5 flex-1">
                          <p className="text-[9px] font-bold uppercase tracking-wide text-gray-400 px-1">Escrow Transactions</p>
                          
                          <div className="space-y-1.5">
                            {mockTrades.map((trade) => {
                              let statusText = "Pending";
                              let statusColor = "bg-gray-100 text-gray-600 border-gray-200";
                              if (trade.status === 'held') {
                                statusText = "Held in Escrow";
                                statusColor = "bg-orange-50 text-orange-700 border-orange-100";
                              } else if (trade.status === 'shipped') {
                                statusText = "Shipped / In Transit";
                                statusColor = "bg-blue-50 text-blue-700 border-blue-100";
                              } else if (trade.status === 'released') {
                                statusText = "Payout Released";
                                statusColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
                              } else if (trade.status === 'disputed') {
                                statusText = "Arbitration Active";
                                statusColor = "bg-red-50 text-red-700 border-red-100";
                              }

                              return (
                                <div 
                                  key={trade.id}
                                  onClick={() => handleSelectTrade(trade.id)}
                                  className={`p-2.5 bg-white border rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                                    selectedTradeId === trade.id ? 'border-orange-300 bg-orange-50/10' : 'border-gray-100 hover:border-gray-200'
                                  }`}
                                >
                                  <div className="space-y-0.5">
                                    <p className="text-[11px] font-bold text-gray-900 leading-tight">{trade.title}</p>
                                    <p className="text-[8px] text-gray-400">With {trade.counterparty} • {trade.category}</p>
                                  </div>
                                  <div className="text-right space-y-0.5 shrink-0">
                                    <p className="text-[11px] font-extrabold text-gray-950">₦{trade.amount.toLocaleString()}</p>
                                    <span className={`inline-block text-[7px] font-bold px-1.5 py-0.5 border rounded-xs ${statusColor}`}>
                                      {statusText}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* APP SCREEN 2: SECURE ESCROW CHAT */}
                    {phoneScreen === 'chat' && activeTrade && (
                      <motion.div 
                        key="chat"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 flex flex-col overflow-hidden"
                      >
                        {/* Chat Top Banner */}
                        <div className="bg-white border-b border-gray-100 p-2.5 flex items-center justify-between shrink-0">
                          <button 
                            onClick={() => setPhoneScreen('dashboard')} 
                            className="text-[10px] font-bold text-gray-500 hover:text-black flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>← Inbox</span>
                          </button>
                          <div className="text-center">
                            <p className="text-[11px] font-extrabold text-gray-950 leading-none">{activeTrade.counterparty}</p>
                            <p className="text-[8px] text-gray-400 mt-1">Escrow ID: {activeTrade.id}</p>
                          </div>
                          <div className="w-10" />
                        </div>

                        {/* Escrow Status Micro-Banner */}
                        <div className="bg-orange-50/80 border-b border-orange-100/50 p-2 px-3 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                            <div>
                              <p className="text-[8px] font-black text-orange-950 leading-none uppercase">Escrow Locked</p>
                              <p className="text-[7px] text-gray-600 mt-0.5">
                                {activeTrade.status === 'held' && "Payment secured. Awaiting delivery dispatch."}
                                {activeTrade.status === 'shipped' && "In Transit. Inspect package and release."}
                                {activeTrade.status === 'released' && "Trade completed. Payout settled."}
                                {activeTrade.status === 'disputed' && "Support reviewing receipts and agreements."}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[9px] font-extrabold text-orange-950 leading-none">₦{activeTrade.amount.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Chat List Scroll */}
                        <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50/50">
                          {activeTrade.messages.map((msg, idx) => {
                            const isMe = msg.sender === activeTrade.role;
                            const isSys = msg.sender === 'system';

                            if (isSys) {
                              return (
                                <div key={idx} className="flex justify-center my-1">
                                  <div className="bg-zinc-100 border border-zinc-200/50 rounded-lg p-2 max-w-[90%] text-center">
                                    <p className="text-[8px] font-bold text-gray-600 leading-tight">{msg.text}</p>
                                    <span className="text-[6px] text-gray-400 block mt-0.5">{msg.time}</span>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-xl p-2.5 text-[10px] leading-relaxed shadow-3xs ${
                                  isMe 
                                    ? 'bg-black text-white rounded-tr-none' 
                                    : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none'
                                }`}>
                                  <p>{msg.text}</p>
                                  <span className={`text-[6px] block mt-1 text-right ${isMe ? 'text-gray-400' : 'text-gray-400'}`}>
                                    {msg.time}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Dynamic Interactive Action buttons based on status */}
                        <div className="p-2 bg-white border-t border-gray-100 space-y-1.5 shrink-0">
                          
                          {activeTrade.status === 'held' && (
                            <div className="flex flex-col gap-1">
                              {activeTrade.role === 'seller' ? (
                                <button 
                                  onClick={() => handleMockDispatch(activeTrade.id)}
                                  className="w-full py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-[9px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Zap className="w-3 h-3" />
                                  <span>Mark as Shipped</span>
                                </button>
                              ) : (
                                <p className="text-center text-[8px] text-gray-400 font-medium py-1">Awaiting seller shipment dispatch...</p>
                              )}
                            </div>
                          )}

                          {activeTrade.status === 'shipped' && (
                            <div className="grid grid-cols-2 gap-1.5">
                              {activeTrade.role === 'buyer' ? (
                                <>
                                  <button 
                                    onClick={() => handleMockRelease(activeTrade.id)}
                                    className="py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[9px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <Check className="w-3 h-3" />
                                    <span>Release Payout</span>
                                  </button>
                                  <button 
                                    onClick={() => handleMockDispute(activeTrade.id)}
                                    className="py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 font-extrabold text-[9px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>File Dispute</span>
                                  </button>
                                </>
                              ) : (
                                <p className="col-span-2 text-center text-[8px] text-gray-400 font-medium py-1">Awaiting buyer inspection & payout release...</p>
                              )}
                            </div>
                          )}

                          {activeTrade.status === 'released' && (
                            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-1.5 rounded-lg text-center flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-[8px] font-bold">Escrow Released! Payout Settled.</span>
                            </div>
                          )}

                          {activeTrade.status === 'disputed' && (
                            <div className="bg-red-50 text-red-800 border border-red-100 p-1.5 rounded-lg text-center flex items-center justify-center gap-1">
                              <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
                              <span className="text-[8px] font-bold">Dispute active. Support reviewing logs.</span>
                            </div>
                          )}

                          {/* Chat Input */}
                          {activeTrade.status !== 'released' && activeTrade.status !== 'disputed' && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <input 
                                type="text"
                                placeholder="Type secure message..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMockMessage()}
                                className="flex-1 bg-gray-100 text-gray-900 border border-gray-200 text-[9px] rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-gray-400 font-medium"
                              />
                              <button 
                                onClick={handleSendMockMessage}
                                className="p-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                              >
                                <Send className="w-3 h-3 text-orange-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* APP SCREEN 3: CREATE ESCROW FORM */}
                    {phoneScreen === 'create' && (
                      <motion.div 
                        key="create"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex-1 flex flex-col p-4 space-y-3 overflow-y-auto"
                      >
                        <div className="flex items-center justify-between shrink-0">
                          <span className="text-xs font-bold text-gray-900">Deploy New Escrow</span>
                          <button 
                            onClick={() => setPhoneScreen('dashboard')} 
                            className="text-[9px] font-bold text-gray-400 hover:text-black cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>

                        <form onSubmit={handleCreateMockEscrow} className="space-y-3.5 text-[9px]">
                          <div>
                            <label className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Deal / Contract Name</label>
                            <input 
                              type="text"
                              required
                              placeholder="e.g. Vintage Leather Jacket, Web Design"
                              value={formTitle}
                              onChange={(e) => setFormTitle(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-hidden focus:border-orange-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[8px] uppercase font-bold text-gray-400 mb-1">My Role</label>
                              <select 
                                value={formRole}
                                onChange={(e) => setFormRole(e.target.value as 'buyer' | 'seller')}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-hidden"
                              >
                                <option value="buyer">I am Buyer</option>
                                <option value="seller">I am Seller</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Counterparty Name</label>
                              <input 
                                type="text"
                                required
                                placeholder="e.g. Chinedu K."
                                value={formParty}
                                onChange={(e) => setFormParty(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-hidden focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Category</label>
                              <select 
                                value={formCategory}
                                onChange={(e) => setFormCategory(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-hidden"
                              >
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Catering">Catering</option>
                                <option value="Digital Service">Digital Service</option>
                                <option value="Others">Others</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Amount (₦)</label>
                              <input 
                                type="number"
                                required
                                value={formAmount}
                                onChange={(e) => setFormAmount(Number(e.target.value))}
                                className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-900 focus:outline-hidden focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <div className="p-2 bg-orange-50 rounded-lg border border-orange-100 text-[8px] text-orange-950 flex gap-1 shrink-0">
                            <Info className="w-3 h-3 text-orange-500 shrink-0 mt-0.5" />
                            <span>1.5% Bareey trust fee will be automatically calculated.</span>
                          </div>

                          <button 
                            type="submit"
                            className="w-full py-1.5 bg-black hover:bg-zinc-800 text-white font-extrabold rounded-lg text-[9px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                            <span>Initiate Secure Vault</span>
                          </button>
                        </form>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* App Bottom Simulated Menu Bar */}
                  <div className="h-12 bg-white border-t border-gray-100 flex justify-around items-center px-4 z-20 shrink-0">
                    <button 
                      onClick={() => { setPhoneScreen('dashboard'); }}
                      className={`flex flex-col items-center gap-0.5 text-gray-400 hover:text-black transition-colors ${phoneScreen === 'dashboard' ? 'text-black' : ''}`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="text-[7px] font-bold">Vault</span>
                    </button>
                    
                    <button 
                      onClick={() => { setPhoneScreen('create'); }}
                      className={`flex flex-col items-center gap-0.5 text-gray-400 hover:text-black transition-colors ${phoneScreen === 'create' ? 'text-black' : ''}`}
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-500 font-extrabold" />
                      <span className="text-[7px] font-bold">New deal</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleSelectTrade('trade-1');
                      }}
                      className={`flex flex-col items-center gap-0.5 text-gray-400 hover:text-black transition-colors ${phoneScreen === 'chat' ? 'text-black' : ''}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="text-[7px] font-bold">Chats</span>
                    </button>
                  </div>

                </div>

                {/* Simulated Home Indicator bar */}
                <div className="h-3.5 bg-white pb-1 flex justify-center items-center z-20 shrink-0">
                  <div className="w-20 h-0.5 bg-gray-300 rounded-full" />
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SECTION 2: THE TRUST PILLARS (Bento Grid Style) */}
        <section id="features" className="bg-white py-20 border-y border-gray-100/50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Platform Integrity</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Pristine Escrow Security. Effortless Transactions.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Discover how Bareey protects your funds, audits delivery tracks, and guarantees fair settlements across Nigeria.
              </p>
            </div>

            {/* Features Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="bg-zinc-50 border border-gray-100 rounded-3xl p-8 space-y-4 hover:border-gray-200 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900">Bulletproof Escrow Vault</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Payments are stored securely in our locked trust custody. Sellers only get paid when buyers confirm receipt of correct goods.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-orange-600 font-bold">
                  <span>Bank-grade safety protocol</span>
                  <BadgeCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-zinc-50 border border-gray-100 rounded-3xl p-8 space-y-4 hover:border-gray-200 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900">Secure Monitored Chat</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Every agreement, shipment document, and timeline event is tracked inside our audited chat workspace to resolve disputes easily.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                  <span>Fully encrypted channels</span>
                  <Lock className="w-4 h-4" />
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-zinc-50 border border-gray-100 rounded-3xl p-8 space-y-4 hover:border-gray-200 transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-900">Instant Settlements</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Once the deal is confirmed, withdrawals land in any Nigerian bank account in under 3 minutes via real-time processing networks.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <span>3-minute bank payout</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS TIMELINE */}
        <section id="how-it-works" className="py-20 bg-zinc-50/50 border-b border-gray-100/50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest font-sans">Simple 4-Step Flow</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                How Bareey Escrow Protects You
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                An elegant system built to align incentives, ensuring sellers get paid and buyers receive exactly what they paid for.
              </p>
            </div>

            {/* Flow Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              
              {/* Step 1 */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl relative space-y-4 shadow-3xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-orange-500">Step One</span>
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold">1</div>
                <h3 className="font-extrabold text-base text-gray-900">Buyer Funds Deal</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The buyer deposits transaction payment into Bareey's secure vault. Funds are locked instantly.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl relative space-y-4 shadow-3xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-500">Step Two</span>
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">2</div>
                <h3 className="font-extrabold text-base text-gray-900">Seller Ships Item</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The seller is notified of secure deposit and ships package or delivers services. Tracking begins.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl relative space-y-4 shadow-3xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-purple-500">Step Three</span>
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">3</div>
                <h3 className="font-extrabold text-base text-gray-900">Buyer Inspects</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Buyer receives the delivery and inspects quality. Everything matches the agreed terms.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl relative space-y-4 shadow-3xs">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Step Four</span>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">4</div>
                <h3 className="font-extrabold text-base text-gray-900">Payout Released</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Buyer clicks 'Release Payout' in app, and Bareey settles funds instantly to the seller's bank.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 4: BUYER PROTECTION RULES */}
        <section className="bg-white py-20 border-b border-gray-100/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-50 border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-3xs flex flex-col md:flex-row gap-10 items-center">
              
              <div className="flex-1 space-y-5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Transparent Cancelation Liability
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Bareey protects both parties from post-delivery remorse or shipping fee fraud by enforcing simple legal safeguards:
                </p>
                <ul className="space-y-3.5 text-xs font-medium text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Cancel for free anytime before the seller ships physical/digital items.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Change of mind post-delivery? Buyer pays shipping costs both ways.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Defective or incorrect item shipped? Seller absorbs all delivery fees.</span>
                  </li>
                </ul>
              </div>

              {/* Illustration Card */}
              <div className="w-full md:w-80 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs shrink-0 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                  <span className="font-extrabold text-xs tracking-wider uppercase text-gray-400">Escrow Security Rules</span>
                  <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 text-[8px] font-bold rounded-xs">LAWS</span>
                </div>
                <div className="space-y-2.5 text-[11px] text-gray-500">
                  <div className="flex gap-2.5">
                    <span className="font-bold text-gray-900 shrink-0">Rule 1:</span>
                    <span>Cancellations are completely blocked once shipping is verified, unless the seller consents or an arbitrator intervenes.</span>
                  </div>
                  <div className="flex gap-2.5">
                    <span className="font-bold text-gray-900 shrink-0">Rule 2:</span>
                    <span>Dispute lock freezes funds for up to 14 days, providing ample time for delivery audits.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: INTERACTIVE FEE CALCULATOR */}
        <section id="calculator" className="py-20 bg-zinc-50/50 border-b border-gray-100/50 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Pricing Transparency</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                No Hidden Fees. Pure Transparency.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Bareey charges a tiny 1.5% commission (capped at ₦5,000 maximum) to secure your transaction. Calculate your breakdown instantly.
              </p>
            </div>

            {/* Interactive Fee Calculator widget */}
            <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Inputs */}
              <div className="md:col-span-7 space-y-6">
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Transaction Amount (₦)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-extrabold text-gray-400 text-sm">₦</span>
                    <input 
                      type="number"
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-zinc-50 border border-gray-100 hover:border-gray-200 focus:border-orange-500 rounded-xl pl-8 pr-4 py-3 focus:outline-hidden text-sm font-bold text-gray-900 transition-all"
                    />
                  </div>
                  <input 
                    type="range"
                    min="1000"
                    max="1000000"
                    step="5000"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full accent-orange-500 mt-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>₦1,000</span>
                    <span>₦500,000</span>
                    <span>₦1,000,000</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Who Pays the Escrow Fee?</label>
                  <div className="grid grid-cols-3 gap-2.5 text-[11px] font-bold">
                    <button 
                      onClick={() => setCalcSplit('buyer')}
                      className={`py-2 px-3 border rounded-xl transition-all cursor-pointer ${
                        calcSplit === 'buyer' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-100 hover:border-gray-200 text-gray-500 hover:text-black bg-white'
                      }`}
                    >
                      Buyer Pays
                    </button>
                    <button 
                      onClick={() => setCalcSplit('seller')}
                      className={`py-2 px-3 border rounded-xl transition-all cursor-pointer ${
                        calcSplit === 'seller' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-100 hover:border-gray-200 text-gray-500 hover:text-black bg-white'
                      }`}
                    >
                      Seller Absorbs
                    </button>
                    <button 
                      onClick={() => setCalcSplit('split')}
                      className={`py-2 px-3 border rounded-xl transition-all cursor-pointer ${
                        calcSplit === 'split' 
                          ? 'border-black bg-black text-white' 
                          : 'border-gray-100 hover:border-gray-200 text-gray-500 hover:text-black bg-white'
                      }`}
                    >
                      Split 50/50
                    </button>
                  </div>
                </div>

              </div>

              {/* Outputs */}
              <div className="md:col-span-5 bg-zinc-50/80 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 pb-2 border-b border-gray-100">
                    <span>Transaction Amount:</span>
                    <span className="font-bold text-gray-900">₦{calcAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-xs font-semibold text-gray-500 pb-2 border-b border-gray-100">
                    <span>Escrow trust fee (1.5%):</span>
                    <span className="font-bold text-orange-600">₦{calcResults.fee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buyer transfers:</p>
                    <p className="text-lg font-black text-gray-900">₦{calcResults.buyerPays.toLocaleString()}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seller receives:</p>
                    <p className="text-lg font-black text-orange-600">₦{calcResults.sellerReceives.toLocaleString()}</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* SECTION 6: FAQS ACCORDION */}
        <section id="faqs" className="py-20 bg-white scroll-mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Support desk</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Got questions about payouts, disputes, or limits? We have answers.
              </p>
            </div>

            {/* Accordion Log */}
            <div className="space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-zinc-50/50 border border-gray-100 rounded-2xl transition-all"
                  >
                    <button 
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4.5 flex items-center justify-between font-extrabold text-sm sm:text-base text-gray-900 text-left cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-100/50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-between items-center">
          
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 bg-white text-black rounded-md flex items-center justify-center font-extrabold text-xs">
                B
              </div>
              <span className="font-extrabold text-base tracking-tight text-white leading-none">bareey</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Nigeria's unified secure trade and mobile p2p escrow application. Settle payments with confidence. Available for free download.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-[11px] text-neutral-400 font-semibold pt-1">
              <button onClick={() => navigateTo('/check#terms')} className="hover:text-orange-500 cursor-pointer transition-colors">Terms of Use</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => navigateTo('/check#privacy-policy')} className="hover:text-orange-500 cursor-pointer transition-colors">Privacy Policy</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => navigateTo('/check#refund-policy')} className="hover:text-orange-500 cursor-pointer transition-colors">Refund Policy</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => navigateTo('/check#about-bareey')} className="hover:text-orange-500 cursor-pointer transition-colors">About</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => navigateTo('/check#contact')} className="hover:text-orange-500 cursor-pointer transition-colors">Contact</button>
              <span className="text-neutral-700">•</span>
              <button onClick={() => navigateTo('/settings/remove')} className="hover:text-red-500 cursor-pointer transition-colors text-red-400">Delete Account</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0">
            <a 
              href={BAREEY_PLAYSTORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl border border-neutral-800 transition-all text-xs font-bold cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 24 24">
                <path d="M5.25 2.25c-.24 0-.47.1-.64.27L14.1 12 4.6 21.5c.17.16.4.25.64.25c.23 0 .44-.08.61-.22l11.41-6.59l-3.23-3.23l-3.23-3.23L5.86 2.47c-.17-.14-.38-.22-.61-.22zM21.2 11.2l-3.2 1.8l-3.2-1.8l3.2-1.8z" />
              </svg>
              <span>Download on Google Play</span>
            </a>
            
            <p className="text-[10px] text-neutral-500 font-medium">
              © {new Date().getFullYear()} Bareey Inc. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
        </>
      )}
    </div>
  );
}
