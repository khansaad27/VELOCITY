/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  rating?: number;
  featured?: boolean;
  image: string;
  hoverImage?: string;
  description: string;
  colorways: Colorway[];
  sizes: string[];
  specs: SpecItem[];
}

export interface Colorway {
  name: string;
  hex: string;
  accentClass: string;
  images: string[]; // List of gallery views for this colorway
}

export interface SpecItem {
  key: string;
  value: string;
}

export interface CartItem {
  id: string; // combination of productId, color, and size
  productId: string;
  productName: string;
  price: number;
  color: string;
  colorHex: string;
  size: string;
  image: string;
  quantity: number;
}

export interface CustomizationOption {
  upperMaterial: 'AeroMesh™' | 'CarbonWeave™' | 'MonoFilament™';
  midsoleFoam: 'Nitrous Foam' | 'Propulsion Gel' | 'Standard EVA';
  outsoleTraction: 'Velocity Grip 2.0' | 'Trail Claw' | 'Track Spike';
  accentColor: string; // hex
  lacesColor: string; // hex
  size: string;
}
