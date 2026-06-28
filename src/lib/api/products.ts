/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../../types';

export const mockProducts: Product[] = [
  {
    _id: "6a388fd73f375c9c030be83f",
    likes: 24,
    bookmarks: 8,
    subcategory: "phones-tablets",
    shopinformation: {
      description: "Get the latest Apple flagship experience. Brand new and sealed, directly imported.",
      title: "Apple iPhone 15 Pro Max (256GB, Titanium)",
      condition: "new"
    },
    shopid: "6a2ad63a56a9c476cac3fee7",
    productslength: 1,
    comments: 4,
    shares: 12,
    country: "NG",
    theprices: [1750000],
    shiptocountries: ["NGN"],
    description: "The iPhone 15 Pro Max has a strong and light aerospace-grade titanium design. It features a powerful 5x Telephoto camera, the game-changing A17 Pro chip, and a customizable Action button.",
    usersid: "6a25a3b3bd244dc51ebff677",
    availability_type: "ready",
    catalog: "e0291fb9-87af-4721-af69-44e590d3dee2",
    title: "iPhone 15 Pro Max 256GB",
    delivery: {
      Nigeria: {
        Abia: 5000,
        Lagos: 3000,
        FCT: 4000,
        Kaduna: 4500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff677/product1.jpeg": {
        price: 1750000
      }
    },
    views: 452,
    category: "electronics",
    delivery_time: {
      duration: "days",
      days: 2
    }
  },
  {
    _id: "6a38903e9b6a52edf110a583",
    comments: 2,
    shopinformation: {
      description: "Delicious freshly baked cakes for birthdays, anniversaries, and corporate celebrations.",
      title: "Decadent Chocolate Celebration Cake",
      condition: "new"
    },
    description: "Premium double chocolate fudge cake, beautifully iced with premium Belgian chocolate buttercream. Perfectly serves 15-20 people. Made with high-quality organic ingredients.",
    usersid: "6a25a3b3bd244dc51ebff677",
    shiptocountries: ["NGN"],
    category: "fashion", // category matched schema
    title: "Double Chocolate Celebration Cake",
    delivery: {
      Nigeria: {
        Adamawa: 6000,
        Lagos: 2000,
        FCT: 3000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff677/product2.jpeg": {
        price: 45000
      }
    },
    shares: 5,
    shopid: "6a2ad63a56a9c476cac3fee7",
    productslength: 1,
    likes: 18,
    bookmarks: 3,
    views: 189,
    country: "NG",
    availability_type: "ready",
    subcategory: "men-clothing", // subcategory matched schema
    delivery_time: {
      duration: "days",
      days: 1
    },
    theprices: [45000],
    orders: 14
  },
  {
    _id: "6a38903e9b6a52edf110a584",
    comments: 7,
    shopinformation: {
      description: "Finest quality electronics and portable computation systems.",
      title: "MacBook Pro 14\" M3 Max",
      condition: "new"
    },
    description: "The M3 Max chip drives the ultimate workstation with 14-core CPU and 30-core GPU. Perfect for high-intensity 3D rendering, video editing, and machine learning models.",
    usersid: "6a25a3b3bd244dc51ebff678",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "MacBook Pro 14\" M3 Max (36GB/1TB)",
    delivery: {
      Nigeria: {
        Lagos: 4000,
        FCT: 5000,
        Kano: 6000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff678/product3.jpeg": {
        price: 3200000
      }
    },
    shares: 11,
    shopid: "6a2ad63a56a9c476cac3fee8",
    productslength: 1,
    likes: 35,
    bookmarks: 14,
    views: 612,
    country: "NG",
    availability_type: "ready",
    subcategory: "computers-laptops",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [3200000],
    orders: 3
  },
  {
    _id: "6a38903e9b6a52edf110a585",
    comments: 1,
    shopinformation: {
      description: "Authentic handmade African luxury designs.",
      title: "Royal Emerald Handcrafted Agbada Set",
      condition: "new"
    },
    description: "Perfect premium cashmere material with immaculate embroidery patterns. Includes the top, trouser, and beautiful matching cap. Custom fitted.",
    usersid: "6a25a3b3bd244dc51ebff679",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Royal Emerald Handcrafted Agbada",
    delivery: {
      Nigeria: {
        Lagos: 3000,
        FCT: 3000,
        Oyo: 2500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff679/product4.jpeg": {
        price: 150000
      }
    },
    shares: 20,
    shopid: "6a2ad63a56a9c476cac3fee9",
    productslength: 1,
    likes: 72,
    bookmarks: 18,
    views: 890,
    country: "NG",
    availability_type: "preorder",
    subcategory: "men-clothing",
    delivery_time: {
      duration: "days",
      days: 7
    },
    theprices: [150000],
    orders: 22
  },
  {
    _id: "6a38903e9b6a52edf110a586",
    comments: 0,
    shopinformation: {
      description: "Premium sound systems and personal audio engineering gadgets.",
      title: "Sony WH-1000XM5 Noise Canceling Headphones",
      condition: "new"
    },
    description: "Industry-leading active noise canceling, premium 30-hour battery life, ultra-comfortable build, and exquisite crystal-clear voice call quality.",
    usersid: "6a25a3b3bd244dc51ebff680",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "Sony WH-1000XM5 ANC Headphones",
    delivery: {
      Nigeria: {
        Lagos: 2000,
        FCT: 3500,
        Enugu: 4000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff680/product5.jpeg": {
        price: 490000
      }
    },
    shares: 4,
    shopid: "6a2ad63a56a9c476cac3fe10",
    productslength: 1,
    likes: 41,
    bookmarks: 9,
    views: 340,
    country: "NG",
    availability_type: "ready",
    subcategory: "audio-accessories",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [490000],
    orders: 8
  },
  {
    _id: "6a38903e9b6a52edf110a587",
    comments: 12,
    shopinformation: {
      description: "Luxury footwear directly imported from top European designers.",
      title: "Nike Dunk Low Retro 'Panda'",
      condition: "new"
    },
    description: "Classic black and white premium leather sneakers. Highly sought after, versatile, and extremely comfortable for daily urban wear.",
    usersid: "6a25a3b3bd244dc51ebff681",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Nike Dunk Low Retro 'Panda'",
    delivery: {
      Nigeria: {
        Lagos: 2500,
        Rivers: 4000,
        Anambra: 4000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff681/product6.jpeg": {
        price: 135000
      }
    },
    shares: 42,
    shopid: "6a2ad63a56a9c476cac3fe11",
    productslength: 1,
    likes: 124,
    bookmarks: 33,
    views: 1420,
    country: "NG",
    availability_type: "ready",
    subcategory: "shoes",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [135000],
    orders: 54
  },
  {
    _id: "6a38903e9b6a52edf110a588",
    comments: 3,
    shopinformation: {
      description: "High-end leather bags and beautiful travel luggage.",
      title: "Gabriella Saffiano Leather Tote Bag",
      condition: "new"
    },
    description: "Elegant structured tote crafted in genuine Saffiano leather, featuring gold-tone hardware, spacious interior, and safe zippered compartments.",
    usersid: "6a25a3b3bd244dc51ebff682",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Gabriella Saffiano Leather Tote",
    delivery: {
      Nigeria: {
        Lagos: 3000,
        FCT: 3500,
        Rivers: 3500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff682/product7.jpeg": {
        price: 280000
      }
    },
    shares: 8,
    shopid: "6a2ad63a56a9c476cac3fe12",
    productslength: 1,
    likes: 56,
    bookmarks: 12,
    views: 480,
    country: "NG",
    availability_type: "ready",
    subcategory: "women-bags",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [280000],
    orders: 6
  },
  {
    _id: "6a38903e9b6a52edf110a589",
    comments: 5,
    shopinformation: {
      description: "Ergonomic furniture solutions for homes and offices.",
      title: "Orthopedic Ergonomic Office Chair",
      condition: "new"
    },
    description: "Fully adjustable mesh back, dynamic lumbar support, beautiful polished aluminum base, 3D armrests, and premium gas lift mechanism.",
    usersid: "6a25a3b3bd244dc51ebff683",
    shiptocountries: ["NGN"],
    category: "home",
    title: "Orthopedic Ergonomic Chair",
    delivery: {
      Nigeria: {
        Lagos: 5000,
        FCT: 8000,
        Kano: 9000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff683/product8.jpeg": {
        price: 185000
      }
    },
    shares: 12,
    shopid: "6a2ad63a56a9c476cac3fe13",
    productslength: 1,
    likes: 49,
    bookmarks: 11,
    views: 520,
    country: "NG",
    availability_type: "ready",
    subcategory: "office-furniture",
    delivery_time: {
      duration: "days",
      days: 4
    },
    theprices: [185000],
    orders: 19
  },
  {
    _id: "6a38903e9b6a52edf110a590",
    comments: 18,
    shopinformation: {
      description: "Home entertainment and cinematic visual systems.",
      title: "LG 55\" OLED evo C3 Series 4K TV",
      condition: "new"
    },
    description: "Stunning self-lit OLED pixels, perfect infinite contrast, custom a9 AI Processor Gen6, 120Hz refresh rate, Dolby Vision, and immersive Dolby Atmos.",
    usersid: "6a25a3b3bd244dc51ebff684",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "LG 55\" OLED evo C3 4K TV",
    delivery: {
      Nigeria: {
        Lagos: 10000,
        FCT: 15000,
        Kwara: 12000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff684/product9.jpeg": {
        price: 1450000
      }
    },
    shares: 24,
    shopid: "6a2ad63a56a9c476cac3fe14",
    productslength: 1,
    likes: 88,
    bookmarks: 25,
    views: 1150,
    country: "NG",
    availability_type: "ready",
    subcategory: "television",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [1450000],
    orders: 5
  },
  {
    _id: "6a38903e9b6a52edf110a591",
    comments: 6,
    shopinformation: {
      description: "Digital photography, studio lights and video equipment.",
      title: "Canon EOS R50 Mirrorless Camera System",
      condition: "new"
    },
    description: "Compact content creation mirrorless camera with 24.2 MP CMOS sensor, flawless Dual Pixel CMOS AF II, and cinematic 4K video recording. Lens included.",
    usersid: "6a25a3b3bd244dc51ebff685",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "Canon EOS R50 Mirrorless Camera",
    delivery: {
      Nigeria: {
        Lagos: 4000,
        FCT: 6000,
        Rivers: 5500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff685/product10.jpeg": {
        price: 980000
      }
    },
    shares: 15,
    shopid: "6a2ad63a56a9c476cac3fe15",
    productslength: 1,
    likes: 67,
    bookmarks: 16,
    views: 740,
    country: "NG",
    availability_type: "ready",
    subcategory: "cameras",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [980000],
    orders: 4
  },
  {
    _id: "6a38903e9b6a52edf110a592",
    comments: 0,
    shopinformation: {
      description: "Mechanical keyboards and tactile gaming setup accessories.",
      title: "Keychron Q1 Max Wireless Mechanical Keyboard",
      condition: "new"
    },
    description: "Full metal body CNC aluminum casing, hot-swappable tactile switches, QMK/VIA support, and beautiful double-shot PBT keycaps.",
    usersid: "6a25a3b3bd244dc51ebff686",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "Keychron Q1 Max Keyboard",
    delivery: {
      Nigeria: {
        Lagos: 2000,
        FCT: 3000,
        Plateau: 3500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff686/product11.jpeg": {
        price: 245000
      }
    },
    shares: 3,
    shopid: "6a2ad63a56a9c476cac3fe16",
    productslength: 1,
    likes: 31,
    bookmarks: 5,
    views: 312,
    country: "NG",
    availability_type: "ready",
    subcategory: "accessories",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [245000],
    orders: 12
  },
  {
    _id: "6a38903e9b6a52edf110a593",
    comments: 8,
    shopinformation: {
      description: "Traditional beads and royal cultural accessories.",
      title: "Royal Edo Coral Bead Wedding Necklace Set",
      condition: "new"
    },
    description: "Stunning authentic polished Edo coral beads handcrafted beautifully for bridal and groom traditional weddings.",
    usersid: "6a25a3b3bd244dc51ebff687",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Royal Edo Coral Wedding Set",
    delivery: {
      Nigeria: {
        Edo: 2000,
        Lagos: 3500,
        FCT: 4000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff687/product12.jpeg": {
        price: 180000
      }
    },
    shares: 19,
    shopid: "6a2ad63a56a9c476cac3fe17",
    productslength: 1,
    likes: 95,
    bookmarks: 28,
    views: 810,
    country: "NG",
    availability_type: "preorder",
    subcategory: "jewelry",
    delivery_time: {
      duration: "days",
      days: 5
    },
    theprices: [180000],
    orders: 18
  },
  {
    _id: "6a38903e9b6a52edf110a594",
    comments: 1,
    shopinformation: {
      description: "Scented soy candles and premium room diffusers.",
      title: "Luxury Lavender Scented Soy Candle Set",
      condition: "new"
    },
    description: "Set of three hand-poured lavender & vanilla aromatherapy candles made with 100% natural soy wax and lead-free cotton wicks.",
    usersid: "6a25a3b3bd244dc51ebff688",
    shiptocountries: ["NGN"],
    category: "home",
    title: "Lavender Scented Soy Candles",
    delivery: {
      Nigeria: {
        Lagos: 1500,
        Ogun: 2000,
        FCT: 2500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff688/product13.jpeg": {
        price: 18000
      }
    },
    shares: 2,
    shopid: "6a2ad63a56a9c476cac3fe18",
    productslength: 1,
    likes: 27,
    bookmarks: 6,
    views: 220,
    country: "NG",
    availability_type: "ready",
    subcategory: "decor",
    delivery_time: {
      duration: "days",
      days: 1
    },
    theprices: [18000],
    orders: 31
  },
  {
    _id: "6a38903e9b6a52edf110a595",
    comments: 4,
    shopinformation: {
      description: "Premium leatherwear and luxury winter/autumn apparel.",
      title: "Classic Distressed Leather Biker Jacket",
      condition: "new"
    },
    description: "Top-grain genuine cowhide leather with a subtle distressed finish. Featuring reinforced zippers and extremely comfortable inner lining.",
    usersid: "6a25a3b3bd244dc51ebff689",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Classic Distressed Leather Jacket",
    delivery: {
      Nigeria: {
        Lagos: 3000,
        FCT: 3000,
        Kano: 4000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff689/product14.jpeg": {
        price: 125000
      }
    },
    shares: 14,
    shopid: "6a2ad63a56a9c476cac3fe19",
    productslength: 1,
    likes: 64,
    bookmarks: 14,
    views: 590,
    country: "NG",
    availability_type: "ready",
    subcategory: "men-clothing",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [125000],
    orders: 11
  },
  {
    _id: "6a38903e9b6a52edf110a596",
    comments: 3,
    shopinformation: {
      description: "Fine luxury desserts and imported sweets.",
      title: "Gourmet Swiss Assorted Chocolate Gift Box",
      condition: "new"
    },
    description: "Elegant wooden box with 36 exquisite truffles and pralines handcrafted by master Swiss chocolatiers using fine cocoa.",
    usersid: "6a25a3b3bd244dc51ebff690",
    shiptocountries: ["NGN"],
    category: "food",
    title: "Gourmet Swiss Chocolate Box",
    delivery: {
      Nigeria: {
        Lagos: 2000,
        FCT: 3000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff690/product15.jpeg": {
        price: 38000
      }
    },
    shares: 6,
    shopid: "6a2ad63a56a9c476cac3fe20",
    productslength: 1,
    likes: 42,
    bookmarks: 8,
    views: 298,
    country: "NG",
    availability_type: "ready",
    subcategory: "sweets",
    delivery_time: {
      duration: "days",
      days: 1
    },
    theprices: [38000],
    orders: 26
  },
  {
    _id: "6a38903e9b6a52edf110a597",
    comments: 9,
    shopinformation: {
      description: "Urban commuting scooters and green mobility technology.",
      title: "Segway Ninebot Max G2 Electric Scooter",
      condition: "new"
    },
    description: "Premium folding commuter scooter with a powerful 1000W motor, reliable dual suspension, self-healing tires, and extended 70km range.",
    usersid: "6a25a3b3bd244dc51ebff691",
    shiptocountries: ["NGN"],
    category: "electronics",
    title: "Segway Ninebot Max G2 Scooter",
    delivery: {
      Nigeria: {
        Lagos: 8000,
        FCT: 12000,
        Rivers: 10000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff691/product16.jpeg": {
        price: 890000
      }
    },
    shares: 17,
    shopid: "6a2ad63a56a9c476cac3fe21",
    productslength: 1,
    likes: 78,
    bookmarks: 21,
    views: 930,
    country: "NG",
    availability_type: "ready",
    subcategory: "scooters",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [890000],
    orders: 8
  },
  {
    _id: "6a38903e9b6a52edf110a598",
    comments: 5,
    shopinformation: {
      description: "Premium coffee appliances and professional accessories.",
      title: "Breville Barista Express Espresso Machine",
      condition: "new"
    },
    description: "All-in-one manual espresso machine with integrated conical burr grinder. Delivers professional third-wave specialty coffee right at home.",
    usersid: "6a25a3b3bd244dc51ebff692",
    shiptocountries: ["NGN"],
    category: "home",
    title: "Breville Barista Espresso Maker",
    delivery: {
      Nigeria: {
        Lagos: 5000,
        FCT: 8000,
        Oyo: 6000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff692/product17.jpeg": {
        price: 950000
      }
    },
    shares: 8,
    shopid: "6a2ad63a56a9c476cac3fe22",
    productslength: 1,
    likes: 51,
    bookmarks: 14,
    views: 610,
    country: "NG",
    availability_type: "ready",
    subcategory: "appliances",
    delivery_time: {
      duration: "days",
      days: 3
    },
    theprices: [950000],
    orders: 9
  },
  {
    _id: "6a38903e9b6a52edf110a599",
    comments: 2,
    shopinformation: {
      description: "Professional power blenders and culinary processors.",
      title: "Vitamix Explorian E310 Professional Blender",
      condition: "new"
    },
    description: "Ten variable speeds allow you to refine every texture with absolute culinary precision, from the heartiest purées to the finest frozen desserts.",
    usersid: "6a25a3b3bd244dc51ebff693",
    shiptocountries: ["NGN"],
    category: "home",
    title: "Vitamix E310 Professional Blender",
    delivery: {
      Nigeria: {
        Lagos: 4000,
        FCT: 6000
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff693/product18.jpeg": {
        price: 480000
      }
    },
    shares: 4,
    shopid: "6a2ad63a56a9c476cac3fe23",
    productslength: 1,
    likes: 38,
    bookmarks: 10,
    views: 390,
    country: "NG",
    availability_type: "ready",
    subcategory: "appliances",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [480000],
    orders: 14
  },
  {
    _id: "6a38903e9b6a52edf110a600",
    comments: 0,
    shopinformation: {
      description: "Premium yoga and fitness mats.",
      title: "Lululemon 5mm Reversible Yoga Mat",
      condition: "new"
    },
    description: "Designed for yoga and training. Natural rubber base gives you cushioning and textured grip for low and high sweat practices.",
    usersid: "6a25a3b3bd244dc51ebff694",
    shiptocountries: ["NGN"],
    category: "home",
    title: "Lululemon 5mm Reversible Yoga Mat",
    delivery: {
      Nigeria: {
        Lagos: 2000,
        FCT: 3000,
        Delta: 3500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff694/product19.jpeg": {
        price: 75000
      }
    },
    shares: 1,
    shopid: "6a2ad63a56a9c476cac3fe24",
    productslength: 1,
    likes: 19,
    bookmarks: 3,
    views: 180,
    country: "NG",
    availability_type: "ready",
    subcategory: "fitness",
    delivery_time: {
      duration: "days",
      days: 2
    },
    theprices: [75000],
    orders: 22
  },
  {
    _id: "6a38903e9b6a52edf110a601",
    comments: 11,
    shopinformation: {
      description: "Luxury makeup and beauty palettes.",
      title: "Dior Backstage Professional Glow Face Palette",
      condition: "new"
    },
    description: "The Dior Backstage Glow Face Palette is the Dior makeup artists' secret weapon for adding instant professional radiance with metallic finishes.",
    usersid: "6a25a3b3bd244dc51ebff695",
    shiptocountries: ["NGN"],
    category: "fashion",
    title: "Dior Glow Face Palette",
    delivery: {
      Nigeria: {
        Lagos: 1500,
        FCT: 2500,
        Kaduna: 2500
      }
    },
    files: {
      "marketplace/6a25a3b3bd244dc51ebff695/product20.jpeg": {
        price: 920000
      }
    },
    shares: 22,
    shopid: "6a2ad63a56a9c476cac3fe25",
    productslength: 1,
    likes: 112,
    bookmarks: 41,
    views: 1040,
    country: "NG",
    availability_type: "ready",
    subcategory: "makeup",
    delivery_time: {
      duration: "days",
      days: 1
    },
    theprices: [92000],
    orders: 43
  }
];

export function getProductImage(productId: string): string {
  const images: { [key: string]: string } = {
    "6a388fd73f375c9c030be83f": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80", // iPhone 15 Pro
    "6a38903e9b6a52edf110a583": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80", // Celebration cake
    "6a38903e9b6a52edf110a584": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", // MacBook Pro
    "6a38903e9b6a52edf110a585": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80", // African luxury suit/Agada
    "6a38903e9b6a52edf110a586": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", // Sony WH-1000XM5
    "6a38903e9b6a52edf110a587": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80", // Nike panda dunks
    "6a38903e9b6a52edf110a588": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", // Gabriella Saffiano Tote
    "6a38903e9b6a52edf110a589": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80", // Office chair
    "6a38903e9b6a52edf110a590": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80", // LG OLED C3 4K TV
    "6a38903e9b6a52edf110a591": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80", // Canon Mirrorless
    "6a38903e9b6a52edf110a592": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80", // Keychron Keyboard
    "6a38903e9b6a52edf110a593": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", // Coral Beads Traditional
    "6a38903e9b6a52edf110a594": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80", // Scented Soy Candles
    "6a38903e9b6a52edf110a595": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", // Leather Jacket
    "6a38903e9b6a52edf110a596": "https://images.unsplash.com/photo-1548907040-4d42b52145ca?auto=format&fit=crop&w=600&q=80", // Chocolates Box
    "6a38903e9b6a52edf110a597": "https://images.unsplash.com/photo-1605342411993-9c8491fc61fb?auto=format&fit=crop&w=600&q=80", // Electric scooter
    "6a38903e9b6a52edf110a598": "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80", // Espresso maker
    "6a38903e9b6a52edf110a599": "https://images.unsplash.com/photo-1578643463396-0997cb5328c1?auto=format&fit=crop&w=600&q=80", // Blender
    "6a38903e9b6a52edf110a600": "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=80", // Yoga mat
    "6a38903e9b6a52edf110a601": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80", // Glowing makeup
  };
  return images[productId] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";
}

export function fetchProductsSimulated(shouldFail = false): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Network connection timeout. Please try again."));
      } else {
        resolve(mockProducts);
      }
    }, 800);
  });
}
