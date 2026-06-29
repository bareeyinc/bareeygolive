/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, ShoppingBag, Briefcase, MessageSquare, User, 
  Search, Bell, Sparkles, AlertCircle, RefreshCw, X, ChevronRight,
  Info, ShieldAlert, ArrowRight
} from 'lucide-react';

import Navbar from './lib/components/Navbar';
import HeroBanner from './lib/components/HeroBanner';
import ProductCard from './lib/components/ProductCard';
import ServiceCard from './lib/components/ServiceCard';
import ChatWorkspace from './lib/components/ChatWorkspace';
import { ChatCategoryCard, ChatThreadRow } from './lib/components/ChatPreviewCard';
import MarketplaceFeatures from './lib/components/MarketplaceFeatureCard';
import ProfileStoreManager from './lib/components/ProfileStoreManager';
import SectionHeader from './lib/components/SectionHeader';
import LoadingSkeleton from './lib/components/LoadingSkeleton';
import EmptyState from './lib/components/EmptyState';
import BottomNavigation from './lib/components/BottomNavigation';

import { Product, Service, Chat, Message } from './types';
import { mockProducts, fetchProductsSimulated } from './lib/api/products';
import { mockServices, fetchServicesSimulated } from './lib/api/services';

export default function App() {
  const [activeTab, setActiveTab] = useState<'products' | 'chats' | 'services' | 'profile'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real-time notification lists or states
  const [notifications, setNotifications] = useState<string[]>([
    "Welcome to Bareey MVP! Your Escrow wallet is fully activated.",
    "Amina Bello funded escrow for 'Double Chocolate Celebration Cake'."
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // States for products & services
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  
  // States for API loading states
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [servicesError, setServicesError] = useState(false);

  // Failure Simulation state (for testing Retry states requested in specification)
  const [simulateProductFail, setSimulateProductFail] = useState(false);
  const [simulateServiceFail, setSimulateServiceFail] = useState(false);

  // Selected chat preview and thread states
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat-1",
      otherUserId: "6a25a3b3bd244dc51ebff678",
      otherUserName: "Amina Bello",
      targetId: "6a38903e9b6a52edf110a583",
      targetTitle: "Double Chocolate Celebration Cake",
      targetType: 'product',
      targetPrice: "₦45,000",
      category: 'customer', // customer buying from me
      lastMessageText: "Hi Amina, yes it is ready! I am boxing it now with priority cooling packs.",
      lastMessageTime: "10:35 AM",
      unread: true,
      status: 'preparing',
      messages: [
        { id: "msg-1", senderId: "other", senderName: "Amina Bello", text: "Hello! Is the chocolate celebration cake ready for pickup? Please use priority cooling dispatch.", timestamp: "10:32 AM" },
        { id: "msg-2", senderId: "me", senderName: "Me", text: "Hi Amina, yes it is ready! I am boxing it now with priority cooling packs.", timestamp: "10:35 AM" }
      ]
    },
    {
      id: "chat-2",
      otherUserId: "6a25a3b3bd244dc51ebff679",
      otherUserName: "John Okafor",
      targetId: "6a2ae13356a9c476cac3fefe",
      targetTitle: "Heuristic UX Audit & UI Teardown Service",
      targetType: 'service',
      targetPrice: "₦120,000",
      category: 'customer', // customer hiring me
      lastMessageText: "Reviewing the leakage points and micro-interactions now. Thanks!",
      lastMessageTime: "Yesterday",
      unread: false,
      status: 'shipped',
      messages: [
        { id: "msg-10", senderId: "other", senderName: "John Okafor", text: "Hey! Can you do a heuristic UX review of our fintech MVP?", timestamp: "Yesterday" },
        { id: "msg-11", senderId: "me", senderName: "Me", text: "Definitely. I've updated the status to escrow preparing. I'll have the PDF audit draft ready within 24 hours.", timestamp: "Yesterday" },
        { id: "msg-12", senderId: "system", senderName: "Bareey Escrow", text: "Seller has uploaded delivery proof. Awaiting buyer inspection.", timestamp: "Yesterday" },
        { id: "msg-13", senderId: "other", senderName: "John Okafor", text: "Reviewing the leakage points and micro-interactions now. Thanks!", timestamp: "Yesterday" }
      ]
    },
    {
      id: "chat-3",
      otherUserId: "6a25a3b3bd244dc51ebff680",
      otherUserName: "Zara Boutique",
      targetId: "6a38903e9b6a52edf110588",
      targetTitle: "Gabriella Saffiano Leather Tote",
      targetType: 'product',
      targetPrice: "₦280,000",
      category: 'service', // I requested from Zara
      lastMessageText: "Buyer confirmed delivery. ₦280,000 payout released to Zara Boutique.",
      lastMessageTime: "2 days ago",
      unread: false,
      status: 'completed',
      messages: [
        { id: "msg-20", senderId: "me", senderName: "Me", text: "Hi! Do you have this in royal green or black?", timestamp: "3 days ago" },
        { id: "msg-21", senderId: "other", senderName: "Zara Boutique", text: "Yes, we have black in stock! Shipped via GIG Logistics. Tracker ref: GIG-9812-NG.", timestamp: "2 days ago" },
        { id: "msg-22", senderId: "me", senderName: "Me", text: "Perfect! Received and inspected. Excellent quality leather. Releasing funds now.", timestamp: "2 days ago" }
      ]
    },
    {
      id: "chat-4",
      otherUserId: "6a25a3b3bd244dc51ebff681",
      otherUserName: "Tech Savvy Corp",
      targetId: "6a2ae13356a9c476cac3feeb",
      targetTitle: "Full-Stack Web Development Service",
      targetType: 'service',
      targetPrice: "₦450,000",
      category: 'service', // I hired Tech Savvy Corp
      lastMessageText: "Perfect! Escrow payment received successfully. Preparing your order now.",
      lastMessageTime: "3 days ago",
      unread: false,
      status: 'preparing',
      messages: [
        { id: "msg-30", senderId: "me", senderName: "Me", text: "Hi, I need a simple React dashboard connected to a custom API proxy. Can you deliver in 3 days?", timestamp: "3 days ago" },
        { id: "msg-31", senderId: "other", senderName: "Tech Savvy Corp", text: "Yes, absolutely! We can set that up using Vite + TypeScript. Please deposit into Bareey Escrow to begin.", timestamp: "3 days ago" },
        { id: "msg-32", senderId: "system", senderName: "Bareey Escrow", text: "Buyer deposited payment of ₦450,000 into Bareey Escrow. Funds are safely secured!", timestamp: "3 days ago" }
      ]
    }
  ]);

  // Active Chats filter 'customer' | 'service' (never mix)
  const [selectedChatCategory, setSelectedChatCategory] = useState<'customer' | 'service' | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Simulated API Data Loaders
  const loadProducts = async (fail = false) => {
    setLoadingProducts(true);
    setProductsError(false);
    try {
      const data = await fetchProductsSimulated(fail);
      setProductsList(data);
    } catch (err) {
      setProductsError(true);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadServices = async (fail = false) => {
    setLoadingServices(true);
    setServicesError(false);
    try {
      const data = await fetchServicesSimulated(fail);
      setServicesList(data);
    } catch (err) {
      setServicesError(true);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    loadProducts(simulateProductFail);
  }, [simulateProductFail]);

  useEffect(() => {
    loadServices(simulateServiceFail);
  }, [simulateServiceFail]);

  // Merchant Actions
  const handleAddProduct = (newProduct: Product) => {
    setProductsList(prev => [newProduct, ...prev]);
    setNotifications(prev => [
      `Successfully published new product: '${newProduct.title}' to Bareey Marketplace.`,
      ...prev
    ]);
  };

  const handleAddService = (newService: Service) => {
    setServicesList(prev => [newService, ...prev]);
    setNotifications(prev => [
      `Successfully listed your service: '${newService.name}' with escrow verification.`,
      ...prev
    ]);
  };

  // Chat Activation Handlers
  const openChatForProduct = (product: Product) => {
    // Check if chat already exists
    const existing = chats.find(c => c.targetId === product._id);
    if (existing) {
      setActiveChatId(existing.id);
      setSelectedChatCategory(existing.category);
      setActiveTab('chats');
      return;
    }

    // Create a new service (buying) chat thread
    const priceFormatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(product.theprices[0] || 50000);

    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      otherUserId: product.usersid,
      otherUserName: product.shopinformation?.title || "Merchant Partner",
      targetId: product._id,
      targetTitle: product.title,
      targetType: 'product',
      targetPrice: priceFormatted,
      category: 'service', // Deeni buying from another seller
      lastMessageText: "Hi! I am interested in this product. Let's start the secure transaction.",
      lastMessageTime: "Just now",
      unread: false,
      status: 'pending',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'me',
          senderName: 'Me',
          text: `Hi! I want to purchase your "${product.title}" for ${priceFormatted}. Please let me know once escrow is funded!`,
          timestamp: 'Just now'
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setSelectedChatCategory('service');
    setActiveTab('chats');
  };

  const openChatForService = (service: Service) => {
    // Check if chat already exists
    const existing = chats.find(c => c.targetId === service._id);
    if (existing) {
      setActiveChatId(existing.id);
      setSelectedChatCategory(existing.category);
      setActiveTab('chats');
      return;
    }

    // Create a new service request chat thread
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      otherUserId: service.usersid,
      otherUserName: service.name.split(" ").slice(0, 2).join(" ") || "Professional Partner",
      targetId: service._id,
      targetTitle: service.name,
      targetType: 'service',
      targetPrice: service.pricing.bargain ? 'Open budget' : 'Fixed rate',
      category: 'service', // Deeni hiring another provider
      lastMessageText: "Hi! I want to request your service. Let's discuss details.",
      lastMessageTime: "Just now",
      unread: false,
      status: 'pending',
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'me',
          senderName: 'Me',
          text: `Hi! I am interested in your service: "${service.name}". Let's start a secure conversation thread.`,
          timestamp: 'Just now'
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setSelectedChatCategory('service');
    setActiveTab('chats');
  };

  const handleUpdateChatStatus = (chatId: string, status: Chat['status'], messages: Message[]) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const lastMsg = messages[messages.length - 1];
        return {
          ...chat,
          status,
          messages,
          lastMessageText: lastMsg ? lastMsg.text : chat.lastMessageText,
          lastMessageTime: lastMsg ? lastMsg.timestamp : chat.lastMessageTime
        };
      }
      return chat;
    }));
  };

  // Search filter lists
  const filteredProducts = productsList.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = servicesList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count active chats for badges
  const activeCustomerChatsCount = chats.filter(c => c.category === 'customer' && c.status !== 'completed' && c.status !== 'cancelled').length;
  const activeServiceChatsCount = chats.filter(c => c.category === 'service' && c.status !== 'completed' && c.status !== 'cancelled').length;

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-gray-900 font-sans flex flex-col relative selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      
      {/* Dynamic Notifications Dropdown popup panel */}
      <AnimatePresence>
        {showNotifications && (
          <div className="absolute right-6 top-16 z-50 bg-white border border-gray-100 rounded-3xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
              <span className="font-extrabold text-sm text-gray-950 uppercase tracking-wider">Activity Alerts</span>
              <button 
                onClick={() => setShowNotifications(false)}
                className="p-1 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {notifications.map((notif, index) => (
                <div key={index} className="flex gap-2.5 items-start p-2 hover:bg-gray-50 rounded-xl transition-all">
                  <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-600 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">{notif}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Slim Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Quick Search & Notification Utilities bar */}
      <div className="bg-white/40 border-b border-gray-100/50 backdrop-blur-md sticky top-16 z-40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Svelte/React Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, professional services or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 border border-gray-100 hover:border-gray-200 focus:border-black text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:outline-hidden transition-all"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Simulation Controller Switcher (for showing Loading/Success/Error/Retry) */}
            <div className="flex gap-1 bg-gray-100/70 p-1.5 rounded-2xl border border-gray-100 text-[10px] font-bold">
              <button 
                onClick={() => {
                  setSimulateProductFail(prev => !prev);
                  setSimulateServiceFail(prev => !prev);
                }}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  simulateProductFail 
                    ? 'bg-red-500 text-white shadow-xs' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                {simulateProductFail ? 'Simulated: Error Mode' : 'Simulate API Network Error'}
              </button>
            </div>

            {/* Notification Bell */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 hover:bg-gray-100 rounded-xl transition-all cursor-pointer text-gray-600 relative shrink-0"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Dashboard Layout */}
      <main className="flex-1 pb-24 md:pb-12 relative z-10">
        
        {/* TAB 1: MARKETPLACE / PRODUCTS */}
        {activeTab === 'products' && (
          <div>
            <HeroBanner 
              onExploreProducts={() => {
                const el = document.getElementById('products-explore');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreServices={() => setActiveTab('services')}
            />

            {/* Marketplace Scrolling Row Section */}
            <div id="products-explore" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <SectionHeader 
                title="Explore the Marketplace" 
                description="Discover and purchase trusted products safely. All payments are held in Bareey Escrow until you confirm receipt."
                badge="Commerce Marketplace"
              />

              {/* State 1: Loading Skeleton */}
              {loadingProducts ? (
                <LoadingSkeleton type="list" />
              ) : productsError ? (
                /* State 3: Error State & Retry Trigger */
                <EmptyState
                  type="error"
                  title="Products Load Interrupted"
                  description="A simulated API connection failure is active. Click retry to recover."
                  onRetry={() => {
                    setSimulateProductFail(false);
                    loadProducts(false);
                  }}
                  retryLabel="Recover & Retry API Call"
                />
              ) : filteredProducts.length === 0 ? (
                <EmptyState
                  title="No Matching Products Found"
                  description={`We couldn't find any listings for "${searchQuery}". Please test another search query.`}
                />
              ) : (
                /* State 2: Success List Horizontal Scrolling */
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-200 select-none">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onOpenChat={openChatForProduct}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Marketplace Flow Explanation Timeline */}
            <MarketplaceFeatures />

            {/* Escrow Rule Protection Specifications */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <div className="bg-white/80 border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-xs">
                <div className="max-w-3xl">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Secure Trading Guidelines</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1 mb-4">Bareey Buyer Protection Regulations</h3>
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                    To eliminate disputes and protect our merchants, Bareey implements simple, transparent liabilities for cancel/refund requests post-shipment:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-sm mb-1">Pre-Shipping Cancellations</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">Buyers can cancel anytime before shipping begins for a full automatic instant refund. No charges applied.</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-sm mb-1">Change of Mind Rules</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">If the seller shipped correct items and you cancel, you (the buyer) pay shipping costs both ways.</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-sm mb-1">Wrong Item Liability</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">If the seller ships the wrong product, the seller pays every single shipping cost. Buyer receives full refund.</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm shrink-0">4</div>
                      <div>
                        <h4 className="font-bold text-gray-950 text-sm mb-1">Standard Terms Apply</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">All agreements are recorded on secure SvelteKit/React logs to protect both parties in arbitration.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHATS Workspace & Separate categories */}
        {activeTab === 'chats' && (
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
            <AnimatePresence mode="wait">
              {activeChatId ? (
                /* Thread View Inside Chat Workspace */
                <motion.div
                  key="active-workspace"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {(() => {
                    const matchedChat = chats.find(c => c.id === activeChatId);
                    if (!matchedChat) return null;
                    return (
                      <ChatWorkspace
                        chat={matchedChat}
                        onBack={() => setActiveChatId(null)}
                        onUpdateChatStatus={handleUpdateChatStatus}
                      />
                    );
                  })()}
                </motion.div>
              ) : selectedChatCategory === null ? (
                /* Category Selection Workspace view */
                <motion.div
                  key="chat-category-select"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <SectionHeader
                    title="Unified Escrow Chat System"
                    description="Bareey separates conversations into independent workspaces. Select an inbox below."
                    badge="Secure Channels"
                  />

                  {/* Two equal cards visually identical as requested */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChatCategoryCard
                      title="Customer Chats"
                      description="When buyers request your services or buy listed items, those secure conversations appear here."
                      type="customer"
                      count={activeCustomerChatsCount}
                      onClick={() => setSelectedChatCategory('customer')}
                    />

                    <ChatCategoryCard
                      title="Service Chats"
                      description="When you request services or buy items from another provider, those conversations appear here."
                      type="service"
                      count={activeServiceChatsCount}
                      onClick={() => setSelectedChatCategory('service')}
                    />
                  </div>
                </motion.div>
              ) : (
                /* Thread list view depending on category (Never mixed) */
                <motion.div
                  key="chat-threads-list"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setSelectedChatCategory(null)}
                      className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-wider flex items-center gap-1.5"
                    >
                      ← Back to categories
                    </button>
                    
                    <span className="px-3 py-1 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                      {selectedChatCategory === 'customer' ? 'Customer Inbox' : 'Service Requests'}
                    </span>
                  </div>

                  {chats.filter(c => c.category === selectedChatCategory).length === 0 ? (
                    <EmptyState
                      title="No conversations listed"
                      description={`Your ${selectedChatCategory} chat log is empty. Open items in the marketplace or services directory to start.`}
                    />
                  ) : (
                    <div className="space-y-3.5">
                      {chats
                        .filter(c => c.category === selectedChatCategory)
                        .map((chat) => (
                          <ChatThreadRow
                            key={chat.id}
                            chat={chat}
                            onClick={() => setActiveChatId(chat.id)}
                          />
                        ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* TAB 3: SERVICES DIRECTORY */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Services Directory" 
              description="Browse and hire certified experts across development, design, copy or marketing fields. Hire with secure escrow safeguards."
              badge="Services Index"
            />

            {/* Simulated API States for Services */}
            {loadingServices ? (
              <LoadingSkeleton type="grid" />
            ) : servicesError ? (
              <EmptyState
                type="error"
                title="Failed to Load Services"
                description="Simulated network failure is active. Click retry to recover."
                onRetry={() => {
                  setSimulateServiceFail(false);
                  loadServices(false);
                }}
                retryLabel="Retry API Load"
              />
            ) : filteredServices.length === 0 ? (
              <EmptyState
                title="No Matching Services Found"
                description={`We couldn't find any professional service listings for "${searchQuery}".`}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onRequestService={openChatForService}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MERCHANT PROFILE (MY STORE) */}
        {activeTab === 'profile' && (
          <ProfileStoreManager
            products={productsList}
            services={servicesList}
            onAddProduct={handleAddProduct}
            onAddService={handleAddService}
          />
        )}

      </main>

      {/* Responsive bottom mobile layout navigation bars */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}
