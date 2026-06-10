/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings, Sparkles, Check, Info, ShieldCheck, Heart, ShoppingCart } from 'lucide-react';
import { CustomizationOption } from '../types';

interface CustomLabProps {
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

const ACCENT_COLORS = [
  { name: 'Neon Lime', hex: '#CCFF00', shadow: 'rgba(204,255,0,0.4)' },
  { name: 'Electric Cyan', hex: '#00E0FF', shadow: 'rgba(0,224,255,0.4)' },
  { name: 'Hyper Orange', hex: '#FF6B00', shadow: 'rgba(255,107,0,0.4)' },
  { name: 'Volt Pink', hex: '#FF007A', shadow: 'rgba(255,0,122,0.4)' },
  { name: 'Crisp Silver', hex: '#E2E8F0', shadow: 'rgba(226,232,240,0.4)' },
  { name: 'Stealth Ash', hex: '#475569', shadow: 'rgba(71,85,105,0.4)' },
];

export default function CustomLab({ onAddToCart }: CustomLabProps) {
  const [upper, setUpper] = useState<'AeroMesh™' | 'CarbonWeave™' | 'MonoFilament™'>('AeroMesh™');
  const [midsole, setMidsole] = useState<'Nitrous Foam' | 'Propulsion Gel' | 'Standard EVA'>('Nitrous Foam');
  const [outsole, setOutsole] = useState<'Velocity Grip 2.0' | 'Trail Claw' | 'Track Spike'>('Velocity Grip 2.0');
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);
  const [lacesColor, setLacesColor] = useState(ACCENT_COLORS[1]);
  const [size, setSize] = useState('9');
  const [engraving, setEngraving] = useState('KINETIC-77');
  const [added, setAdded] = useState(false);

  // Compute stats on the fly
  const getStats = () => {
    let propulsion = 85;
    let weight = 180; // grams
    let compliance = 70; // cushion
    let price = 195;

    // Upper materials modification
    if (upper === 'CarbonWeave™') {
      propulsion += 8;
      weight += 15;
      price += 25;
    } else if (upper === 'MonoFilament™') {
      propulsion -= 4;
      weight -= 35;
      price += 15;
    }

    // Midsole technology modification
    if (midsole === 'Propulsion Gel') {
      compliance += 20;
      weight += 20;
      propulsion -= 3;
      price += 20;
    } else if (midsole === 'Standard EVA') {
      compliance -= 10;
      propulsion -= 8;
      price -= 25;
    }

    // Outsole modification
    if (outsole === 'Trail Claw') {
      weight += 25;
      compliance += 4;
    } else if (outsole === 'Track Spike') {
      propulsion += 5;
      weight -= 10;
      price += 10;
    }

    return {
      propulsion: Math.min(99, propulsion),
      weight,
      compliance: Math.min(99, compliance),
      price,
    };
  };

  const currentStats = getStats();

  const handleCreate = () => {
    onAddToCart({
      productId: 'custom-lab-sneaker',
      productName: `V-CRAFT ${upper.replace('™', '')} [${engraving || 'CUSTOM'}]`,
      price: currentStats.price,
      color: `${accent.name} / ${lacesColor.name}`,
      colorHex: accent.hex,
      size,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8nGJtBdSYGCblq-ZEL0xwxjqfJbUYRiND0jQgu6-WSEG_NE9o_sYKIi04c-nxm_Mc6JLTQ8srAceTQSy-LSZIaL0c8fZqJVQu_BxyLjY9rjDfqXHM8YUfRl2onNSAj79ok71RR3DHx2GYbVpoahqXF7E9NuY01CfuLGH6Jkht1_6r3QWn4R1emRXi79twPmeNEUfLaiP3FumG0DtHI2nc1i8kHqUCPvTSIGcqJhDv-RMxgESSLLyii4n-sSXEmqYyGYTOpkI_pVY-',
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <section className="min-h-screen pt-24 pb-32 bg-[#121212] blueprint-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Intro */}
        <div className="mb-12 border-l-4 border-brand-neon pl-6">
          <span className="font-mono text-xs text-brand-neon uppercase tracking-widest block">
            SPEED LAB RESEARCH FLUID
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold uppercase mt-1 tracking-tight text-white">
            CUSTOM LAB DESIGN SUITE
          </h1>
          <p className="font-sans text-sm text-gray-400 max-w-xl mt-2 leading-relaxed">
            Construct high-frequency speed configurations using full modularity models. Specify parameters below to compile physical running structures immediately.
          </p>
        </div>

        {/* Blueprint view and parameters splitting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* SNEAKER INTERACTIVE MOCKUP VIEW */}
          <div className="lg:col-span-7 bg-[#171818]/90 border border-white/5 p-8 relative flex flex-col justify-between aspect-[4/3] rounded-sm shadow-xl mt-2 overflow-hidden">
            
            {/* HUD Metadata metrics overlays */}
            <div className="flex justify-between items-start z-10">
              <div className="font-mono text-[10px] text-gray-500 space-y-1">
                <p>LAB_STATION_REF: <span className="text-white">PDX_009</span></p>
                <p>STATUS: <span className="text-brand-neon animate-pulse">● HEEL_PLATE_ACTIVE</span></p>
              </div>

              <div className="font-mono text-[10px] text-right text-gray-500 space-y-1">
                <p>ENGRAVING_STRING: <span className="text-brand-cyan select-all">{engraving || 'N/A'}</span></p>
                <p>WEIGHT_CLASS: <span className="text-white">{currentStats.weight}g (FEATHER)</span></p>
              </div>
            </div>

            {/* HIGH END SNEAKER CONCEPTUAL ART ILLUSTRATION WITH SELECTABLE ACCENT SHADOWS */}
            <div className="relative w-full flex items-center justify-center py-10">
              
              {/* Dynamic Aura Glow reflecting accent selection */}
              <div
                className="absolute w-56 h-32 rounded-full blur-[80px] opacity-35 transition-all duration-1000 -translate-y-4"
                style={{
                  backgroundColor: accent.hex,
                }}
              />

              <div className="relative select-none max-w-[440px] md:max-w-[480px]">
                {/* Primary sneaker outline skeleton image */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8nGJtBdSYGCblq-ZEL0xwxjqfJbUYRiND0jQgu6-WSEG_NE9o_sYKIi04c-nxm_Mc6JLTQ8srAceTQSy-LSZIaL0c8fZqJVQu_BxyLjY9rjDfqXHM8YUfRl2onNSAj79ok71RR3DHx2GYbVpoahqXF7E9NuY01CfuLGH6Jkht1_6r3QWn4R1emRXi79twPmeNEUfLaiP3FumG0DtHI2nc1i8kHqUCPvTSIGcqJhDv-RMxgESSLLyii4n-sSXEmqYyGYTOpkI_pVY-"
                  alt="Sneaker Prototype Frame"
                  className="w-full h-auto object-contain brightness-[0.8] grayscale hover:grayscale-0 transition-all duration-700 select-none pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />

                {/* Simulated Laser Alignment overlays projecting selection */}
                <div className="absolute top-1/2 left-10 right-10 flex justify-between uppercase font-mono text-[9px] text-white/20 select-nonepointer-events-none">
                  <span>◀ {upper}</span>
                  <span className="text-right">{midsole} ▶</span>
                </div>

                {/* Laser lines */}
                <div
                  className="absolute bottom-1/4 left-1/4 right-[35%] h-[1px] opacity-80 animate-pulse transition-all duration-500"
                  style={{ backgroundColor: accent.hex }}
                />
              </div>

              {/* Dynamic digital engraving projection indicator */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 border-l border-white/20 pl-3 font-mono text-[9px] text-gray-500 bg-black/40 py-1.5 px-3 rounded-r-md select-none">
                <span className="text-white">HEEL CORE ENGR:</span>
                <span className="text-brand-neon tracking-widest uppercase font-bold">{engraving || 'N/A'}</span>
              </div>
            </div>

            {/* LIVE PERFORMANCE METERS HUD */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4 z-10">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>PROPULSION COEFFICIENT</span>
                  <span className="text-white text-[11px] font-bold">{currentStats.propulsion}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-neon transition-all duration-500"
                    style={{ width: `${currentStats.propulsion}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>ENERGY RETURN SYSTEM</span>
                  <span className="text-white text-[11px] font-bold">{currentStats.compliance}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E0FF] transition-all duration-500"
                    style={{ width: `${currentStats.compliance}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <span>FEATHERWEIGHT STATUS</span>
                  <span className="text-white text-[11px] font-bold">{((400 - currentStats.weight)/400*100).toFixed(0)}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 transition-all duration-500"
                    style={{ width: `${((400 - currentStats.weight)/400*100)}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* DYNAMIC PARAMETERS SELECTOR SIDEBAR PANEL */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Spec Options Card */}
            <div className="bg-[#171818] border border-white/5 p-6 rounded-sm space-y-5 shadow-xl">
              <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                <Settings size={18} className="text-brand-neon" />
                <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">
                  SPECIFICATION LAYERS
                </h3>
              </div>

              {/* SECTION 1: UPPER MESH WEAVE */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  1. UPPER HOUSING WEAVE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'AeroMesh™', desc: 'Breathable 0.8mm' },
                    { name: 'CarbonWeave™', desc: '+Propulsion premium' },
                    { name: 'MonoFilament™', desc: 'Featherweight shell' },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setUpper(opt.name as any)}
                      className={`p-3 text-left border flex flex-col justify-between transition-all cursor-pointer ${
                        upper === opt.name
                          ? 'border-brand-neon bg-brand-neon/5'
                          : 'border-white/10 hover:border-white/20 bg-black/20'
                      }`}
                    >
                      <span className="font-display text-[11px] font-bold text-white uppercase">{opt.name}</span>
                      <span className="font-mono text-[9px] text-gray-500 mt-1 block leading-none">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 2: MIDSOLE ACTIVE CORE */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  2. MIDSOLE PROPULSIVE CELL
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Nitrous Foam', desc: '85% active rebound' },
                    { name: 'Propulsion Gel', desc: 'Max compliance' },
                    { name: 'Standard EVA', desc: 'Raw pavement trial' },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setMidsole(opt.name as any)}
                      className={`p-3 text-left border flex flex-col justify-between transition-all cursor-pointer ${
                        midsole === opt.name
                          ? 'border-brand-neon bg-brand-neon/5'
                          : 'border-white/10 hover:border-white/20 bg-black/20'
                      }`}
                    >
                      <span className="font-display text-[11px] font-bold text-white uppercase">{opt.name}</span>
                      <span className="font-mono text-[9px] text-gray-500 mt-1 block leading-none">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: OUTSOLE CLAWS */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  3. TRACTION COMPOUND TREADS
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Velocity Grip 2.0', desc: 'Road dry grip' },
                    { name: 'Trail Claw', desc: 'Deep mud safety' },
                    { name: 'Track Spike', desc: 'Speed metal layout' },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setOutsole(opt.name as any)}
                      className={`p-3 text-left border flex flex-col justify-between transition-all cursor-pointer ${
                        outsole === opt.name
                          ? 'border-brand-neon bg-brand-neon/5'
                          : 'border-white/10 hover:border-white/20 bg-black/20'
                      }`}
                    >
                      <span className="font-display text-[11px] font-bold text-white uppercase">{opt.name}</span>
                      <span className="font-mono text-[9px] text-gray-500 mt-1 block leading-none">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 4: INTENSIVE ENVELOPE ACCENT COLORWAYS */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  4. EMISSION GLOW TINT
                </label>
                <div className="flex gap-3">
                  {ACCENT_COLORS.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setAccent(col)}
                      className={`w-9 h-9 rounded-full relative transition-all duration-300 cursor-pointer ${
                        accent.name === col.name
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#131313]'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: col.hex,
                        boxShadow: accent.name === col.name ? `0 0 15px ${col.shadow}` : 'none',
                      }}
                      title={col.name}
                    >
                      {accent.name === col.name && (
                        <Check size={12} className="text-black absolute inset-0 m-auto font-bold" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 5: RETRO LASER LACE COORDINATION */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  5. LASER SECURED LACES COLOR
                </label>
                <div className="flex gap-3">
                  {ACCENT_COLORS.map((col) => (
                    <button
                      key={`lace-${col.name}`}
                      onClick={() => setLacesColor(col)}
                      className={`w-9 h-9 rounded-full relative transition-all duration-300 cursor-pointer ${
                        lacesColor.name === col.name
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#131313]'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: col.hex,
                        boxShadow: lacesColor.name === col.name ? `0 0 15px ${col.shadow}` : 'none',
                      }}
                      title={col.name}
                    >
                      {lacesColor.name === col.name && (
                        <Check size={12} className="text-black absolute inset-0 m-auto font-bold" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 6: SIZES */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                    6. STRUCTURAL CALIBRATED SIZE (MEN)
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono text-center">
                  {['7', '8', '8.5', '9', '9.5', '10', '11', '12'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      className={`py-2 text-xs transition-colors border cursor-pointer ${
                        size === sz
                          ? 'border-brand-neon bg-brand-neon text-black font-extrabold'
                          : 'border-white/10 hover:border-white/30 text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 7: ENGRIBING FOOTPLATE BADGE */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">
                  7. PORTLAND ENGRAVED HEELPLATE CODE (MAX 10)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  placeholder="ATHLETE CODE / SKUID"
                  className="w-full bg-black/40 border-2 border-white/10 focus:border-brand-neon focus:ring-0 text-white py-3 px-4 outline-none font-mono text-xs uppercase"
                />
              </div>

            </div>

            {/* Price Output summary card */}
            <div className="bg-brand-neon/5 border-2 border-brand-neon/20 p-6 rounded-sm text-white space-y-4 shadow-xl">
              <div className="flex justify-between items-end border-b border-brand-neon/10 pb-3">
                <div>
                  <span className="font-mono text-[10px] text-brand-neon uppercase tracking-widest block">
                    V-CRAFT LAB UNIT PRICE
                  </span>
                  <span className="font-display text-xs font-bold text-gray-400 block mt-1 uppercase">
                    ENGRAVING & SHIPPING COMPLIMENTARY
                  </span>
                </div>
                <div className="font-display text-3xl font-black text-brand-neon tracking-tight">
                  ${currentStats.price.toFixed(2)}
                </div>
              </div>

              {/* Checkout details guarantee lists */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase">
                <ShieldCheck size={14} className="text-brand-neon" />
                <span>ASSEMBLY AND FLUID DISPATCH AT PORTLAND HUB</span>
              </div>

              <button
                onClick={handleCreate}
                className="w-full py-4 bg-brand-neon text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 select-none active:scale-95 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>CONSGNMENT CREATED AND DEPOSITED</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={15} />
                    <span>ADD LAB PRODUCT TO DISPATCH BAG</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
