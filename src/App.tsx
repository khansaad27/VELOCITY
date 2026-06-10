/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingCart, Sparkles, Zap, Shield, Search, CheckCircle } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CustomLab from './components/CustomLab';
import ProductDetail from './components/ProductDetail';
import TechLab from './components/TechLab';
import { products, staticContent } from './data';
import { CartItem, Product } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'detail' | 'lab' | 'tech'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  
  // Local quick UI interactions
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [notifyHeart, setNotifyHeart] = useState<string | null>(null);

  // Scroll reference for arrivals
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cart operations
  const handleAddToCart = (item: {
    productId: string;
    productName: string;
    price: number;
    color: string;
    colorHex: string;
    size: string;
    image: string;
  }) => {
    const itemId = `${item.productId}-${item.color}-${item.size}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          color: item.color,
          colorHex: item.colorHex,
          size: item.size,
          image: item.image,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + amount;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // View specific product action
  const handleViewProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
      setActiveTab('detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle wishlist state
  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    setNotifyHeart(productId);
    setTimeout(() => setNotifyHeart(null), 2000);
  };

  // Sorter helpers for horizontal arrivals
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Total items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter listed products based on query if search is visible
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#131313] text-on-background min-h-screen relative overflow-x-hidden select-none selection:bg-brand-neon selection:text-black">
      
      {/* Global Navigation Header */}
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewProduct={handleViewProduct}
      />

      {/* VIEWPORT CONTROLLER MODULE */}
      <main className="w-full">
        {activeTab === 'home' ? (
          <div>
            
            {/* SEARCH BANNER COLLAPSIBLE */}
            <div className="bg-brand-dark/95 border-b border-white/5 pt-20 px-6 max-w-7xl mx-auto">
              <div className="flex items-center gap-3 py-3 border-b border-white/10 max-w-lg mx-auto">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH PERFORMANCE CORES (E.G. KINETIC)"
                  className="bg-transparent border-none outline-none focus:ring-0 w-full font-mono text-xs uppercase text-white placeholder:text-gray-600 block py-1"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-mono text-gray-500 hover:text-white"
                  >
                    RESET
                  </button>
                )}
              </div>
            </div>

            {/* SECTION 1: CINEMATIC HERO SLATE VIEW */}
            <section className="relative h-screen w-full flex items-center overflow-hidden pt-16">
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                  className="w-full h-full object-cover grayscale-[0.1] brightness-[0.65] transition-transform duration-1000 scale-102"
                  alt="High-Performance Running Sneaker hero"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8nGJtBdSYGCblq-ZEL0xwxjqfJbUYRiND0jQgu6-WSEG_NE9o_sYKIi04c-nxm_Mc6JLTQ8srAceTQSy-LSZIaL0c8fZqJVQu_BxyLjY9rjDfqXHM8YUfRl2onNSAj79ok71RR3DHx2GYbVpoahqXF7E9NuY01CfuLGH6Jkht1_6r3QWn4R1emRXi79twPmeNEUfLaiP3FumG0DtHI2nc1i8kHqUCPvTSIGcqJhDv-RMxgESSLLyii4n-sSXEmqYyGYTOpkI_pVY-"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-black/20" />
              </div>

              {/* Foreground details */}
              <div className="relative z-10 px-6 md:px-16 w-full max-w-7xl mx-auto pointer-events-none">
                <div className="flex flex-col items-start select-none">
                  <span className="font-mono text-[10px] text-brand-neon tracking-[0.4em] mb-4 font-black">
                    LAB STATION SPRING / SUMMER 26
                  </span>
                  
                  <h1 className="font-display text-5xl md:text-[130px] leading-[0.85] text-white flex flex-col uppercase italic font-black tracking-tight">
                    <span className="hero-text-outline">ENGINEERED</span>
                    <span className="relative mt-2 md:mt-4">
                      FOR <span className="text-brand-neon not-italic">SPEED</span>
                    </span>
                  </h1>

                  <div className="mt-12 pointer-events-auto flex items-center gap-4">
                    <button
                      onClick={() => handleViewProduct('velocity-kinetic')}
                      className="inline-flex items-center justify-center px-8 py-4 bg-brand-neon text-black font-mono text-[11px] uppercase font-black tracking-widest cursor-pointer hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(195,244,0,0.15)] active:scale-95"
                    >
                      EXPLORE PROPULSION V1
                    </button>
                    
                    <button
                      onClick={() => {
                        setActiveTab('lab');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hidden sm:inline-flex items-center justify-center px-6 py-4 border border-white/20 text-white font-mono text-[11px] uppercase font-semibold tracking-widest cursor-pointer hover:bg-white/5 transition-colors duration-300"
                    >
                      CUSTOMIZE CORES
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: NEW ARRIVALS HORIZONTAL SWIPER LAYOUT */}
            <section className="py-24 bg-[#131313] overflow-hidden border-t border-white/5">
              <div className="px-6 md:px-16 max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                    LAB ROTATIONAL RELEASES
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-black uppercase mt-1 tracking-tight text-white">
                    DROP 004 / CARBON
                  </h2>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleScroll('left')}
                    className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:border-brand-neon hover:text-black transition-all duration-200 active:scale-90 cursor-pointer text-white"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handleScroll('right')}
                    className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-brand-neon hover:border-brand-neon hover:text-black transition-all duration-200 active:scale-90 cursor-pointer text-white"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Swipe list */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto hide-scrollbar px-6 md:px-16 pb-8 select-none"
              >
                {filteredProducts.map((prod) => {
                  const isWish = wishlistIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleViewProduct(prod.id)}
                      className="min-w-[280px] md:min-w-[400px] group cursor-pointer flex-shrink-0"
                    >
                      <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-5 border border-white/5 group-hover:border-brand-neon transition-all duration-300 relative">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:grayscale-[0.1] transition-transform duration-700 pb-2 bg-gradient-to-b from-[#1c1c1c] to-[#121212]"
                          alt={prod.name}
                          src={prod.image}
                        />

                        {/* Favorite button overlay */}
                        <button
                          onClick={(e) => handleToggleWishlist(prod.id, e)}
                          className="absolute top-4 right-4 w-9 h-9 bg-[#131313]/90 backdrop-blur border border-white/10 flex items-center justify-center hover:border-brand-cyan text-white transition-colors cursor-pointer"
                        >
                          <Heart size={14} fill={isWish ? '#E11D48' : 'none'} className={isWish ? 'text-red-500 animate-pulse' : ''} />
                        </button>

                        {/* Added notice glow widget */}
                        {notifyHeart === prod.id && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-mono text-[10px] tracking-widest text-brand-neon bg-opacity-70 animate-fade-in uppercase">
                            WISHLIST_METRIC_SET
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                            {prod.subCategory || 'VELOCITY DIVISION'}
                          </span>
                          <h3 className="font-display text-lg font-bold uppercase mt-0.5 text-white tracking-wide">
                            {prod.name}
                          </h3>
                        </div>
                        <span className="font-mono text-sm text-brand-neon font-semibold">
                          ${prod.price.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: BEST SELLERS VERTICAL BENTO ROAD GRID MAP */}
            <section className="py-24 bg-surface-container-lowest border-y border-white/5">
              <div className="px-6 md:px-16 max-w-7xl mx-auto">
                
                <div className="mb-16 border-l-4 border-brand-neon pl-6 select-none">
                  <span className="font-mono text-[10px] text-brand-neon uppercase tracking-widest block font-bold">
                    GLOBAL TRACK REPORTING
                  </span>
                  <h2 className="font-display text-3xl md:text-5xl font-black uppercase mt-1 tracking-tight text-white">
                    ELITE SELECTION MODEL UNITS
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* HERO BENTO SPOTLIGHT SLOT (Col-span-8) */}
                  <div
                    onClick={() => handleViewProduct('aero-strike-01')}
                    className="lg:col-span-8 group relative overflow-hidden bg-brand-dark border border-white/5 hover:border-brand-neon cursor-pointer transition-all duration-300 shadow-xl"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden select-none">
                      <img
                        className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-102"
                        alt="High energy orange shoe visual"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY2Y9_T6R_CVTuYnZpvsf00vzlMFNJ64akKvApRGrSwSUSZCBau2MsdLdi7084cvDXPuJaLdilmdevTLg2OikPWDbF7JBNZlTxVYgTUmiN00g1jEqjpLg9DdObZBIiv-HsXD6CJ9oD8U3qdUk4U813o9ev4VLvIxp0y8ffvI0XjNQcH8znWMcwQ3bvy_o3fqpujwXqkPzwqs6JTnG0qPAzPHGS3pgRe1da-Z9iWFpSOjM0WR_HgSsPXVyFisi-Mk6OsQzqW-BaWbzO"
                      />
                    </div>
                    
                    <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5 font-mono text-[9px] text-brand-neon uppercase">
                            <Zap size={12} />
                            <span>COATED DENSE RUNNER LEVEL_01</span>
                          </div>
                          
                          <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase leading-none text-white tracking-wide">
                            AERO STRIKE 01
                          </h3>
                          
                          <p className="font-sans text-xs text-gray-400 mt-2 max-w-md font-normal leading-relaxed">
                            The absolute peak of light propulsion models. Engineered under extreme marathons to maximize speed.
                          </p>
                        </div>
                        
                        <button className="bg-brand-neon text-black px-6 py-3 font-mono text-[10px] font-bold uppercase hover:bg-white transition-colors cursor-pointer text-center whitespace-nowrap self-start shrink-0">
                          LAUNCH CORE SPECS
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SMALL COLUMNS Bento Items */}
                  {products.filter(p => p.id !== 'aero-strike-01' && p.id !== 'velocity-kinetic' && p.id !== 'velocity-nitro-red').slice(0, 4).map((p) => {
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleViewProduct(p.id)}
                        className="lg:col-span-4 flex flex-col group cursor-pointer"
                      >
                        <div className="aspect-square bg-surface-container overflow-hidden mb-4 border border-white/5 group-hover:border-brand-neon transition-all duration-300 relative">
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            alt={p.name}
                            src={p.image}
                          />
                        </div>
                        
                        <div className="flex justify-between items-center px-1">
                          <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                            {p.name}
                          </h4>
                          <span className="font-mono text-xs text-brand-neon font-semibold">
                            ${p.price.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                </div>

              </div>
            </section>

            {/* SECTION 4: HIGH IMPACT CUSTOM LAB BANNER LINK */}
            <section className="relative py-32 overflow-hidden group border-t border-white/5 select-none font-display">
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover brightness-[0.35] grayscale group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000"
                  alt="Sneaker design workshop"
                  src={staticContent.customLabBanner}
                />
                <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-color" />
              </div>

              <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto text-center flex flex-col items-center">
                <span className="font-mono text-[10px] text-brand-cyan uppercase tracking-[0.4em] mb-4 font-black">
                  VELOCITY LAB CREATION STATIONS
                </span>
                
                <h2 className="font-display text-4xl md:text-8xl leading-none uppercase font-black text-white italic tracking-tight">
                  DESIGN YOUR OWN <br />
                  <span className="hero-text-outline">IDENTITY</span>
                </h2>
                
                <p className="font-sans text-xs md:text-sm text-gray-300 max-w-xl mb-10 leading-relaxed font-normal mt-4">
                  Construct personal athletic footwear matching your body’s requirements. Pick custom Aeromesh weaves, supercritical foams, and personalized engravings at our Portland Lab.
                </p>

                <button
                  onClick={() => {
                    setActiveTab('lab');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-brand-cyan text-black px-10 py-5 font-mono text-[11px] uppercase font-black hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,224,255,0.25)] cursor-pointer active:scale-95"
                >
                  START LAB WORKSTATION
                </button>
              </div>
            </section>

            {/* SECTION 5: SPLIT SCIENCE DETAIL ACCORDION (Science overview) */}
            <section className="py-24 bg-[#131313] border-t border-white/5">
              <div className="px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <div>
                  <span className="font-mono text-[10px] text-brand-neon uppercase tracking-widest block font-bold">
                    PROPULSION BIO-TELEMETRY
                  </span>
                  
                  <h2 className="font-display text-3xl md:text-5xl font-black uppercase mt-1 tracking-tight text-white mb-10 leading-none">
                    THE SCIENCE OF FAST
                  </h2>
                  
                  <ul className="flex flex-col gap-6">
                    <li
                      onClick={() => {
                        setActiveTab('tech');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex justify-between items-center pb-4 border-b border-white/10 group cursor-pointer"
                    >
                      <span className="font-mono text-[11px] uppercase text-gray-400 group-hover:text-brand-neon transition-colors">
                        AeroMesh™ Upper Weaves
                      </span>
                      <span className="font-sans text-xs text-white">
                        Ultra-breathable 0.8mm matrix
                      </span>
                    </li>

                    <li
                      onClick={() => {
                        setActiveTab('tech');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex justify-between items-center pb-4 border-b border-white/10 group cursor-pointer"
                    >
                      <span className="font-mono text-[11px] uppercase text-gray-400 group-hover:text-brand-neon transition-colors">
                        Supercritical Nitrous Foam
                      </span>
                      <span className="font-sans text-xs text-white">
                        85% raw energy returns
                      </span>
                    </li>

                    <li
                      onClick={() => {
                        setActiveTab('tech');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex justify-between items-center pb-4 border-b border-white/10 group cursor-pointer"
                    >
                      <span className="font-mono text-[11px] uppercase text-gray-400 group-hover:text-brand-neon transition-colors">
                        Rigid Carbon Spine Plates
                      </span>
                      <span className="font-sans text-xs text-white">
                        Full-length explosive transitions
                      </span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => {
                      setActiveTab('tech');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-8 font-mono text-[10px] text-brand-neon tracking-wider uppercase flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <span>LAUNCH BIO-METERS LABORATORY</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="bg-[#1b1c1c] p-6 border border-white/10 relative overflow-hidden shadow-2xl rounded-sm">
                  <img
                    className="w-full h-auto object-cover border border-brand-neon/30 grayscale hover:grayscale-0 transition-transform duration-700"
                    alt="Precision closeup weave"
                    src={staticContent.scienceOfFastGrid}
                  />
                  <div className="absolute top-10 left-10 bg-black/80 backdrop-blur px-3 py-1.5 border-l-2 border-brand-neon text-white font-mono text-[9px] uppercase tracking-wider">
                    SPEC_PATTERN: PDX_Y9
                  </div>
                </div>

              </div>
            </section>

          </div>
        ) : activeTab === 'detail' ? (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
          />
        ) : activeTab === 'lab' ? (
          <CustomLab
            onAddToCart={handleAddToCart}
          />
        ) : (
          <TechLab />
        )}
      </main>

      {/* Global generic footer info */}
      <Footer onTabChange={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Persistent slide-out cart overlay */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
