/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Star, Heart, ShoppingCart, HelpCircle, AlertCircle, RefreshCw, Layers, MapPin, Sparkles } from 'lucide-react';
import { Product, Colorway } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: {
    productId: string;
    productName: string;
    price: number;
    color: string;
    colorHex: string;
    size: string;
    image: string;
  }) => void;
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  // Use first colorway as default
  const [activeColorway, setActiveColorway] = useState<Colorway>(product.colorways[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('9');
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  // Accordion lists
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Sync colorways if product changes
  useEffect(() => {
    setActiveColorway(product.colorways[0]);
    setActiveImageIndex(0);
  }, [product]);

  const handleColorwayChange = (cw: Colorway) => {
    setActiveColorway(cw);
    setActiveImageIndex(0);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      productName: product.name,
      price: product.price,
      color: activeColorway.name,
      colorHex: activeColorway.hex,
      size: selectedSize,
      image: activeColorway.images[0] || product.image,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  // Sections details maps
  const infoSections = [
    {
      id: 'sustainability',
      label: 'Sustainability Matrix',
      content: 'Crafted with 45% recycled post-consumer AeroWeave™ yarns and synthesized solvent-free water base bonding adhesives to reduce raw emissions by 30% relative to Drop 003 specifications.',
    },
    {
      id: 'origin',
      label: 'Track Origin SKU',
      content: 'Engineered at Portland High-Performance Labs. Assembled inside facility sub-cell PDX-W9 under ultra-clean vacuum parameters. Origin: United States.',
    },
    {
      id: 'delivery',
      label: 'Delivery & Returns Dispatch',
      content: 'Complimentary standard dispatch on all performance tiers. Form-fitting laboratory exchanges permitted within 30 days of tracking signature verification.',
    }
  ];

  return (
    <section className="min-h-screen pt-24 pb-48 bg-[#131313]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Navigation Breadcrumb trail */}
        <div className="flex items-center gap-2 mb-8 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          <span className="hover:text-white cursor-pointer hover:underline">VELOCITY CORES</span>
          <ChevronRight size={12} />
          <span className="hover:text-white cursor-pointer hover:underline">{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-brand-neon">{product.name}</span>
        </div>

        {/* Details Grid layout mirroring the second design screenshot exactly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* LEFT: GALLERY PORTFOLIO (Col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main view frame */}
            <div className="aspect-[4/5] bg-surface-container-lowest overflow-hidden border border-white/5 relative group select-none">
              <img
                src={activeColorway.images[activeImageIndex] || product.image}
                alt={`${product.name} Featured View`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Image metadata overlay indicator */}
              <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 border-l-2 border-brand-neon font-mono text-[9px] uppercase tracking-wider text-gray-400">
                ACTIVE_SPECS_ANGLE: 0{activeImageIndex + 1}_V1
              </div>
            </div>

            {/* Selector thumbnail list */}
            <div className="grid grid-cols-3 gap-3">
              {activeColorway.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-square bg-surface-container-lowest overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-brand-neon'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Angle View ${idx + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: BUY COLUMN DETAILS SECTION (Col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Meta badges - Title - Swatches info */}
            <div>
              <div className="inline-block bg-brand-neon text-black font-mono text-[9px] px-3 py-1 uppercase tracking-widest font-black mb-4">
                {product.subCategory || 'NEW ARRIVAL'}
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-none mb-1">
                {product.name}
              </h1>
              
              <p className="font-mono text-xl text-brand-neon font-bold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Technical description */}
            <div className="space-y-3">
              <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                TECHNICAL SPECIFICATIONS
              </h3>
              <p className="font-sans text-sm text-gray-300 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Color Swatch selector */}
            <div className="space-y-3">
              <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                SELECT VELOCITYWAY
              </h3>
              
              <div className="flex gap-4">
                {product.colorways.map((cw) => {
                  const isActive = activeColorway.name === cw.name;
                  return (
                    <button
                      key={cw.name}
                      onClick={() => handleColorwayChange(cw)}
                      className={`w-12 h-12 relative border-2 cursor-pointer transition-transform ${
                        isActive
                          ? 'border-brand-cyan scale-105'
                          : 'border-white/15 opacity-60 hover:opacity-100 hover:scale-102'
                      }`}
                      style={{ backgroundColor: cw.hex }}
                      title={cw.name}
                    >
                      {isActive && (
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#131313]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizing grid exactly mimicking the screenshot */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <h3 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  SIZE (US MEN)
                </h3>
                <button className="font-mono text-[10px] underline text-gray-400 hover:text-white cursor-pointer decoration-white/20">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center font-mono text-xs">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3.5 border cursor-pointer transition-colors ${
                        isSelected
                          ? 'border-brand-neon bg-brand-neon/10 text-brand-neon font-black'
                          : 'border-white/10 hover:border-white/30 text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
                {/* Disabled size to mirror the screenshot exactly */}
                <button
                  disabled
                  className="py-3.5 border border-white/5 opacity-35 text-gray-600 font-mono text-xs cursor-not-allowed"
                >
                  12
                </button>
              </div>
            </div>

            {/* Disclosures accordions (Matrix, Origin, Returns) */}
            <div className="border-t border-white/10 py-4 divide-y divide-white/5">
              {infoSections.map((sec) => {
                const isOpen = expandedSection === sec.id;
                return (
                  <div key={sec.id} className="py-4">
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className="w-full flex justify-between items-center text-left font-mono text-[11px] uppercase tracking-widest text-white hover:text-brand-neon transition-colors cursor-pointer"
                    >
                      <span>{sec.label}</span>
                      <span className={`text-base transition-transform ${isOpen ? 'rotate-90 text-brand-neon' : ''}`}>
                        →
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-3 font-sans text-xs text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-1">
                        {sec.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bento style high energy speed card */}
            <div className="bg-[#1b1c1c] p-6 border border-white/5 relative overflow-hidden group rounded-sm shadow-lg">
              <div className="relative z-10 space-y-2">
                <h4 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                  PROPULSION CELL TECH
                </h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
                  A vacuum-sealed carbon plate embedded within the dual-density foam reacting to your gait cycle dynamically.
                </p>
                <div className="h-[2px] w-12 bg-brand-cyan mt-3" />
              </div>
              <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-15 transition-opacity text-brand-cyan">
                <Sparkles size={100} />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* STICKY BOTTOM ACTIONS FOOTER BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-white/10 z-30 shadow-[0_-10px_35px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
          
          {/* Metadata selection overview */}
          <div className="hidden md:flex flex-col font-mono">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              SELECTED CORE UNIT: {activeColorway.name} (SZ {selectedSize})
            </span>
            <span className="text-lg font-display text-white font-black uppercase mt-0.5 tracking-tight">
              {product.name} — <span className="text-brand-neon">${product.price.toFixed(2)}</span>
            </span>
          </div>

          {/* Cart triggers */}
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleAddToCart}
              className="flex-grow md:w-72 h-12 bg-brand-cyan text-black font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white select-none active:scale-95 cursor-pointer"
            >
              {added ? (
                <>
                  <Layers size={14} className="animate-spin" />
                  <span>CORE ADDED TO DISPATCH</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>ADD ITEM TO DISPATCH BAG</span>
                </>
              )}
            </button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 border flex items-center justify-center transition-colors cursor-pointer ${
                wishlisted
                  ? 'border-red-600 bg-red-600/10 text-red-500'
                  : 'border-white/15 hover:border-brand-cyan'
              }`}
              title="Add to wish list"
            >
              <Heart size={18} fill={wishlisted ? '#E11D48' : 'none'} />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
