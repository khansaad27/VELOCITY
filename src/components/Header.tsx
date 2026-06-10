/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, X, Settings, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  activeTab: 'home' | 'detail' | 'lab' | 'tech';
  onTabChange: (tab: 'home' | 'detail' | 'lab' | 'tech') => void;
  onViewProduct: (productId: string) => void;
}

export default function Header({
  cartCount,
  onCartClick,
  activeTab,
  onTabChange,
  onViewProduct,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Shop All', value: 'home' as const },
    { label: 'Propulsion K1', value: 'detail' as const },
    { label: 'Custom Lab', value: 'lab' as const },
    { label: 'Science Lab', value: 'tech' as const },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/10">
      <nav className="flex justify-between items-center px-6 md:px-16 h-16 w-full max-w-7xl mx-auto">
        
        {/* Brand Brand logo & Mobile menu trigger */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-brand-neon active:scale-95 transition-all duration-100 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <button
            id="brand-logo"
            onClick={() => {
              onTabChange('home');
              setMobileMenuOpen(false);
            }}
            className="font-display text-2xl font-black tracking-tighter text-white hover:text-brand-neon transition-colors cursor-pointer"
          >
            VELOCITY
          </button>
        </div>

        {/* Global tab Switcher navigation (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.value;
            return (
              <button
                key={item.value}
                id={`nav-${item.value}`}
                onClick={() => onTabChange(item.value)}
                className={`font-mono text-[11px] uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-white border-brand-neon font-bold'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Cart trigger and Quick links */}
        <div className="flex items-center gap-6">
          <button
            id="quick-product-trigger"
            onClick={() => onViewProduct('velocity-kinetic')}
            className="text-gray-400 hover:text-brand-neon active:scale-95 transition-all duration-100 flex items-center gap-1.5 text-xs font-mono tracking-wider"
            title="Fast track to featured product"
          >
            <Search size={18} />
            <span className="hidden sm:inline">LAUNCH LAB</span>
          </button>

          <button
            id="cart-icon-button"
            onClick={onCartClick}
            className="text-white hover:text-brand-neon active:scale-95 transition-all duration-100 relative cursor-pointer"
            aria-label="Open shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-neon text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#131313]/98 border-b border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col py-6 px-8 gap-4 font-mono">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onTabChange(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left uppercase text-xs tracking-widest py-2 border-l-2 pl-4 transition-all ${
                  activeTab === item.value
                    ? 'border-brand-neon text-white font-bold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
