/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  _id: string;
  likes: number;
  bookmarks: number;
  subcategory: string;
  shopinformation: {
    description: string;
    title: string;
    condition: string;
  };
  shopid: string;
  productslength: number;
  comments: number;
  shares: number;
  country: string;
  theprices: number[];
  shiptocountries: string[];
  description: string;
  usersid: string;
  availability_type: string;
  catalog?: string;
  title: string;
  delivery: {
    Nigeria: {
      [stateName: string]: number;
    };
  };
  files: {
    [filePath: string]: {
      price: number;
    };
  };
  views: number;
  category: string;
  delivery_time: {
    duration: string;
    days: number;
  };
  orders?: number;
}

export interface Service {
  _id: string;
  views: number;
  usersid: string;
  categoryKey: string;
  categoryTagline: string;
  lga: string;
  categoryLabel: string;
  description: string;
  name: string;
  subcategories: string[];
  files: string[];
  type: string;
  state: string;
  posts: number;
  pricing: {
    bargain: boolean;
  };
}

export interface Message {
  id: string;
  senderId: string; // "me" or the other user's id
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  targetId: string; // Product id or Service id
  targetTitle: string;
  targetType: 'product' | 'service';
  targetPrice?: string;
  category: 'customer' | 'service'; // 'customer' means someone is buying/hiring from me; 'service' means I requested from someone
  lastMessageText: string;
  lastMessageTime: string;
  unread: boolean;
  messages: Message[];
  status?: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
}
