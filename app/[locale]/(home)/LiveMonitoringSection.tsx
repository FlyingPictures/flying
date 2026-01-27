import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface LiveMonitoringSectionProps {
  translations: {
    badge: string
    h2: string
    paragraph: string
    cards: Array<{
      title: string
      paragraph: string
      link: string
    }>
  }
}

export function LiveMonitoringSection({ translations }: LiveMonitoringSectionProps) {
  return (
    <section 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat py-24"
      style={{ 
        backgroundImage: `url('https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270544/Rectangle_63_x9khlt.webp')`,
      }}
    >
      {/* Contenedor de Contenido limitado a 1268px */}
      <div className="mx-auto w-full max-w-[1268px] px-4 md:px-8 flex flex-col items-center">
        
        {/* Badge superior */}
        <div className="mb-10">
          <Badge variant="secondary" className="border-none bg-white/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md rounded-full">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
            {translations.badge}
          </Badge>
        </div>

        {/* Header Section: Título y el texto específico debajo */}
        <div className="mb-20 max-w-[1054px] text-center">
          <h2 className="mb-6 font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight text-white leading-[1.1]">
            {translations.h2}
          </h2>
          
          {/* Texto secundario más pequeño (We don't guess...) */}
          <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl font-medium leading-relaxed">
            {translations.paragraph}
          </p>
        </div>

        {/* Grid de Tarjetas con dimensiones exactas del diseño original */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-[1054px]">
          
          {/* Tarjeta 1: The Safety Promise (365px x 437px) */}
          <div 
            className="relative overflow-hidden rounded-[22px] flex flex-col justify-end p-10 text-white shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
            style={{ 
              width: "clamp(320px, 100%, 365px)", 
              height: "437px",
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 8.39%, rgba(0, 0, 0, 0.5) 50.36%), url('https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270543/livemonitoring_ujhljj.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10">
              <h3 className="mb-4 font-serif text-[32px] italic leading-[123.4%] tracking-[-0.03em] font-normal">
                {translations.cards[0].title}
              </h3>
              <p className="mb-12 font-sans font-medium text-[18px] leading-[22px] opacity-90">
                {translations.cards[0].paragraph}
              </p>
              <Link href="#" className="font-bold text-[20px] leading-[24px] underline underline-offset-8 decoration-2 hover:text-white/80 transition-colors">
                {translations.cards[0].link}
              </Link>
            </div>
          </div>

          {/* Tarjeta 2: The View Promise (647px x 437px) */}
          <div 
            className="relative overflow-hidden rounded-[22px] flex flex-col justify-end p-10 transition-transform duration-300 hover:scale-[1.01]"
            style={{ 
              width: "clamp(320px, 100%, 647px)", 
              height: "437px",
              backgroundColor: "#D9C374",
              backgroundImage: `url('https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270544/theviewpromise_d2prqk.webp')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10 text-[#03303B]">
              <h3 className="mb-4 font-serif text-[32px] italic leading-[123.4%] tracking-[-0.03em] font-normal">
                {translations.cards[1].title}
              </h3>
              <p className="mb-12 font-sans font-medium text-[18px] leading-[22px] max-w-[550px]">
                {translations.cards[1].paragraph}
              </p>
              <Link href="#" className="font-bold text-[20px] leading-[24px] underline underline-offset-8 decoration-2 hover:opacity-70 transition-opacity">
                {translations.cards[1].link}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}