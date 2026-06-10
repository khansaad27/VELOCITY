/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Share2, CheckCircle, Mail } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: 'home' | 'detail' | 'lab' | 'tech') => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-white/5 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-16 py-16 w-full max-w-7xl mx-auto">
        
        {/* Brand identity statement */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <span className="font-display text-3xl font-black tracking-tighter text-white">VELOCITY</span>
            <p className="mt-4 font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
              Pushing the absolute boundaries of human motion through relentless athletic innovation, custom-lab performance materials, and precise speed-testing engineering.
            </p>
          </div>
          <p className="hidden md:block text-xs font-mono text-gray-500 mt-8">
            © 2026 VELOCITY ATHLETICS INC. ALL SYSTEMS NOMINAL.
          </p>
        </div>

        {/* Dynamic navigation routing */}
        <div className="md:col-span-2">
          <h4 className="font-mono text-xs text-white uppercase mb-6 tracking-widest font-semibold">GEAR</h4>
          <ul className="flex flex-col gap-4 text-xs font-mono">
            <li>
              <button
                onClick={() => onTabChange('home')}
                className="text-gray-400 hover:text-brand-neon transition-colors cursor-pointer text-left"
              >
                SHOP ALL CORES
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('detail')}
                className="text-gray-400 hover:text-brand-neon transition-colors cursor-pointer text-left"
              >
                VELOCITY KINETIC
              </button>
            </li>
            <li>
              <button
                onClick={() => onTabChange('lab')}
                className="text-gray-400 hover:text-brand-neon transition-colors cursor-pointer text-left"
              >
                CUSTOM DESIGNER
              </button>
            </li>
          </ul>
        </div>

        {/* Labs & Science routing */}
        <div className="md:col-span-2">
          <h4 className="font-mono text-xs text-white uppercase mb-6 tracking-widest font-semibold">SCIENCE</h4>
          <ul className="flex flex-col gap-4 text-xs font-mono">
            <li>
              <button
                onClick={() => onTabChange('tech')}
                className="text-gray-400 hover:text-brand-neon transition-colors cursor-pointer text-left"
              >
                PROPEULSION TECH
              </button>
            </li>
            <li>
              <span className="text-gray-600 cursor-not-allowed">PORTLAND DEV LAB</span>
            </li>
            <li>
              <span className="text-gray-600 cursor-not-allowed">ECOMATRIX INDEX</span>
            </li>
          </ul>
        </div>

        {/* Newsletter join form with high visual refinement */}
        <div className="md:col-span-4">
          <h4 className="font-mono text-xs text-white uppercase mb-4 tracking-widest font-semibold">
            SUBSCRIBE TO THE VANGUARD
          </h4>
          <p className="text-xs text-gray-400 mb-4 font-sans leading-relaxed">
            Register to secure immediate access to Drop 005 / Helium and invite-only laboratory customizable batches.
          </p>

          <form onSubmit={handleSubmit} className="relative mt-2">
            {subscribed ? (
              <div className="flex items-center gap-2 text-brand-neon text-xs font-mono py-3 border-b-2 border-brand-neon">
                <CheckCircle size={16} />
                <span>MEMBERSHIP SECURED. CHECK INBOX.</span>
              </div>
            ) : (
              <div className="flex border-b-2 border-white/20 focus-within:border-brand-neon transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS"
                  className="bg-transparent border-none outline-none focus:ring-0 w-full font-mono text-xs text-white placeholder:text-gray-600 py-3 block"
                />
                <button
                  type="submit"
                  className="px-4 text-brand-neon hover:text-white transition-all duration-200"
                  aria-label="Submit email address"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="md:hidden md:col-span-12 mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
          <p className="text-xs font-mono text-gray-500">
            © 2026 VELOCITY ATHLETICS INC. ALL SYSTEMS NOMINAL.
          </p>
        </div>

        {/* Social / tech metadata tags */}
        <div className="md:col-span-12 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-mono text-[10px] text-gray-500">
            ENGINEERED FOR EXTREME VELOCITY. DESIGN SYSTEM CERTIFIED.
          </span>
          
          <div className="flex gap-6">
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1 cursor-pointer hover:text-brand-neon transition-colors">
              <Share2 size={13} />
              SHARE PORTFOLIO
            </span>
            <span className="text-xs font-mono text-gray-400 flex items-center gap-1 cursor-pointer hover:text-brand-neon transition-colors">
              🌎 GLOBAL / EN
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
