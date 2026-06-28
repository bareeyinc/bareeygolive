/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Briefcase, MessageSquare, User, Search, Filter, 
  MapPin, AlertCircle, RefreshCw, Sparkles, ChevronRight, ShieldAlert 
} from 'lucide-react';

import { Product, Service, Chat, Message } from './types';
import { fetchProductsSimulated } from './lib/api/products';
import { fetchServicesSimulated } from './lib/api/services';

// Components
import Navbar from './lib/components/Navbar';
import BottomNavigation from './lib/components/BottomNavigation';
import HeroBanner from './lib/components/HeroBanner';
import LoadingSkeleton from './lib/components/LoadingSkeleton';
import EmptyState from './lib/components/EmptyState';
import SectionHeader from './lib/components/SectionHeader';
import ProductCard from './lib/components/ProductCard';
import ServiceCard from './lib/components/ServiceCard';
import { ChatCategoryCard, ChatThreadRow } from './lib/components/ChatPreviewCard';
import ChatWorkspace from './lib/components/ChatWorkspace';
import ProfileStoreManager from './lib/components/ProfileStoreManager';
import MarketplaceFeatures from './lib/components/MarketplaceFeatureCard';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'chats' | 'profile'>('products');
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  // Loading & Error States
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [errorServices, setErrorServices] = useState<string | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('all');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  // Chats States
  const [activeChatCategory, setActiveChatCategory] = useState<'customer' | 'service' | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  
  // Seeding initial chats
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "chat-seed-1",
      otherUserId: "user-buyer-john",
      otherUserName: "John Okafor",
      targetId: "6a38903e9b6a52edf110a583", // cake
      targetTitle: "Double Chocolate Celebration Cake",
      targetType: 'product',
      targetPrice: "₦45,000",
      category: 'customer', //John wants to buy from me (Deeni Buba)
      lastMessageText: "I've uploaded the delivery confirmation address. Please dispatch the courier.",
      lastMessageTime: "2 hours ago",
      unread: true,
      status: 'shipped',
      messages: [
        {
          id: "m1",
          senderId: "user-buyer-john",
          senderName: "John Okafor",
          text: "Hi, I'm ordering this chocolate cake for my daughter's birthday this Saturday. Is it available for delivery to Adamawa?",
          timestamp: "Yesterday"
        },
        {
          id: "m2",
          senderId: "me",
          senderName: "Deeni Buba",
          text: "Hello! Yes absolutely. We make them fresh and dispatch via priority temperature-controlled courier so it arrives perfectly fluffy.",
          timestamp: "Yesterday"
        },
        {
          id: "m3",
          senderId: "user-buyer-john",
          senderName: "John Okafor",
          text: "Wonderful, payment is secure in Bareey escrow now. Please proceed.",
          timestamp: "Yesterday"
        },
        {
          id: "m4",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Buyer deposited payment into Bareey Escrow. Funds are safely secured!",
          timestamp: "Yesterday"
        },
        {
          id: "m5",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Seller has marked item as shipped. Dynamic shipping tracking initialized.",
          timestamp: "2 hours ago"
        },
        {
          id: "m6",
          senderId: "user-buyer-john",
          senderName: "John Okafor",
          text: "I've uploaded the delivery confirmation address. Please dispatch the courier.",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      id: "chat-seed-2",
      otherUserId: "user-buyer-amina",
      otherUserName: "Amina Bello",
      targetId: "6a2ae13356a9c476cac3fefe", // ux audit
      targetTitle: "Heuristic UX Audit Service",
      targetType: 'service',
      targetPrice: "Bargain",
      category: 'customer', // Amina wants to hire me
      lastMessageText: "Sure, let's schedule a brief chat once you deposit escrow.",
      lastMessageTime: "5 mins ago",
      unread: false,
      status: 'pending',
      messages: [
        {
          id: "am1",
          senderId: "user-buyer-amina",
          senderName: "Amina Bello",
          text: "Hi Deeni! I saw your UX Audit portfolio and I'd love a professional audit of our fintech app. Can you do a 15-page teardown?",
          timestamp: "30 mins ago"
        },
        {
          id: "am2",
          senderId: "me",
          senderName: "Deeni Buba",
          text: "Hello Amina! Yes, I specialize in identifying micro-interaction friction and user leakage points. Let's do a complete breakdown.",
          timestamp: "15 mins ago"
        },
        {
          id: "am3",
          senderId: "user-buyer-amina",
          senderName: "Amina Bello",
          text: "Amazing, let's start with a budget of NGN 120,000. Let me know once you are ready.",
          timestamp: "5 mins ago"
        }
      ]
    },
    {
      id: "chat-seed-3",
      otherUserId: "6a25a3b3bd244dc51ebff677", // Bareey Dev
      otherUserName: "Bareey Services Tech",
      targetId: "6a2ae13356a9c476cac3feeb", // dev
      targetTitle: "Full-Stack Web Development Service",
      targetType: 'service',
      targetPrice: "Bargain",
      category: 'service', // I requested from someone
      lastMessageText: "The repository scaffolding is complete. I'm preparing the database integration.",
      lastMessageTime: "Yesterday",
      unread: false,
      status: 'preparing',
      messages: [
        {
          id: "bm1",
          senderId: "me",
          senderName: "Deeni Buba",
          text: "Hi! I need a high-performance marketplace MVP built using React, TypeScript, and TailwindCSS.",
          timestamp: "2 days ago"
        },
        {
          id: "bm2",
          senderId: "6a25a3b3bd244dc51ebff677",
          senderName: "Bareey Services Tech",
          text: "Hi Deeni! I can absolutely deliver a premium, fast mobile-first platform. Let's setup secure escrow and start.",
          timestamp: "2 days ago"
        },
        {
          id: "bm3",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Buyer deposited payment into Bareey Escrow. Funds are safely secured!",
          timestamp: "Yesterday"
        },
        {
          id: "bm4",
          senderId: "6a25a3b3bd244dc51ebff677",
          senderName: "Bareey Services Tech",
          text: "The repository scaffolding is complete. I'm preparing the database integration.",
          timestamp: "Yesterday"
        }
      ]
    },
    {
      id: "chat-seed-4",
      otherUserId: "user-seller-design",
      otherUserName: "Elite Design Lab",
      targetId: "6a2ae13356a9c476cac3feec", // logo
      targetTitle: "Elite Brand Identity & Logo",
      targetType: 'service',
      targetPrice: "Fixed Rate",
      category: 'service', // I requested logo design from them
      lastMessageText: "Thank you for the five-star rating! Good luck with the Bareey startup launching!",
      lastMessageTime: "4 days ago",
      unread: false,
      status: 'completed',
      messages: [
        {
          id: "dm1",
          senderId: "me",
          senderName: "Deeni Buba",
          text: "Hello! I need a minimal, modern brand guidelines document and logo designed.",
          timestamp: "5 days ago"
        },
        {
          id: "dm2",
          senderId: "user-seller-design",
          senderName: "Elite Design Lab",
          text: "Excellent. I will provide 3 high-fidelity concepts in 2 days. Secure escrow and let's go.",
          timestamp: "5 days ago"
        },
        {
          id: "dm3",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Buyer deposited payment into Bareey Escrow. Funds are safely secured!",
          timestamp: "5 days ago"
        },
        {
          id: "dm4",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Seller has marked item as shipped. Dynamic shipping tracking initialized.",
          timestamp: "4 days ago"
        },
        {
          id: "dm5",
          senderId: "me",
          senderName: "Deeni Buba",
          text: "This looks stunning! Everything is beautifully vectorized. Confirming release now.",
          timestamp: "4 days ago"
        },
        {
          id: "dm6",
          senderId: "system",
          senderName: "Bareey Escrow",
          text: "Buyer confirmed delivery. Funds are safely released from escrow back to the seller!",
          timestamp: "4 days ago"
        },
        {
          id: "dm7",
          senderId: "user-seller-design",
          senderName: "Elite Design Lab",
          text: "Thank you for the five-star rating! Good luck with the Bareey startup launching!",
          timestamp: "4 days ago"
        }
      ]
    }
  ]);

  // Fetch Products & Services
  const loadMarketplaceData = async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const prods = await fetchProductsSimulated(false);
      setProducts(prods);
    } catch (err: any) {
      setErrorProducts(err.message || "Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadServicesData = async () => {
    setLoadingServices(true);
    setErrorServices(null);
    try {
      const servs = await fetchServicesSimulated(false);
      setServices(servs);
    } catch (err: any) {
      setErrorServices(err.message || "Failed to load services");
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    loadMarketplaceData();
    loadServicesData();
  }, []);

  // Filter products based on search & category
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedProductCategory === 'all' || p.category === selectedProductCategory;
    return matchesSearch && matchesCategory;
  });

  // Filter services based on search, category & state
  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedServiceCategory === 'all' || s.categoryKey === selectedServiceCategory;
    const matchesState = selectedState === 'all' || s.state.toLowerCase() === selectedState.toLowerCase();
    return matchesSearch && matchesCategory && matchesState;
  });

  // Unique list of states from mockServices
  const serviceStates = ['all', ...Array.from(new Set(services.map(s => s.state)))];

  // Initiate Chat when requesting service
  const handleRequestServiceChat = (service: Service) => {
    // Check if chat already exists for this service
    const existingChat = chats.find(c => c.targetId === service._id && c.category === 'service');
    
    if (existingChat) {
      setSelectedChat(existingChat);
      setActiveChatCategory('service');
      setActiveTab('chats');
      return;
    }

    // Create a new chat thread
    const newChat: Chat = {
      id: `chat-custom-${Date.now()}`,
      otherUserId: service.usersid,
      otherUserName: service.name.split(' ').slice(0, 2).join(' ') + " Specialist",
      targetId: service._id,
      targetTitle: service.name,
      targetType: 'service',
      targetPrice: service.pricing.bargain ? 'Bargain' : 'Fixed Rate',
      category: 'service', // I requested this service
      lastMessageText: `Hi! I want to request your service: "${service.name}". Let's discuss requirements.`,
      lastMessageTime: "Just now",
      unread: false,
      status: 'pending',
      messages: [
        {
          id: `msg-first-${Date.now()}`,
          senderId: 'me',
          senderName: 'Deeni Buba',
          text: `Hi! I am interested in your listed service: "${service.name}". Let's discuss the delivery terms and secure escrow.`,
          timestamp: 'Just now'
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat);
    setActiveChatCategory('service');
    setActiveTab('chats');
  };

  // Initiate Chat when buying product
  const handleBuyProductChat = (product: Product) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.targetId === product._id && c.category === 'service');

    if (existingChat) {
      setSelectedChat(existingChat);
      setActiveChatCategory('service');
      setActiveTab('chats');
      return;
    }

    const priceFormatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(product.theprices[0]);

    const newChat: Chat = {
      id: `chat-custom-${Date.now()}`,
      otherUserId: product.usersid,
      otherUserName: product.shopinformation.title.split(' ').slice(0, 2).join(' ') + " Merchant",
      targetId: product._id,
      targetTitle: product.title,
      targetType: 'product',
      targetPrice: priceFormatted,
      category: 'service', // I am buying from them
      lastMessageText: `Hello! I would like to buy your product: "${product.title}" for ${priceFormatted}.`,
      lastMessageTime: "Just now",
      unread: false,
      status: 'pending',
      messages: [
        {
          id: `msg-first-${Date.now()}`,
          senderId: 'me',
          senderName: 'Deeni Buba',
          text: `Hello! I would like to purchase your product: "${product.title}" for ${priceFormatted}. Please let me know if it's ready for immediate shipping.`,
          timestamp: 'Just now'
        }
      ]
    };

    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat);
    setActiveChatCategory('service');
    setActiveTab('chats');
  };

  // Update Chat state inside general state
  const handleUpdateChatStatus = (chatId: string, status: Chat['status'], updatedMessages: Message[]) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          status,
          messages: updatedMessages,
          lastMessageText: updatedMessages[updatedMessages.length - 1]?.text || chat.lastMessageText,
          lastMessageTime: "Just now",
          unread: false
        };
      }
      return chat;
    }));

    // Keep active workspace synchronized
    if (selectedChat?.id === chatId) {
      setSelectedChat(prev => prev ? {
        ...prev,
        status,
        messages: updatedMessages,
        lastMessageText: updatedMessages[updatedMessages.length - 1]?.text || prev.lastMessageText,
        unread: false
      } : null);
    }
  };

  // Add Product dynamically to listing (Profile screen trigger)
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setActiveTab('products'); // redirect to marketplace to show it!
  };

  // Add Service dynamically
  const handleAddService = (newService: Service) => {
    setServices(prev => [newService, ...prev]);
    setActiveTab('services'); // redirect to show it!
  };

  // Chats selectors filtering counts
  const unreadCustomerCount = chats.filter(c => c.category === 'customer' && c.unread).length;
  const unreadServiceCount = chats.filter(c => c.category === 'service' && c.unread).length;

  const currentCategoryChats = chats.filter(c => c.category === activeChatCategory);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-sans flex flex-col pb-24 md:pb-0 selection:bg-black selection:text-white relative overflow-x-hidden">
      {/* Mesh background glows */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/15 rounded-full blur-[110px]" />
        <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-amber-200/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[450px] h-[450px] bg-orange-100/15 rounded-full blur-[100px]" />
      </div>

      {/* Global Navbar */}
      <div className="relative z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Hero section visible on home screen (Products / Services pages) */}
      {activeTab === 'products' && searchQuery === '' && (
        <div className="relative z-10">
          <HeroBanner 
            onExploreProducts={() => {
              const el = document.getElementById('market-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} 
            onExploreServices={() => setActiveTab('services')} 
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
        <AnimatePresence mode="wait">
          
          {/* 1. PRODUCTS (MARKETPLACE) TAB */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
              id="market-grid"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <SectionHeader 
                  badge="Bareey Marketplace"
                  title="Featured Products" 
                  description="Securely trade gadgets, baking delights, luxury footwear and local delicacies under a solid Escrow guarantee."
                />

                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
                  {/* Search box */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search physical products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-orange-400 transition-all text-gray-900 shadow-2xs"
                    />
                  </div>

                  {/* Category Selection Filter pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0">
                    {['all', 'electronics', 'fashion', 'home', 'food'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedProductCategory(cat)}
                        className={`px-4 py-2.5 text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer backdrop-blur-xs ${
                          selectedProductCategory === cat
                            ? 'bg-black text-white shadow-xs'
                            : 'bg-white/60 border border-white/40 text-gray-500 hover:text-black hover:bg-white/90'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid loading / errors or products list */}
              {loadingProducts ? (
                <LoadingSkeleton type="list" />
              ) : errorProducts ? (
                <EmptyState 
                  type="error"
                  title="Oops! Loading failed" 
                  description={errorProducts} 
                  onRetry={loadMarketplaceData}
                />
              ) : filteredProducts.length === 0 ? (
                <EmptyState 
                  title="No products found" 
                  description="We couldn't find any products matching your query or selected category. Try exploring another catalog!"
                  onRetry={() => { setSearchQuery(''); setSelectedProductCategory('all'); }}
                  retryLabel="Reset Filters"
                />
              ) : (
                <div className="relative">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block mb-3">
                    Showing {filteredProducts.length} items
                  </span>
                  
                  {/* Horizontally scrollable list */}
                  <div className="flex gap-6 overflow-x-auto pb-6 pt-1 px-1 scrollbar-thin scrollbar-thumb-gray-200">
                    {filteredProducts.map((prod) => (
                      <ProductCard 
                        key={prod._id} 
                        product={prod} 
                        onOpenChat={handleBuyProductChat}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Features Visually */}
              <MarketplaceFeatures />
            </motion.div>
          )}

          {/* 2. SERVICES TAB */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <SectionHeader 
                  badge="Services Platform"
                  title="Hire Top Talent" 
                  description="Browse experienced professionals in Programming, UI/UX, AI pipelines, Copywriting, Video Editing and Legal setups."
                />

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-2xl">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search expertise or skill..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-hidden focus:border-orange-400 transition-all text-gray-900 shadow-2xs"
                    />
                  </div>

                  {/* Category Key filters */}
                  <select
                    value={selectedServiceCategory}
                    onChange={(e) => setSelectedServiceCategory(e.target.value)}
                    className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-hidden focus:border-orange-400 transition-all cursor-pointer text-gray-700 shadow-2xs"
                  >
                    <option value="all">All Specialties</option>
                    <option value="tech_digital">Programming</option>
                    <option value="design">Graphic Design</option>
                    <option value="uiux">UI/UX Design</option>
                    <option value="ai_ml">AI & Data Science</option>
                    <option value="marketing">Marketing</option>
                    <option value="video_photo">Video & Photo</option>
                    <option value="writing">Writing & Copy</option>
                    <option value="finance_biz">Business & Finance</option>
                  </select>

                  {/* State Filters */}
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider focus:outline-hidden focus:border-orange-400 transition-all cursor-pointer text-gray-700 shadow-2xs"
                  >
                    <option value="all">Every State</option>
                    {serviceStates.filter(s => s !== 'all').map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service listings container */}
              {loadingServices ? (
                <LoadingSkeleton type="grid" />
              ) : errorServices ? (
                <EmptyState 
                  type="error"
                  title="Could not fetch services" 
                  description={errorServices} 
                  onRetry={loadServicesData}
                />
              ) : filteredServices.length === 0 ? (
                <EmptyState 
                  title="No professional services found" 
                  description="Try adjusting your filters, state region, or query to discover talented experts."
                  onRetry={() => { setSearchQuery(''); setSelectedServiceCategory('all'); setSelectedState('all'); }}
                  retryLabel="Reset Filters"
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map((service) => (
                    <ServiceCard 
                      key={service._id} 
                      service={service} 
                      onRequestService={handleRequestServiceChat}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 3. CHATS SYSTEM TAB */}
          {activeTab === 'chats' && (
            <motion.div
              key="chats"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              {selectedChat ? (
                /* Dynamic Workspace Chat window is active */
                <ChatWorkspace 
                  chat={selectedChat} 
                  onBack={() => setSelectedChat(null)} 
                  onUpdateChatStatus={handleUpdateChatStatus}
                />
              ) : activeChatCategory ? (
                /* Chat threads list is visible for category (Customers or Services) */
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveChatCategory(null)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      ← Categories
                    </button>
                    <h3 className="text-xl font-extrabold text-gray-950 capitalize">
                      {activeChatCategory === 'customer' ? 'My Customer Conversations' : 'My Service Requests'}
                    </h3>
                  </div>

                  {currentCategoryChats.length === 0 ? (
                    <div className="p-12 text-center bg-gray-50 border border-gray-100 rounded-3xl">
                      <p className="text-sm font-semibold text-gray-500">No conversations in this section yet</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activeChatCategory === 'customer' 
                          ? 'When users request your service or buy items, chats appear here.'
                          : 'Request services or products to initiate secure chats with sellers.'
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {currentCategoryChats.map((c) => (
                        <ChatThreadRow 
                          key={c.id} 
                          chat={c} 
                          onClick={() => setSelectedChat(c)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Category Selection Overview (Customers vs. Services) */
                <div className="space-y-8">
                  <SectionHeader 
                    badge="Bareey Conversations"
                    title="Choose Inbox Workspace" 
                    description="Bareey separates your chats cleanly into Customer Requests (where you sell) and Service Requests (where you hire)."
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChatCategoryCard 
                      title="Customers"
                      description="When customers request your service, you will see their conversations here."
                      type="customer"
                      count={unreadCustomerCount}
                      onClick={() => setActiveChatCategory('customer')}
                    />

                    <ChatCategoryCard 
                      title="Services & Orders"
                      description="When you request a service from someone, those conversations appear here."
                      type="service"
                      count={unreadServiceCount}
                      onClick={() => setActiveChatCategory('service')}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* 4. PROFILE (STORE MANAGER) TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ProfileStoreManager 
                products={products} 
                services={services} 
                onAddProduct={handleAddProduct}
                onAddService={handleAddService}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation for Mobile */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
