import { ProductTranslation } from "@/types/product"

interface Props {
  data: ProductTranslation
}

export default function Reviews({ data }: Props) {
  return (
    <section className="container mx-auto">
      <h2 className="text-3xl">{data.reviews.title}</h2>
    </section>  
  )
}