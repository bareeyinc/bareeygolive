/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, ShieldAlert, ArrowLeft, ShieldCheck, Truck, HelpCircle, 
  CheckCircle2, AlertTriangle, RefreshCw, XCircle 
} from 'lucide-react';
import { Chat, Message } from '../../types';

interface ChatWorkspaceProps {
  chat: Chat;
  onBack: () => void;
  onUpdateChatStatus: (chatId: string, status: Chat['status'], messages: Message[]) => void;
}

export default function ChatWorkspace({ chat, onBack, onUpdateChatStatus }: ChatWorkspaceProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('correct_item'); // 'correct_item' or 'wrong_item'
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle send message
  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      senderName: 'Me',
      text: textToSend,
      timestamp: 'Just now'
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputText('');
    
    // Save to parent state immediately
    onUpdateChatStatus(chat.id, chat.status, updatedMessages);

    // Trigger simulated reply from seller/customer
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let replyText = "Alright, let me check that for you right away. Our team is committed to the Bareey Trust Escrow guidelines!";
      
      // Smart contextual responses based on escrow state
      if (chat.status === 'pending') {
        replyText = "Hi! Thanks for reaching out. Please secure this transaction by initiating the Escrow Payment above. Once payment is held, I'll start processing immediately.";
      } else if (chat.status === 'preparing') {
        replyText = "I have received your escrow deposit confirmation. Your order is safely being prepared and will be packaged and shipped shortly.";
      } else if (chat.status === 'shipped') {
        replyText = "Your item has been shipped out! Please let me know as soon as it arrives, and don't forget to confirm delivery on SvelteKit/React dashboard so funds are safely released.";
      }

      const botMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        senderId: chat.otherUserId,
        senderName: chat.otherUserName,
        text: replyText,
        timestamp: 'Just now'
      };

      const finalMessages = [...updatedMessages, botMsg];
      setMessages(finalMessages);
      onUpdateChatStatus(chat.id, chat.status, finalMessages);
    }, 1500);
  };

  // Step through Escrow States
  const updateStatus = (nextStatus: Chat['status'], customSystemMessage?: string) => {
    let systemText = customSystemMessage || `Order status updated to: ${nextStatus?.toUpperCase()}`;
    
    const systemMsg: Message = {
      id: `msg-system-${Date.now()}`,
      senderId: 'system',
      senderName: 'Bareey Escrow',
      text: systemText,
      timestamp: 'Just now'
    };

    const updated = [...messages, systemMsg];
    setMessages(updated);
    onUpdateChatStatus(chat.id, nextStatus, updated);

    // Auto trigger automated companion seller message on status changes
    if (nextStatus === 'preparing') {
      setTimeout(() => {
        const prepareMsg: Message = {
          id: `msg-bot-prep-${Date.now()}`,
          senderId: chat.otherUserId,
          senderName: chat.otherUserName,
          text: "Perfect! Escrow payment received successfully. I am now preparing your order with care. I will mark it as 'Shipped' once it's on its way.",
          timestamp: 'Just now'
        };
        setMessages(prev => {
          const last = [...prev, prepareMsg];
          onUpdateChatStatus(chat.id, nextStatus, last);
          return last;
        });
      }, 1000);
    } else if (nextStatus === 'shipped') {
      setTimeout(() => {
        const shipMsg: Message = {
          id: `msg-bot-ship-${Date.now()}`,
          senderId: chat.otherUserId,
          senderName: chat.otherUserName,
          text: "Good news! I have shipped your order. The tracking number has been attached to the Bareey logs. Once received, please confirm delivery to release funds.",
          timestamp: 'Just now'
        };
        setMessages(prev => {
          const last = [...prev, shipMsg];
          onUpdateChatStatus(chat.id, nextStatus, last);
          return last;
        });
      }, 1000);
    }
  };

  const handleCancelSubmit = () => {
    let systemText = "";
    if (chat.status === 'pending' || chat.status === 'preparing') {
      systemText = "Order has been successfully cancelled. Escrow refund of " + (chat.targetPrice || "funds") + " has been credited back to the buyer's wallet.";
    } else {
      // Shipped cancellation rule
      if (cancelReason === 'correct_item') {
        systemText = "Order cancelled post-shipping. Seller shipped the correct item, so buyer has paid return shipping costs both ways. Remaining escrow released back.";
      } else {
        systemText = "Order cancelled post-shipping. Wrong item detected. All shipping costs charged to the seller. Full escrow refund released to buyer.";
      }
    }
    setShowCancelModal(false);
    updateStatus('cancelled', systemText);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white/45 backdrop-blur-md border border-white/40 rounded-3xl overflow-hidden shadow-xs relative">
      {/* Workspace Header */}
      <div className="bg-white/60 backdrop-blur-md border-b border-white/40 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-black text-white font-bold text-sm flex items-center justify-center">
            {chat.otherUserName.charAt(0)}
          </div>
          
          <div>
            <h3 className="font-bold text-gray-950 text-sm sm:text-base leading-tight">
              {chat.otherUserName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-sm font-extrabold text-[9px]">
                {chat.targetType}
              </span>
              <span className="truncate max-w-[140px]">{chat.targetTitle}</span>
            </div>
          </div>
        </div>

        {/* Target details */}
        <div className="text-right">
          <span className="text-sm font-black text-black block">
            {chat.targetPrice}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold uppercase">
            {chat.category === 'customer' ? 'Customer request' : 'My request'}
          </span>
        </div>
      </div>

      {/* Trust & Escrow Management Panel */}
      <div className="bg-white/50 backdrop-blur-md px-4 py-3 border-b border-white/40 shadow-2xs">
        {/* Stages Indicator */}
        <div className="flex items-center justify-between max-w-xl mx-auto mb-4">
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              chat.status !== 'pending' && chat.status !== 'cancelled' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              1
            </div>
            <span className="text-[9px] font-bold text-gray-500 mt-1">Paid</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-100 mx-1"></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              chat.status === 'preparing' || chat.status === 'shipped' || chat.status === 'completed' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              2
            </div>
            <span className="text-[9px] font-bold text-gray-500 mt-1">Prepared</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-100 mx-1"></div>

          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              chat.status === 'shipped' || chat.status === 'completed' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              3
            </div>
            <span className="text-[9px] font-bold text-gray-500 mt-1">Shipped</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-100 mx-1"></div>

          <div className="flex flex-col items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              chat.status === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              ✓
            </div>
            <span className="text-[9px] font-bold text-gray-500 mt-1">Success</span>
          </div>
        </div>

        {/* Actions Bar depending on active status */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-2xl mx-auto border border-white/40">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-gray-700 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {chat.status === 'pending' && "Awaiting Escrow Payment"}
                {chat.status === 'preparing' && "Escrow Secured & Preparing"}
                {chat.status === 'shipped' && "Item Shipped & Tracking Live"}
                {chat.status === 'completed' && "Transaction Complete"}
                {chat.status === 'cancelled' && "Transaction Cancelled"}
              </p>
              <p className="text-[10px] text-gray-500 leading-none mt-0.5">
                {chat.status === 'pending' && "Deposit funds to begin process safely."}
                {chat.status === 'preparing' && "Seller is preparing items for shipment."}
                {chat.status === 'shipped' && "Please confirm once received to release funds."}
                {chat.status === 'completed' && "Funds released to seller."}
                {chat.status === 'cancelled' && "Refunds executed according to terms."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
            {/* Status-specific Action Button triggers */}
            {chat.status === 'pending' && (
              <button
                onClick={() => updateStatus('preparing', 'Buyer deposited payment into Bareey Escrow. Funds are safely secured!')}
                className="px-4 py-2 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Secure Escrow (Pay Now)
              </button>
            )}

            {chat.status === 'preparing' && (
              <button
                onClick={() => updateStatus('shipped', 'Seller has marked item as shipped. Dynamic shipping tracking initialized.')}
                className="px-4 py-2 bg-black hover:bg-gray-900 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Mark as Shipped
              </button>
            )}

            {chat.status === 'shipped' && (
              <button
                onClick={() => updateStatus('completed', 'Buyer confirmed delivery. Funds are safely released from escrow back to the seller!')}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                Confirm Order (Release Funds)
              </button>
            )}

            {/* Cancel Button (Visible if not completed or cancelled already) */}
            {chat.status !== 'completed' && chat.status !== 'cancelled' && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-semibold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancel Transaction
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          const isSystem = msg.senderId === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                <div className="bg-amber-50/70 backdrop-blur-xs border border-amber-200/50 text-amber-800 rounded-2xl px-4 py-3 text-xs text-center max-w-md shadow-2xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-left leading-relaxed">
                    <span className="font-bold block text-amber-900 mb-0.5">Bareey Trust Notification</span>
                    {msg.text}
                    <span className="block text-[9px] text-amber-500 font-medium mt-1 uppercase tracking-wider">
                      Secured Escrow Audit Log
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-2xs ${
                isMe 
                  ? 'bg-black text-white rounded-tr-none shadow-2xs' 
                  : 'bg-white/70 backdrop-blur-xs border border-white/50 text-gray-900 rounded-tl-none shadow-2xs'
              }`}>
                {!isMe && (
                  <span className="block text-[10px] font-black text-gray-400 mb-1">
                    {msg.senderName}
                  </span>
                )}
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                <span className={`block text-[9px] text-right mt-1.5 font-medium ${isMe ? 'text-gray-400' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-2xs">
              <span className="text-xs font-semibold text-gray-400">typing</span>
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Area */}
      {chat.status !== 'completed' && chat.status !== 'cancelled' ? (
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
          className="bg-white/65 backdrop-blur-md p-3 border-t border-white/40 flex items-center gap-2 shadow-sm"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a secure message, discuss custom price or shipment terms..."
            className="flex-1 bg-white/50 backdrop-blur-xs border border-white/50 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:border-black transition-all"
          />
          <button
            type="submit"
            className="p-3 bg-black hover:bg-gray-900 text-white rounded-xl transition-all active:scale-90 cursor-pointer shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="bg-white/40 backdrop-blur-md p-4 border-t border-white/40 text-center text-xs text-gray-500 font-semibold uppercase">
          This secure conversation log is locked (Status: {chat.status})
        </div>
      )}

      {/* Trust Cancellation Protection Dialog Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-100 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowCancelModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Cancel Secure Order</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Cancellation terms are strictly regulated by Bareey Buyer Protection safeguards.
                </p>
              </div>

              {/* Show Cancellation Rules depending on State */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs text-gray-600 mb-5 space-y-2.5">
                {chat.status === 'pending' || chat.status === 'preparing' ? (
                  <div>
                    <span className="font-bold text-green-700 block mb-1">✓ Free Cancellation Available</span>
                    Shipping has not started yet. You can cancel this order with a full instant refund back to your payment source.
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-red-700 block mb-1.5">⚠ Shipping has already started</span>
                    Please declare the cancellation justification to execute correct liability pricing:
                    
                    <div className="space-y-2 mt-3">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cancelReason"
                          checked={cancelReason === 'correct_item'}
                          onChange={() => setCancelReason('correct_item')}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-bold text-gray-800">I simply changed my mind</span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">
                            Seller shipped correct items. You will pay return shipping costs both ways.
                          </span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cancelReason"
                          checked={cancelReason === 'wrong_item'}
                          onChange={() => setCancelReason('wrong_item')}
                          className="mt-0.5"
                        />
                        <div>
                          <span className="font-bold text-gray-800">Seller shipped the WRONG product</span>
                          <span className="block text-[10px] text-gray-400 mt-0.5">
                            Seller pays all shipping costs. Full refund to you.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2.5 border border-gray-100 hover:bg-gray-50 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Keep Order Active
                </button>
                <button
                  onClick={handleCancelSubmit}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
