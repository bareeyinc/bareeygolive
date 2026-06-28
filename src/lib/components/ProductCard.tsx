/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Heart, Eye, MapPin, Truck, ShieldAlert, MessageSquare } from 'lucide-react';
import { Product } from '../../types';
import { getProductImage } from '../api/products';

interface ProductCardProps {
  key?: any;
  product: Product;
  onOpenChat: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onOpenChat, onViewDetails }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.likes);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const imageSrc = getProductImage(product._id);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-orange-200/50 transition-all flex flex-col h-full w-72 shrink-0 group relative"
      onClick={() => onViewDetails && onViewDetails(product)}
    >
      {/* Product Image Panel */}
      <div className="relative h-44 bg-gray-50 overflow-hidden">
        <img
          src={imageSrc}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Condition Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-black rounded-lg shadow-xs">
          {product.shopinformation.condition || 'New'}
        </span>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all shadow-xs active:scale-90 border backdrop-blur-xs ${
            liked 
              ? 'bg-red-50 text-red-500 border-red-100' 
              : 'bg-white/95 text-gray-500 hover:text-black border-gray-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenChat(product);
            }}
            className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-xl shadow-md hover:bg-gray-100 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Buy / Chat
          </button>
        </div>
      </div>

      {/* Content details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Location */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1 uppercase tracking-wider">
            <span>{product.subcategory.replace('-', ' ')}</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-300" />
              <span>{product.country}</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="font-bold text-gray-950 text-base leading-tight group-hover:text-black line-clamp-1 mb-1.5">
            {product.title}
          </h4>

          {/* Short description */}
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing and Stats */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-lg font-extrabold text-orange-600">
              {formatCurrency(product.theprices[0] || 50000)}
            </span>
            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-gray-300" />
              {product.delivery_time.days} {product.delivery_time.duration}
            </span>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center justify-between pt-2.5 border-t border-gray-50 text-[11px] text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{product.views + (liked ? 1 : 0)} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{likesCount} likes</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
