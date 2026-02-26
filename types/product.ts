import { IMAGES } from "@/lib/images";
import { redirect } from "next/navigation";

export type ProductSlug = keyof typeof IMAGES.product.gallery;

export const PRODUCTS = Object.keys(
  IMAGES.product.gallery
) as ProductSlug[];

export default function ProductIndexPage({
  params,
}: {
  params: { locale: string };
}) {
  redirect(`/${params.locale}/product/classic`);
}

export interface ItineraryStep {
  time?: string;
  title: string;
  description: string;
}

export interface ProductTranslation {
  hero: {
    title: string;
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
  priceAdults: string
  priceKids: string
  };
}