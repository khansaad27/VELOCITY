/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Zap, Anchor, ShieldCheck, Cpu, Play } from 'lucide-react';

export default function TechLab() {
  const [activeSpec, setActiveSpec] = useState('aeromesh');

  const specs = [
    {
      id: 'aeromesh',
      title: 'AeroMesh™ Upper',
      sub: 'Ultra-breathable 0.8mm Weave Matrix',
      description: 'Woven using dual-filament continuous thermoplastic fibers. The structured hollow micro-tubes encourage active heat extraction and fluid drainage during high-speed runs.',
      metrics: { Response: 88, Weight: 15, Adaptability: 95, EnergyReturn: 40 },
      icon: <Layers size={18} />
    },
    {
      id: 'nitrous',
      title: 'Nitrous Foam Midsole',
      sub: 'Supercritical Nitrogen-Injected Energy Rebound',
      description: 'Manufactured under extreme pressure conditions to lock custom microscopic pockets of reactive gas into specialized elastomers, releasing 85% energy returns on heel strikes.',
      metrics: { Response: 98, Weight: 45, Adaptability: 80, EnergyReturn: 95 },
      icon: <Zap size={18} />
    },
    {
      id: 'carbon',
      title: 'Carbon Strike Plate',
      sub: 'Relentless High-Tension Spine Propulsion',
      description: 'A multi-layered rigid aerospace-grade carbon weave embedded symmetrically within supercritical foams to maximize propulsion transition during gait cycles.',
      metrics: { Response: 99, Weight: 35, Adaptability: 50, EnergyReturn: 98 },
      icon: <Cpu size={18} />
    },
    {
      id: 'grip',
      title: 'Velocity Grip 2.0',
      sub: 'Dual-Density Mud & Cold Road Traction',
      description: 'Synthesized with cold-vulcanized elastomer aggregates to guarantee optimal shear friction against both standard tracks and wet asphalt elements.',
      metrics: { Response: 92, Weight: 65, Adaptability: 90, EnergyReturn: 20 },
      icon: <Anchor size={18} />
    }
  ];

  const activeData = specs.find((s) => s.id === activeSpec) || specs[0];

  return (
    <section className="py-24 bg-[#131313] border-y border-white/5 blueprint-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: SPECS DESCRIPTION (Col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="font-mono text-xs text-brand-neon uppercase tracking-widest block">
              MATERIAL INTEGRITY TELEMETRY
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase mt-1 tracking-tight text-white leading-none">
              THE SCIENCE OF FAST
            </h2>
            <p className="font-sans text-sm text-gray-400 mt-3 max-w-xl leading-relaxed">
              Every single sub-cell of the Velocity footwear is structurally calibrated using high-pressure material tests. Select a spec segment below to view physical response metrics.
            </p>
          </div>

          {/* Interactive selectors list */}
          <div className="space-y-4">
            {specs.map((item) => {
              const isActive = activeSpec === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSpec(item.id)}
                  className={`w-full p-5 border text-left flex items-start gap-4 transition-all duration-300 relative cursor-pointer ${
                    isActive
                      ? 'border-brand-neon bg-brand-neon/5 shadow-[0_0_20px_rgba(195,244,0,0.05)]'
                      : 'border-white/5 bg-black/20 hover:border-white/10 hover:bg-black/30'
                  }`}
                >
                  <div className={`p-2 shrink-0 ${isActive ? 'text-brand-neon' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest hidden sm:inline">
                        {isActive ? 'ACTIVE_HUD' : 'INSPECT_SYS'}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-400 mt-1">
                      {item.sub}
                    </p>

                    {/* Expand details smoothly if active */}
                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in fade-in duration-300">
                        <p className="font-sans text-xs text-gray-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Progress telemetry indexes */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                          {Object.entries(item.metrics).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-wider block">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <div className="flex items-baseline gap-1">
                                <span className="font-mono text-sm text-white font-bold">{val}</span>
                                <span className="font-mono text-[8px] text-gray-600">SYS</span>
                              </div>
                              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-brand-cyan"
                                  style={{ width: `${val}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: MICROSCOPIC TEXTURE VIEW PORTFOLIO CARD (Col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1b1c1c] p-6 border border-white/5 rounded-sm relative overflow-hidden shadow-2xl">
            
            {/* Visual pattern frame */}
            <div className="aspect-[4/3] bg-surface-container-lowest overflow-hidden border border-brand-neon relative group select-none">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQKdhiZab8np43yXixWpqDdLomm7V9NybvkQX7ajXsLELBJU0gg9Re_8zDW_YgxQ5eyMv2ngCoxQR9W8CRpBUq7QM-0hh5RWu3BdErRKL0w72M0aZTC2Lpx_dMhHx14WNCdJFJxfUI30F5B13d_Eb9cEIJsyx0kSK3EKce8RVxKdOeQFL_w_dH0SMSo1bQUf9OseD4c9z7NQROggyXbBnlSIjmpiQZjpxPXWwaU_2NAm8ipKjhu7F9WByFAotYuKcJzu26rTy7ISIW"
                alt="Microscopic Weave Patterns"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
              />
              
              <div className="absolute top-6 left-6 bg-black/85 backdrop-blur px-3 py-1.5 border-l-2 border-brand-neon text-white font-mono text-[9px] uppercase tracking-wider select-none leading-none">
                PRECISION STAGE VIEW
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-brand-neon font-mono text-[10px] tracking-widest uppercase">
                <ShieldCheck size={14} />
                <span>PDX SPEED TEST DEPT APPROVED</span>
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                LASER PROFILE ANALYSIS
              </h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed font-normal">
                Material structural layouts analyzed at 1000Hz frequency cycles. Durability guarantees sustain high propulsion indexes over 800 kilometers of consecutive track trails.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
