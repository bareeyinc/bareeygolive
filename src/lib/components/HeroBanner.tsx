/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, Briefcase, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onExploreServices: () => void;
}

export default function HeroBanner({ onExploreProducts, onExploreServices }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-radial from-gray-50 via-white to-white py-20 sm:py-28 px-6 border-b border-gray-100">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Trusted Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800 mb-6 border border-gray-200"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-black" />
          Escrow Protected Digital Commerce
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]"
        >
          Everything you need to <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">buy, sell and hire.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Discover trusted products, connect with service providers, chat instantly, and shop with confidence using Bareey.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onExploreProducts}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-black hover:bg-gray-900 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Marketplace
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          
          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-2xl transition-all border border-gray-200 active:scale-98 cursor-pointer"
          >
            <Briefcase className="w-5 h-5 text-gray-400" />
            Browse Services
          </button>
        </motion.div>
      </div>
    </div>
  );
}
