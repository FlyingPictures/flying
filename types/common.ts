// types/common.ts

/**
 * Tipos compartidos para toda la aplicación
 * Aplica principio DRY para evitar duplicar tipos
 */

export interface CloudinaryImage {
  cloudinaryId: string;
  alt: string;
}

export interface SectionContent {
  title: string;
  description?: string;
  subtitle?: string;
}

export interface CTAButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface Rating {
  name: string;
  rating: number;
  maxRating?: number;
}

export interface Review {
  id: string | number;
  author: string;
  rating: number;
  text: string;
  date?: string;
  platform?: string;
  featured?: boolean;
}

export interface Card {
  id: string | number;
  title: string;
  description: string;
  image?: CloudinaryImage;
  cta?: CTAButton;
}

export interface Metric {
  label: string;
  value: string;
  icon?: string;
  unit?: string;
}
