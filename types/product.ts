import {
  PRODUCT_SLUGS,
  type ProductSlug,
} from "@/lib/commercial-config";

export type { ProductSlug };
export const PRODUCTS = PRODUCT_SLUGS;

export interface ItineraryStep {
  time?: string;
  title: string;
  description: string;
}

export interface PackageDetails {
  included: string[];
  notIncluded: string[];
  recommendedExtras: string[];
  notes: string[];
  itinerary: {
    title: string;
    steps: ItineraryStep[];
  };
}

export interface ProductTranslation {
  hero: {
    subtitle: string;
  };
  rating: {
    score: number;
    reviewsCount: string;
  };
  description: {
    title: string;
    paragraph: string;
  };
  itinerary: {
    title: string;
    steps: ItineraryStep[];
  };
  pricing: {
    adults: string
    kids: string
    dates: string
  };
  details?: PackageDetails;
}
