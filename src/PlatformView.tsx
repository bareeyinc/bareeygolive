/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, ChevronRight, ShieldCheck, Sparkles, Plus, Eye, MapPin, 
  ArrowLeft, ArrowRight, ShoppingBag, Briefcase, Mail
} from 'lucide-react';

import Navbar from './lib/components/Navbar';
import BottomNavigation from './lib/components/BottomNavigation';
import HeroBanner from './lib/components/HeroBanner';
import ProductCard from './lib/components/ProductCard';
import ServiceCard from './lib/components/ServiceCard';
import ChatWorkspace from './lib/components/ChatWorkspace';
import { ChatCategoryCard, ChatThreadRow } from './lib/components/ChatPreviewCard';
import ProfileStoreManager from './lib/components/ProfileStoreManager';

import { mockProducts, getProductImage } from './lib/api/products';
import { mockServices, getServiceImage } from './lib/api/services';
import { Product, Service, Chat, Message } from './types';

interface PlatformViewProps {
  BAREEY_PLAYSTORE_URL: string;
  onBackToMarketing: () => void;
}

export default function PlatformView({ BAREEY_PLAYSTORE_URL, onBackToMarketing }: PlatformViewProps) {
  const [platformTab, setPlatformTab] = useState<'products' | 'chats' | 'services' | 'profile'>('products');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [services, setServices] = useState<Service[]>(mockServices);
  
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [selectedChatCategory, setSelectedChatCategory] = useState<'customer' | 'service' | null>(null);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Initial Platform Chats
  const [platformChats, setPlatformChats] = useState<Chat[]>([
    {
      id: "chat-p1",
      otherUserId: "6a25a3b3bd244dc51ebff678",
      otherUserName: "John Okafor",
      otherUserAvatar: "J",
      targetId: "6a38903e9b6a52edf110a584",
      targetTitle: 'MacBook Pro 14" M3 Max',
      targetType: 'product',
      targetPrice: "₦3,200,000",
      category: 'customer', // customer is buying this from me
      lastMessageText: "I've reviewed the specs. Could you secure this on Bareey escrow now?",
      lastMessageTime: "10 min ago",
      unread: true,
      status: 'pending',
      messages: [
        { id: "m1", senderId: "6a25a3b3bd244dc51ebff678", senderName: "John Okafor", text: "Hello! Is this MacBook Pro 14\" M3 Max still available for instant courier delivery?", timestamp: "30 min ago" },
        { id: "m2", senderId: "me", senderName: "Me", text: "Yes, John! It is ready to ship. We can deliver to Lagos in under 24 hours.", timestamp: "20 min ago" },
        { id: "m3", senderId: "6a25a3b3bd244dc51ebff678", senderName: "John Okafor", text: "Awesome. I've reviewed the specs. Could you secure this on Bareey escrow now?", timestamp: "10 min ago" }
      ]
    },
    {
      id: "chat-p2",
      otherUserId: "6a25a3b3bd244dc51ebff679",
      otherUserName: "Amina Bello",
      otherUserAvatar: "A",
      targetId: "6a2ae13356a9c476cac3feec",
      targetTitle: 'Elite Brand Identity & Logo Design',
      targetType: 'service',
      targetPrice: "Bargain",
      category: 'service', // I am requesting this service from Amina
      lastMessageText: "Our brand guidelines are attached. Let's start the escrow hold.",
      lastMessageTime: "2 hours ago",
      unread: false,
      status: 'preparing',
      messages: [
        { id: "m4", senderId: "me", senderName: "Me", text: "Hi Amina, I need a modern logo design for my new secure fintech startup.", timestamp: "4 hours ago" },
        { id: "m5", senderId: "6a25a3b3bd244dc51ebff679", senderName: "Amina Bello", text: "I can absolutely do that. I've done branding for 12 other Nigerian fintechs. Let's set a ₦150,000 milestone escrow.", timestamp: "3 hours ago" },
        { id: "m6", senderId: "me", senderName: "Me", text: "Excellent, I've just funded the escrow. Our brand guidelines are attached. Let's start the escrow hold.", timestamp: "2 hours ago" },
        { id: "ms1", senderId: "system", senderName: "Bareey Escrow", text: "Escrow funds of ₦150,000 successfully deposited. Amina Bello is authorized to deliver guidelines.", timestamp: "2 hours ago" }
      ]
    }
  ]);

  // Open Product Chat Trigger
  const handleOpenProductChat = (product: Product) => {
    const existing = platformChats.find(c => c.targetId === product._id);
    if (existing) {
      setActiveChatId(existing.id);
      setPlatformTab('chats');
    } else {
      const newChatId = `chat-new-${Date.now()}`;
      const newChat: Chat = {
        id: newChatId,
        otherUserId: product.usersid,
        otherUserName: product.shopinformation.title || "Vendor Partner",
        targetId: product._id,
        targetTitle: product.title,
        targetType: 'product',
        targetPrice: `₦${product.theprices[0].toLocaleString()}`,
        category: 'service', // I requested this product
        lastMessageText: `Hi! I'm interested in buying your ${product.title}.`,
        lastMessageTime: "Just now",
        unread: false,
        status: 'pending',
        messages: [
          {
            id: `m-init-${Date.now()}`,
            senderId: "me",
            senderName: "Me",
            text: `Hi! I'm interested in buying your ${product.title} with secure Bareey Escrow protection.`,
            timestamp: "Just now"
          }
        ]
      };
      setPlatformChats([newChat, ...platformChats]);
      setActiveChatId(newChatId);
      setPlatformTab('chats');
    }
  };

  // Open Service Chat Trigger
  const handleOpenServiceChat = (service: Service) => {
    const existing = platformChats.find(c => c.targetId === service._id);
    if (existing) {
      setActiveChatId(existing.id);
      setPlatformTab('chats');
    } else {
      const newChatId = `chat-new-${Date.now()}`;
      const newChat: Chat = {
        id: newChatId,
        otherUserId: service.usersid,
        otherUserName: service.name || "Service Provider",
        targetId: service._id,
        targetTitle: service.name,
        targetType: 'service',
        targetPrice: service.pricing.bargain ? "Bargain" : "Fixed Rate",
        category: 'service', // I requested this service
        lastMessageText: `Hi! I'd like to hire you for "${service.name}".`,
        lastMessageTime: "Just now",
        unread: false,
        status: 'pending',
        messages: [
          {
            id: `m-init-${Date.now()}`,
            senderId: "me",
            senderName: "Me",
            text: `Hi! I'd like to request your service: "${service.name}". Let's discuss terms and establish a secure escrow.`,
            timestamp: "Just now"
          }
        ]
      };
      setPlatformChats([newChat, ...platformChats]);
      setActiveChatId(newChatId);
      setPlatformTab('chats');
    }
  };

  // Chat Status & Message Updater
  const handleUpdatePlatformChat = (chatId: string, status: Chat['status'], messages: Message[]) => {
    setPlatformChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          status,
          messages,
          lastMessageText: messages[messages.length - 1]?.text || c.lastMessageText,
          lastMessageTime: "Just now"
        };
      }
      return c;
    }));
  };

  // Listed Items persistence additions
  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleAddService = (newService: Service) => {
    setServices([newService, ...services]);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      
      {/* Platform Header Navigation */}
      <Navbar 
        activeTab={platformTab} 
        setActiveTab={(tab) => {
          setPlatformTab(tab);
          setActiveChatId(null);
        }} 
        userEmail="deenibuba@gmail.com" 
      />

      {/* Play Store Download Sticky Banner */}
      <div className="bg-orange-500 text-white px-4 py-3 text-center z-10 shadow-xs">
        <p className="text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="bg-white text-orange-600 font-black text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Official Mobile App</span>
          <span>Bareey Escrow is now live on Google Play! Experience instant on-the-go notifications and secure native biometric settlements.</span>
          <a 
            href={BAREEY_PLAYSTORE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline text-white hover:text-orange-100 font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
          >
            Get it on Android <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>

      {/* Top action control to return back to marketing */}
      <div className="bg-white border-b border-gray-100 px-4 py-2 flex justify-between items-center text-xs">
        <button 
          onClick={onBackToMarketing}
          className="flex items-center gap-1.5 text-gray-500 hover:text-black font-semibold cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketing & Simulator
        </button>
        <span className="text-gray-400 font-mono">MVP Platform Session Status: Active</span>
      </div>

      {/* Main Container */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-12">
        <AnimatePresence mode="wait">
          {platformTab === 'products' && (
            <motion.div
              key="products-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-8"
            >
              {/* Custom Hero section inside marketplace */}
              <HeroBanner 
                onExploreProducts={() => {}} 
                onExploreServices={() => setPlatformTab('services')} 
              />

              {/* Products List section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Marketplace Listings</h2>
                    <p className="text-xs text-gray-500">Shop premium, verified products with transparent escrow protection</p>
                  </div>
                  <span className="px-3 py-1 bg-white border border-gray-100 text-gray-600 rounded-lg text-xs font-semibold shadow-2xs">
                    {products.length} Products listed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard 
                      key={p._id}
                      product={p}
                      onOpenChat={handleOpenProductChat}
                      onViewDetails={setSelectedProduct}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {platformTab === 'services' && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Professional Services</h2>
                <p className="text-sm text-gray-500">Hire elite freelancers, consultants, and contractors safely under escrow supervision</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s) => (
                  <ServiceCard 
                    key={s._id}
                    service={s}
                    onRequestService={handleOpenServiceChat}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {platformTab === 'chats' && (
            <motion.div
              key="chats-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {activeChatId ? (
                <div className="lg:col-span-12">
                  {(() => {
                    const activeChat = platformChats.find(c => c.id === activeChatId);
                    if (!activeChat) return null;
                    return (
                      <ChatWorkspace 
                        chat={activeChat}
                        onBack={() => setActiveChatId(null)}
                        onUpdateChatStatus={handleUpdatePlatformChat}
                      />
                    );
                  })()}
                </div>
              ) : (
                <div className="lg:col-span-12 space-y-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Secure Chats Workspace</h2>
                    <p className="text-sm text-gray-500">Secure conversation channels isolated by buyer and seller requirements</p>
                  </div>

                  {/* Dual Isolated Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChatCategoryCard 
                      title="Customer Conversations"
                      description="Review agreements and manage escrows when buyers purchase your listed goods or hire your services."
                      type="customer"
                      count={platformChats.filter(c => c.category === 'customer' && c.unread).length}
                      onClick={() => setSelectedChatCategory('customer')}
                    />

                    <ChatCategoryCard 
                      title="Service Provider Orders"
                      description="Track deliveries, discuss terms, and release secure payouts to sellers you are buying from."
                      type="service"
                      count={platformChats.filter(c => c.category === 'service' && c.unread).length}
                      onClick={() => setSelectedChatCategory('service')}
                    />
                  </div>

                  {/* Filtered Thread List */}
                  {selectedChatCategory && (
                    <div className="space-y-4 pt-6 border-t border-gray-150">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-gray-900 uppercase tracking-widest text-[11px]">
                          {selectedChatCategory === 'customer' ? 'Customer Conversations' : 'Service Provider Orders'}
                        </h3>
                        <button 
                          onClick={() => setSelectedChatCategory(null)}
                          className="text-xs text-orange-600 hover:text-black font-extrabold cursor-pointer transition-colors"
                        >
                          Clear Filter ×
                        </button>
                      </div>

                      {platformChats.filter(c => c.category === selectedChatCategory).length === 0 ? (
                        <div className="py-12 text-center bg-white border border-gray-100 rounded-3xl">
                          <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-gray-500">No chats in this category yet</p>
                          <p className="text-xs text-gray-400 mt-1">Chat records are initialized when transactions or contract requests begin.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {platformChats
                            .filter(c => c.category === selectedChatCategory)
                            .map((chat) => (
                              <ChatThreadRow 
                                key={chat.id}
                                chat={chat}
                                onClick={() => {
                                  setPlatformChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false } : c));
                                  setActiveChatId(chat.id);
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {platformTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
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

      {/* Persistent Bottom Mobile Navigation Tab Rail */}
      <BottomNavigation 
        activeTab={platformTab} 
        setActiveTab={(tab) => {
          setPlatformTab(tab);
          setActiveChatId(null);
        }} 
      />

      {/* Product Details Dialog Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 border border-gray-100"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <img 
                    src={getProductImage(selectedProduct._id)} 
                    alt={selectedProduct.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block mb-1">
                      {selectedProduct.category} • {selectedProduct.shopinformation.condition}
                    </span>
                    <h3 className="text-2xl font-black text-gray-950 leading-tight">
                      {selectedProduct.title}
                    </h3>
                  </div>

                  <p className="text-2xl font-black text-orange-600">
                    ₦{selectedProduct.theprices[0].toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-2 border-t border-gray-50 pt-4 text-xs font-semibold text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Est. Delivery:</span>
                      <span>{selectedProduct.delivery_time.days} {selectedProduct.delivery_time.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Liability Policy:</span>
                      <span>Buyer Protection Rules Apply</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      handleOpenProductChat(selectedProduct);
                    }}
                    className="w-full py-3 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Secure with Escrow (Chat Now)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Service Details Dialog Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8 border border-gray-100"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="aspect-video sm:aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  <img 
                    src={getServiceImage(selectedService._id)} 
                    alt={selectedService.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block mb-1">
                      {selectedService.categoryLabel}
                    </span>
                    <h3 className="text-2xl font-black text-gray-950 leading-tight">
                      {selectedService.name}
                    </h3>
                  </div>

                  <p className="text-xs text-orange-600 font-bold bg-orange-50 inline-block px-3 py-1 rounded-lg border border-orange-100">
                    {selectedService.pricing.bargain ? 'Open for Budget Bidding' : 'Fixed Rates Apply'}
                  </p>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {selectedService.description}
                  </p>

                  <div className="space-y-2 border-t border-gray-50 pt-4 text-xs font-semibold text-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Location:</span>
                      <span>{selectedService.lga}, {selectedService.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[9px]">Views:</span>
                      <span>{selectedService.views} views</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedService(null);
                      handleOpenServiceChat(selectedService);
                    }}
                    className="w-full py-3 bg-black hover:bg-gray-900 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Request Service (Chat Now)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
