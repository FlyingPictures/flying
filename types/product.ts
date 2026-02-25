import { IMAGES } from "@/lib/images"
import { redirect } from "next/navigation"

export type ProductSlug = keyof typeof IMAGES.product.gallery

export const PRODUCTS = Object.keys(
  IMAGES.product.gallery
) as ProductSlug[]

export default function ProductIndexPage({
  params
}: {
  params: { locale: string }
}) {
  redirect(`/${params.locale}/product/classic`)
}

export interface ProductTranslation {
  hero: {
    title: string
    subtitle: string
  }
  rating: {
    score: number
    reviewsCount: number
  }
  description: {
    paragraphs: string[]
  }
  itinerary: {
    title: string
    steps: {
      time?: string
      title: string
      description: string
    }[]
  }
  pricing: {
    adults: {
      label: string
      price: number
      currency: string
    }
    children: {
      label: string
      price: number
      currency: string
    }
  }
  cta: {
    seeDates: string
  }
  included: { title: string }
  meet: { title: string }
  reviews: { title: string }
  footer: {
    title: string
    button: string
  }
}