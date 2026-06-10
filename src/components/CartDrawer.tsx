/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, amount: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        setCheckoutComplete(false);
        onClearCart();
        onClose();
      }, 3500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={checkingOut || checkoutComplete ? undefined : onClose}
      />

      {/* Sliding cart items container panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-dark/95 border-l border-white/10 text-white flex flex-col justify-between shadow-2xl relative animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-black/40">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-black tracking-widest text-white uppercase">
                YOUR GEAR DISPATCH
              </span>
              <span className="bg-brand-neon/10 text-brand-neon font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} UNITS
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              disabled={checkingOut || checkoutComplete}
            >
              <X size={20} />
            </button>
          </div>

          {/* Checkout success screen overlay */}
          {checkoutComplete ? (
            <div className="flex-1 px-6 py-20 flex flex-col items-center justify-center text-center gap-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-brand-neon rounded-full flex items-center justify-center text-black mb-2 shadow-[0_0_30px_rgba(195,244,0,0.4)]">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                PROPULSION PACK AUTHORIZED
              </h3>
              <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
                Your high-tech athletics consignment is queued inside our Portland Hub. Tracking telemetry is on its way to your mailbox.
              </p>
              <div className="w-full max-w-[280px] bg-white/5 border border-white/10 px-4 py-3 rounded-md font-mono text-[10px] text-gray-400 mt-2">
                ORDER VALUE: <span className="text-brand-neon font-bold">${subtotal.toFixed(2)}</span>
                <br />
                DISPATCH TIME: <span className="text-white">UNDER 12 HOURS</span>
              </div>
            </div>
          ) : checkingOut ? (
            /* Checkout loading screen */
            <div className="flex-1 px-6 py-20 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-10 h-10 border-2 border-brand-neon/20 border-t-brand-neon rounded-full animate-spin mb-4" />
              <p className="font-mono text-xs tracking-widest text-brand-neon uppercase">
                SECURING PAYWALL TELEMETRY...
              </p>
              <p className="font-sans text-xs text-gray-500 max-w-xs block select-none">
                Verifying stock integrity and compiling lab custom blueprints.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty state */
            <div className="flex-1 px-6 py-20 flex flex-col items-center justify-center text-center gap-4">
              <span className="text-gray-600 font-display text-5xl font-extrabold hero-text-outline uppercase">
                NULL
              </span>
              <p className="font-sans text-xs text-gray-500 max-w-xs">
                Your laboratory shopping dispatch cart contains zero items. Populate it using our Shop All grid or custom labs.
              </p>
              <button
                onClick={onClose}
                className="mt-4 font-mono text-[10px] text-brand-neon uppercase tracking-widest border border-brand-neon/30 hover:border-brand-neon px-5 py-2.5 bg-brand-neon/5 hover:bg-brand-neon/10 transition-colors"
              >
                RETURN TO PRODUCTS
              </button>
            </div>
          ) : (
            /* Interactive active cart product items lists */
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 division-y division-white/10">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-white/5 items-center justify-between group"
                >
                  {/* Photo Thumbnail */}
                  <div className="w-20 h-20 bg-surface-container overflow-hidden shrink-0 border border-white/5 relative">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-300"
                    />
                    <span
                      style={{ backgroundColor: item.colorHex }}
                      className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-black/80"
                      title={item.color}
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-bold tracking-tight text-white uppercase truncate">
                      {item.productName}
                    </h4>
                    <p className="font-mono text-[10px] text-gray-400 mt-0.5 space-x-2">
                      <span>SIZE: {item.size}</span>
                      <span className="text-gray-600">|</span>
                      <span className="text-brand-neon">{item.color}</span>
                    </p>
                    
                    {/* Counters */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 border border-white/10 flex items-center justify-center hover:bg-white/5 disabled:opacity-40"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={10} />
                      </button>
                      
                      <span className="font-mono text-xs w-6 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 border border-white/10 flex items-center justify-center hover:bg-white/5"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Trash & Price */}
                  <div className="flex flex-col items-end gap-3 justify-between">
                    <span className="font-mono text-xs text-brand-neon font-semibold select-none">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                      title="Remove core"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pricing Summary and Submit Panel */}
          {!checkingOut && !checkoutComplete && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/60 relative">
              <div className="space-y-3 mb-6 font-mono text-xs">
                <div className="flex justify-between items-center text-gray-400">
                  <span>ENVIRONMENT CONDUIT</span>
                  <span className="text-white">FREE PORTLAND DISPATCH</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>METADATA SECURE TAXES</span>
                  <span className="text-white">$0.00 (INCLUSIVE)</span>
                </div>
                
                <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                  <span className="text-white uppercase tracking-wider font-bold">TOTAL OUTFLOW</span>
                  <span className="text-xl font-black text-brand-neon font-display tracking-tight leading-none">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500 uppercase mb-4 leading-none">
                <ShieldCheck size={12} className="text-green-500 shrink-0" />
                <span>ALL LAB TRANSACTIONS VERIFIED BY VELOCITY CRADLE</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-brand-neon text-black font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group hover:bg-white transition-colors duration-300 cursor-pointer active:scale-95"
              >
                <span>FINALIZE CONSIGNMENT</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
