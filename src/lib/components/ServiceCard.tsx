/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Eye, MapPin, MessageSquare, Award, Sparkles } from 'lucide-react';
import { Service } from '../../types';
import { getServiceImage } from '../api/services';

interface ServiceCardProps {
  key?: any;
  service: Service;
  onRequestService: (service: Service) => void;
}

export default function ServiceCard({ service, onRequestService }: ServiceCardProps) {
  const imageSrc = getServiceImage(service._id);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-orange-200/50 transition-all flex flex-col h-full group"
    >
      {/* Service Cover Panel */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img
          src={imageSrc}
          alt={service.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Label Overlay */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-xs text-white rounded-lg shadow-xs">
          {service.categoryLabel}
        </span>

        {/* Pricing tag - bargain/fixed */}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-gray-900 border border-gray-100 rounded-lg shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-yellow-500 fill-current" />
          {service.pricing.bargain ? 'Open Budget' : 'Fixed Rate'}
        </span>
      </div>

      {/* Content details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline */}
          <p className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide line-clamp-1">
            {service.categoryTagline}
          </p>

          {/* Name */}
          <h4 className="font-extrabold text-gray-950 text-lg leading-tight mb-2 group-hover:text-black line-clamp-1">
            {service.name}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">
            {service.description}
          </p>

          {/* Subcategories tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {service.subcategories.slice(0, 3).map((sub) => (
              <span key={sub} className="px-2.5 py-1 text-[11px] font-medium text-gray-700 bg-white/40 border border-white/50 backdrop-blur-xs rounded-lg shadow-2xs">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions and metrics */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Location */}
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium max-w-[65%] truncate">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{service.lga}, {service.state}</span>
            </div>

            {/* Views counter */}
            <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
              <Eye className="w-3.5 h-3.5" />
              <span>{service.views} views</span>
            </div>
          </div>

          {/* Primary Request Action Button */}
          <button
            onClick={() => onRequestService(service)}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-black hover:bg-gray-900 active:scale-98 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Request Service
          </button>
        </div>
      </div>
    </motion.div>
  );
}
