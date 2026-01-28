import Link from "next/link"

interface CardProps {
  title: string
  paragraph: string
  linkText: string
  backgroundImage: string
  className?: string
  isDark?: boolean
}

// Sub-componente para evitar repetir la estructura de las tarjetas (DRY)
const MonitoringCard = ({ title, paragraph, linkText, backgroundImage, className, isDark = true }: CardProps) => (
  <div 
    className={`relative overflow-hidden rounded-[22px] flex flex-col justify-end p-10 transition-transform duration-300 hover:scale-[1.01] ${className}`}
    style={{ 
      backgroundImage: isDark 
        ? `linear-gradient(180deg, rgba(0, 0, 0, 0) 8.39%, rgba(0, 0, 0, 0.5) 50.36%), url('${backgroundImage}')`
        : `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className={`relative z-10 ${isDark ? 'text-white' : 'text-[#03303B]'}`}>
      <h3 className="mb-4 font-serif text-[32px] italic leading-[123.4%] tracking-[-0.03em] font-normal">
        {title}
      </h3>
      <p className={`mb-12 font-sans font-medium text-[18px] leading-[22px] ${isDark ? 'opacity-90' : ''}`}>
        {paragraph}
      </p>
      <Link href="#" className="font-bold text-[20px] leading-[24px] underline underline-offset-8 decoration-2 hover:opacity-70 transition-opacity">
        {linkText}
      </Link>
    </div>
  </div>
)

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
      style={{ backgroundImage: `url('https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270544/Rectangle_63_x9khlt.webp')` }}
    >
      <div className="mx-auto w-full max-w-[1268px] px-4 md:px-8 flex flex-col items-center">
        
        {/* Badge sustituido por HTML simple + Tailwind */}
        <div className="mb-10 inline-flex items-center rounded-full bg-white/10 px-6 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          {translations.badge}
        </div>

        <div className="mb-20 max-w-[1054px] text-center">
          <h2 className="mb-6 font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight text-white leading-[1.1]">
            {translations.h2}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-300 md:text-xl font-medium leading-relaxed">
            {translations.paragraph}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-full max-w-[1054px]">
          <MonitoringCard 
            title={translations.cards[0].title}
            paragraph={translations.cards[0].paragraph}
            linkText={translations.cards[0].link}
            backgroundImage="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270543/livemonitoring_ujhljj.webp"
            className="w-full md:w-[365px] h-[437px]"
          />

          <MonitoringCard 
            title={translations.cards[1].title}
            paragraph={translations.cards[1].paragraph}
            linkText={translations.cards[1].link}
            backgroundImage="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270544/theviewpromise_d2prqk.webp"
            className="w-full md:w-[647px] h-[437px] bg-[#D9C374]"
            isDark={false}
          />
        </div>
      </div>
    </section>
  )
}