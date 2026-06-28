/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, MapPin, Briefcase, ShoppingBag, Plus, DollarSign, 
  ShieldCheck, ArrowUpRight, X, AlertCircle, FileText 
} from 'lucide-react';
import { Product, Service } from '../../types';

interface ProfileStoreManagerProps {
  products: Product[];
  services: Service[];
  onAddProduct: (product: Product) => void;
  onAddService: (service: Service) => void;
}

export default function ProfileStoreManager({ 
  products, 
  services, 
  onAddProduct, 
  onAddService 
}: ProfileStoreManagerProps) {
  const [showAddModal, setShowAddModal] = useState<'product' | 'service' | null>(null);
  
  // New Product form state
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('electronics');
  const [prodSub, setProdSub] = useState('phones-tablets');
  const [prodCondition, setProdCondition] = useState('new');
  const [prodDesc, setProdDesc] = useState('');
  const [prodDays, setProdDays] = useState('2');

  // New Service form state
  const [servName, setServName] = useState('');
  const [servTagline, setServTagline] = useState('');
  const [servDesc, setServDesc] = useState('');
  const [servState, setServState] = useState('Lagos');
  const [servLGA, setServLGA] = useState('Ikeja');
  const [servCategory, setServCategory] = useState('tech_digital');
  const [servSub1, setServSub1] = useState('');

  // Local user metrics
  const userProducts = products.filter(p => p.usersid === "6a25a3b3bd244dc51ebff677");
  const userServices = services.filter(s => s.usersid === "6a25a3b3bd244dc51ebff677");

  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice || !prodDesc) return;

    const newProduct: Product = {
      _id: `prod-added-${Date.now()}`,
      likes: 0,
      bookmarks: 0,
      subcategory: prodSub,
      shopinformation: {
        description: prodDesc,
        title: prodTitle,
        condition: prodCondition
      },
      shopid: "6a2ad63a56a9c476cac3fee7",
      productslength: 1,
      comments: 0,
      shares: 0,
      country: "NG",
      theprices: [Number(prodPrice)],
      shiptocountries: ["NGN"],
      description: prodDesc,
      usersid: "6a25a3b3bd244dc51ebff677", // matching user id
      availability_type: "ready",
      catalog: "added-cat-uuid",
      title: prodTitle,
      delivery: {
        Nigeria: {
          Lagos: 2000
        }
      },
      files: {
        "marketplace/added-file.jpeg": {
          price: Number(prodPrice)
        }
      },
      views: 1,
      category: prodCategory,
      delivery_time: {
        duration: "days",
        days: Number(prodDays)
      }
    };

    onAddProduct(newProduct);
    setShowAddModal(null);
    // Reset
    setProdTitle('');
    setProdPrice('');
    setProdDesc('');
  };

  const handleCreateService = (e: FormEvent) => {
    e.preventDefault();
    if (!servName || !servTagline || !servDesc) return;

    const newService: Service = {
      _id: `serv-added-${Date.now()}`,
      views: 1,
      usersid: "6a25a3b3bd244dc51ebff677", // matching user id
      categoryKey: servCategory,
      categoryLabel: servCategory === 'tech_digital' ? 'Programming & Tech' : 'Design & Creative',
      categoryTagline: servTagline,
      lga: servLGA,
      description: servDesc,
      name: servName,
      subcategories: [servSub1 || 'General Service'],
      files: ["servicesample/added.jpeg"],
      type: "bargain",
      state: servState,
      posts: 0,
      pricing: {
        bargain: true
      }
    };

    onAddService(newService);
    setShowAddModal(null);
    // Reset
    setServName('');
    setServTagline('');
    setServDesc('');
    setServSub1('');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Profile Overview Card */}
      <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-black text-white text-2xl font-black flex items-center justify-center shadow-md">
            DB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-gray-950">Deeni Buba</h2>
              <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-lg border border-green-100">
                Verified Merchant
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-300" />
                deenibuba@gmail.com
              </span>
              <span className="hidden sm:inline text-gray-200">|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-300" />
                Kaduna, Nigeria (NG)
              </span>
            </div>
          </div>
        </div>

        {/* Financial Escrow Balances */}
        <div className="bg-white/50 backdrop-blur-xs border border-white/40 p-4 rounded-2xl w-full md:w-auto flex items-center justify-between gap-8 shadow-2xs">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Escrow Wallet Balance
            </span>
            <span className="text-2xl font-black text-orange-600">
              ₦285,000
            </span>
          </div>
          
          <div className="flex flex-col gap-1 text-right">
            <span className="text-[9px] text-green-600 font-bold bg-green-50 border border-green-100 px-2 py-0.5 rounded-sm uppercase tracking-wide inline-block">
              ₦150,000 Pending Release
            </span>
            <span className="text-[9px] text-gray-400 font-bold uppercase block mt-0.5">
              Escrow Safeguard Active
            </span>
          </div>
        </div>
      </div>

      {/* Main Merchant Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* PRODUCTS SECTION */}
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gray-50 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">My Listed Products</h3>
                <p className="text-xs text-gray-400">Manage items you are selling in the Marketplace</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal('product')}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Product
            </button>
          </div>

          {userProducts.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-500">No products listed yet</p>
              <p className="text-xs text-gray-400 mt-1">List items and accept secure escrow transfers.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {userProducts.map((p) => (
                <div key={p._id} className="p-3 border border-white/30 rounded-2xl flex items-center justify-between hover:bg-white/45 transition-all bg-white/30 shadow-2xs hover:border-orange-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/60 border border-white/50 overflow-hidden font-bold flex items-center justify-center text-xs text-gray-600">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-950 line-clamp-1">{p.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{p.subcategory.replace('-', ' ')}</p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-orange-600">
                    ₦{p.theprices[0].toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SERVICES SECTION */}
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gray-50 rounded-xl">
                <Briefcase className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">My Listed Services</h3>
                <p className="text-xs text-gray-400">Offer consulting, development or branding contracts</p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal('service')}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Service
            </button>
          </div>

          {userServices.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
              <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-gray-500">No services listed yet</p>
              <p className="text-xs text-gray-400 mt-1">Setup specialized consulting catalogs.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {userServices.map((s) => (
                <div key={s._id} className="p-3 border border-white/30 rounded-2xl flex items-center justify-between hover:bg-white/45 transition-all bg-white/30 shadow-2xs hover:border-orange-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/60 border border-white/50 overflow-hidden font-bold flex items-center justify-center text-xs text-gray-600">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-950 line-clamp-1">{s.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{s.categoryLabel}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-white/50 border border-white/50 text-gray-600 px-2.5 py-1 rounded-sm uppercase shrink-0">
                    {s.pricing.bargain ? 'Bargain' : 'Fixed'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white/85 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
            >
              <button 
                onClick={() => setShowAddModal(null)}
                className="absolute top-5 right-5 p-1.5 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-extrabold text-gray-950 mb-1.5">
                {showAddModal === 'product' ? 'List New Product' : 'Add Professional Service'}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Fill the required specifications. Your item will be listed with secured Bareey Escrow protection.
              </p>

              {/* PRODUCT ADD FORM */}
              {showAddModal === 'product' ? (
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sony WH-1000XM5 headphones"
                      value={prodTitle}
                      onChange={(e) => setProdTitle(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (₦ - NGN)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 250000"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Condition</label>
                      <select
                        value={prodCondition}
                        onChange={(e) => setProdCondition(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      >
                        <option value="new">Brand New</option>
                        <option value="used">Gently Used</option>
                        <option value="refurbished">Refurbished</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                      <select
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      >
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home & living</option>
                        <option value="food">Food & Sweets</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Est. Delivery (Days)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={prodDays}
                        onChange={(e) => setProdDays(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Detailed Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain features, shipping specifics, packages, sizes..."
                      value={prodDesc}
                      onChange={(e) => setProdDesc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(null)}
                      className="px-4 py-2.5 border border-gray-100 hover:bg-gray-50 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-xs"
                    >
                      Publish Item
                    </button>
                  </div>
                </form>
              ) : (
                
                /* SERVICE ADD FORM */
                <form onSubmit={handleCreateService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Service Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Brand Designer"
                      value={servName}
                      onChange={(e) => setServName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category Tagline</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stunning vector designs and logo architects for startups"
                      value={servTagline}
                      onChange={(e) => setServTagline(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">State (Nigeria)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lagos"
                        value={servState}
                        onChange={(e) => setServState(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">LGA</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ikeja"
                        value={servLGA}
                        onChange={(e) => setServLGA(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Core Category</label>
                      <select
                        value={servCategory}
                        onChange={(e) => setServCategory(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      >
                        <option value="tech_digital">Programming & Tech</option>
                        <option value="design">Graphic Design</option>
                        <option value="uiux">UI/UX Design</option>
                        <option value="ai_ml">AI & Data Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subcategory tag</label>
                      <input
                        type="text"
                        placeholder="e.g. Figma, SvelteKit, React"
                        value={servSub1}
                        onChange={(e) => setServSub1(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Service Pitch / Cover description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Discuss experience, past client portfolios, deliverables..."
                      value={servDesc}
                      onChange={(e) => setServDesc(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(null)}
                      className="px-4 py-2.5 border border-gray-100 hover:bg-gray-50 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-xs"
                    >
                      Publish Service
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
