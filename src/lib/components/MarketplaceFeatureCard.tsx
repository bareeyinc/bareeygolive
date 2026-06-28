/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Truck, ShieldAlert, XCircle } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: 'escrow' | 'delivery' | 'protection' | 'cancellation';
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'escrow':
      return <ShieldCheck className="w-6 h-6 text-black" />;
    case 'delivery':
      return <Truck className="w-6 h-6 text-black" />;
    case 'protection':
      return <ShieldAlert className="w-6 h-6 text-black" />;
    case 'cancellation':
      return <XCircle className="w-6 h-6 text-black" />;
    default:
      return <ShieldCheck className="w-6 h-6 text-black" />;
  }
};

export default function MarketplaceFeatures() {
  const features: Feature[] = [
    {
      title: 'Escrow Payments',
      description: "Bareey securely holds buyers' payments until the buyer confirms successful delivery of products or services. Peace of mind guaranteed.",
      icon: 'escrow'
    },
    {
      title: 'Delivery Tracking',
      description: 'Both buyers and sellers can monitor shipping progress in real time directly within the active chat system or workspace dashboards.',
      icon: 'delivery'
    },
    {
      title: 'Buyer Protection',
      description: 'If the seller ships exactly what the buyer ordered and the buyer cancels after shipping begins, the buyer pays shipping both ways. If wrong, the seller pays.',
      icon: 'protection'
    },
    {
      title: 'Cancellation Policy',
      description: "Buyers may cancel orders freely before shipping begins. Once shipping starts, Bareey's comprehensive protection policies take effect.",
      icon: 'cancellation'
    }
  ];

  return (
    <div className="bg-gray-50/50 py-16 px-6 border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">How It Works</span>
          <h2 className="text-3xl font-extrabold text-gray-950 mt-2 mb-3">The Bareey Trust Guarantee</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            We hold payments securely, safeguard deliveries, and enforce transparent guidelines to ensure absolute trust in every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className="p-3 bg-gray-50 rounded-2xl w-fit mb-4 group-hover:bg-black group-hover:text-white transition-colors">
                <div className="group-hover:filter group-hover:invert transition-all">
                  {getIcon(feature.icon)}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            * Terms and Conditions Apply. Safeguards managed via automatic smart escrow protocols.
          </p>
        </div>
      </div>
    </div>
  );
}
