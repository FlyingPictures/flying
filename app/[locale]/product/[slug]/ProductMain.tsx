import { ProductSlug, ProductTranslation } from "@/types/product"
import { IMAGES } from "@/lib/images"

interface Props {
  slug: ProductSlug
  data: ProductTranslation
}

export default function ProductMain({ slug, data }: Props) {
  const heroImage = IMAGES.flightExperiences.flights[slug]
  const galleryImages = IMAGES.product.gallery[slug]

  return (
    <section className="w-full">

      {/* HERO */}
      <div
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/your-cloud/image/upload/${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="text-5xl font-bold">{data.hero.title}</h1>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-16 px-6">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="h-48 bg-cover bg-center rounded-xl"
            style={{
              backgroundImage: `url(https://res.cloudinary.com/your-cloud/image/upload/${img})`
            }}
          />
        ))}
      </div>

    </section>
  )
}