import { ProductTranslation } from "@/types/product"

interface Props {
  data: ProductTranslation
}

export default function Included({ data }: Props) {
  return (
    <section className="container mx-auto">
      <h2 className="text-3xl">
        hola
      </h2>
      
    </section>
  )
}