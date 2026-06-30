/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Lock, Scale, Info, Phone, Mail, MapPin, 
  ArrowLeft, Check, ExternalLink, FileText, CheckCircle2, Copy 
} from 'lucide-react';

interface PolicyViewProps {
  onBack?: () => void;
}

export default function PolicyView({ onBack }: PolicyViewProps) {
  const [activeSection, setActiveSection] = useState<string>('terms');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Smooth scroll behavior on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Copy helper for contact info
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Sections definitions for table of contents
  const sections = [
    { id: 'terms', label: 'Terms of Use', icon: FileText },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: Shield },
    { id: 'refund-policy', label: 'Refund Policy', icon: Scale },
    { id: 'about-bareey', label: 'About Bareey', icon: Info },
    { id: 'contact', label: 'Contact Details', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Decorative Top Accent Glows */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-linear-to-b from-orange-500/5 to-transparent pointer-events-none z-0" />
      
      {/* Header Panel */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-2 -ml-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black rounded-xl transition-all cursor-pointer flex items-center justify-center"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-600 text-white rounded-lg flex items-center justify-center font-extrabold text-sm shadow-xs">
                B
              </div>
              <div>
                <span className="font-black text-lg tracking-tight text-gray-950">bareey</span>
                <span className="text-[10px] text-gray-400 font-bold block leading-none">LEGAL & POLICY CENTER</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Google Play Compliant
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-orange-600">Document Sections</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Quickly jump to official terms and policy agreements</p>
              </div>

              {/* Sidebar Navigation Links */}
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                        isActive
                          ? 'bg-orange-600 text-white border-orange-600 shadow-sm shadow-orange-500/10'
                          : 'bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-black'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span>{section.label}</span>
                    </a>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-gray-50 text-[11px] text-gray-400 space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Last Updated:</span>
                  <span className="text-gray-700 font-bold">June 30, 2026</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Version:</span>
                  <span className="text-gray-700 font-bold">v2.4.1</span>
                </div>
              </div>
            </div>

            {/* Quick Play Store Disclosure Alert Box */}
            <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl space-y-3">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-gray-900 tracking-wide uppercase">Google User Data Policy</h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed mt-1">
                    Bareey accesses only the basic profile scope (Email, Name, Picture) for verified Google OAuth sign-ins. Your sensitive files and private services are never accessed or shared.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Detailed Documentation Pane */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* TERMS OF USE */}
            <section 
              id="terms" 
              className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-2xs scroll-mt-24 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 1</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Terms of Use</h2>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                <p>
                  Bareey’s terms apply to all registered users and visitors on{' '}
                  <strong className="text-gray-950 font-bold">bareey.com</strong>. Users are fully
                  responsible for their activities, which include creating posts and interacting with
                  others.
                </p>
                <p>
                  All users must respect regional laws and limitations as they are accountable for their
                  actions. Bareey monitors account activities to ensure safety and to protect user data from
                  threats.
                </p>
                <p>
                  We may collect certain confidential data like IP addresses and geolocation to improve the
                  platform experience and for advertiser targeting purposes.
                </p>
              </div>
            </section>

            {/* PRIVACY POLICY */}
            <section 
              id="privacy-policy" 
              className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-2xs scroll-mt-24 space-y-8"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 2</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Privacy Policy</h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                Bareey is committed to protecting user confidentiality and safety. This policy details how we
                access, collect, use, store, and share your personal data, especially data obtained through Google services.
              </p>

              {/* subsection 1 */}
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-orange-600 rounded-sm" />
                  1. Data Collection and Usage Practices
                </h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  We collect and process the following categories of data for the purposes described:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Category A</span>
                    <h4 className="text-xs font-black text-gray-900">Account & Profile Data</h4>
                    <div className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
                      <p>
                        <strong>Data Collected:</strong> Email, Username, Password (encrypted), and self-submitted profile information (e.g., bio, name).
                      </p>
                      <p>
                        <strong>Usage:</strong> To create, maintain, and secure your Bareey account, enable platform interactions, and send essential service communications.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Category B</span>
                    <h4 className="text-xs font-black text-gray-900">Usage & Device Data</h4>
                    <div className="text-[11px] text-gray-600 space-y-2 leading-relaxed">
                      <p>
                        <strong>Data Collected:</strong> IP address, device type, browser information, and activity logs.
                      </p>
                      <p>
                        <strong>Usage:</strong> To monitor platform stability, prevent fraudulent activity, protect against cyber threats, and optimize the overall user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* subsection 2 - CRITICAL FOR OAUTH AND PLAY STORE VERIFICATION */}
              <div className="space-y-4 bg-orange-50/50 border border-orange-100 p-6 sm:p-8 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-orange-600 text-[9px] text-white font-black uppercase rounded-sm tracking-wide">OAuth Special</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight">
                    2. Handling of Google User Data
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  When you choose to sign up or connect to Bareey using your Google Account, we access specific, limited information from Google solely to establish and manage your Bareey account.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">Data Accessed:</h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        We access only the <strong>Google basic profile information</strong> (Name, Email Address, and Profile Picture) via the Google Sign-in process. We <strong>do not</strong> access, request, or use any other sensitive Google services data, such as Google Drive, Contacts, Calendar, or any data outside of the basic profile scope.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">Data Usage:</h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        The Google Name and Email are used <strong>only</strong> for account authentication, login validation, and internal verification purposes. This data is <strong>not</strong> used to serve personalized advertisements or for any non-essential services.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-extrabold text-gray-900">Data Sharing Limit:</h4>
                      <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                        We <strong>do not share, sell, or rent Google user data</strong> (including your Google email and name) with any third-party advertisers, partners, or outside organizations. Your Google data remains confidential and is used solely by Bareey to provide the core services you signed up for.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* subsection 3 - DATA STORAGE & DELETION */}
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-extrabold text-gray-950 tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-orange-600 rounded-sm" />
                  3. Data Storage, Protection, Retention, and Deletion
                </h3>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  We prioritize user data security and apply strict policies for data management:
                </p>

                <div className="space-y-4">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider mb-2">Storage & Protection</h4>
                    <ul className="text-[11px] text-gray-600 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                      <li>All data is stored on secure, access-controlled, and encrypted servers.</li>
                      <li>We use industry-standard security measures, including <strong>encryption (e.g., SSL/TLS)</strong>, to protect data both in transit and at rest.</li>
                      <li>We proactively monitor activities and report threats related to cybercrime or any illegal activity to legal authorities.</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="text-xs font-black text-gray-950 uppercase tracking-wider mb-2">Data Retention & Deletion Rights</h4>
                    <ul className="text-[11px] text-gray-600 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                      <li>We retain your account data for as long as your Bareey account remains active.</li>
                      <li>You can delete your account and all associated data directly through your Account Settings.</li>
                      <li>
                        Alternatively, you may submit a formal request for data deletion by contacting our support team at{' '}
                        <strong className="text-orange-600 font-bold hover:underline cursor-pointer" onClick={() => handleCopy('bareeyinc@gmail.com', 'email')}>
                          bareeyinc@gmail.com
                        </strong>
                        . Upon verification, we will delete all personal data (including any associated Google data) within{' '}
                        <strong>30 days</strong>, unless retention is legally required.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* REFUND POLICY */}
            <section 
              id="refund-policy" 
              className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-2xs scroll-mt-24 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 3</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Refund Policy</h2>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Bareey values transparency and customer satisfaction. Refunds are processed only for
                  transactions completed through our official Bareey platform or verified Bareey merchants.
                </p>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <ul className="text-[11px] sm:text-xs text-gray-600 space-y-3 list-disc pl-4 leading-relaxed font-medium">
                    <li>Refund requests must be submitted within <strong>7 days</strong> of the transaction date.</li>
                    <li>Approved refunds are credited back to the original payment method within <strong>5–10 business days</strong>.</li>
                    <li>Refunds may not apply to digital or consumable content once accessed or used.</li>
                    <li>
                      To request a refund, please email us at{' '}
                      <strong className="text-orange-600 font-bold hover:underline cursor-pointer" onClick={() => handleCopy('bareeyinc@gmail.com', 'email')}>
                        bareeyinc@gmail.com
                      </strong>{' '}
                      with your transaction details.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ABOUT BAREEY */}
            <section 
              id="about-bareey" 
              className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-2xs scroll-mt-24 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 4</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">About Bareey</h2>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                <p>
                  Bareey is an all-in-one Entertainment, Business, and Messaging platform. It features a
                  fast messaging system that enables users to interact, post, manage, buy, sell, and explore
                  communities.
                </p>
                <p>
                  Bareey bridges the gap between fun, business, and communication, making it a powerful and
                  modern tool for everyone.
                </p>
              </div>
            </section>

            {/* CONTACT INFORMATION */}
            <section 
              id="contact" 
              className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-2xs scroll-mt-24 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase">Section 5</span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight">Contact Information</h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                For inquiries, support, or refund requests, please reach out to us through the following channels:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Email Contact Card */}
                <div 
                  onClick={() => handleCopy('bareeyinc@gmail.com', 'email')}
                  className="bg-gray-50 hover:bg-gray-100/75 border border-gray-100 p-5 rounded-2xl cursor-pointer transition-all space-y-2 text-center relative group"
                >
                  <div className="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-2xs border border-gray-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Email Support</h4>
                  <p className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors break-words">
                    bareeyinc@gmail.com
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium block pt-1 flex items-center justify-center gap-1">
                    <Copy className="w-3 h-3" /> Click to Copy
                  </span>
                </div>

                {/* Phone Contact Card */}
                <div 
                  onClick={() => handleCopy('+2349021388401', 'phone')}
                  className="bg-gray-50 hover:bg-gray-100/75 border border-gray-100 p-5 rounded-2xl cursor-pointer transition-all space-y-2 text-center relative group"
                >
                  <div className="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-2xs border border-gray-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Direct Line</h4>
                  <p className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    +234 9021388401
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium block pt-1 flex items-center justify-center gap-1">
                    <Copy className="w-3 h-3" /> Click to Copy
                  </span>
                </div>

                {/* Address Card */}
                <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl space-y-2 text-center">
                  <div className="w-8 h-8 bg-white text-orange-600 rounded-lg flex items-center justify-center mx-auto shadow-2xs border border-gray-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Business Address</h4>
                  <p className="text-xs font-bold text-gray-900 leading-snug">
                    Hayin banki kawo Kaduna State, Nigeria
                  </p>
                  <span className="text-[10px] text-gray-400 font-bold block pt-1">
                    Corporate Office
                  </span>
                </div>

              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Copy Alert Notification Bubble */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold border border-neutral-800"
          >
            <Check className="w-4 h-4 text-orange-500" />
            <span>Copied {copiedText === 'email' ? 'email' : 'phone number'} to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small Legal Disclaimer Footer block */}
      <footer className="border-t border-gray-100 bg-white py-8 mt-16 text-center text-xs text-gray-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Bareey Inc. Kaduna, Nigeria. Settle confidently.</p>
          <p className="mt-1">
            Bareey Escrow Services are protected in accordance with federal p2p trading directives and regional regulations.
          </p>
        </div>
      </footer>

    </div>
  );
}
