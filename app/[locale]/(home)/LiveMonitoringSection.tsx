import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

type CardProps = Record<'publicId' | 'alt' | 'sizes' | 'title' | 'description' | 'cta', string> & {
  wrapper?: string
  inner?: string
}

const Card = ({ publicId, alt, sizes, wrapper = '', inner = '', title, description, cta }: CardProps) => (
  <div className={`relative flex flex-col justify-end overflow-hidden px-8 py-10 h-111 rounded-(--radius) ${wrapper}`}>
    <CloudinaryImage publicId={publicId} alt={alt} fill sizes={sizes} className="absolute inset-0 object-cover" priority />
    <div className={`relative h-3/5 flex flex-col justify-between ${inner}`}>
      <h3 className="text-card-title">{title}</h3>
      <p>{description}</p>
      <Link href="#" className="text-card-link">{cta}</Link>
    </div>
  </div>
)

export async function LiveMonitoringSection() {
  const t = await getTranslations('weather')

  const cards: CardProps[] = [
    {
      publicId: IMAGES.home.liveMonitoring.card1,
      alt: t('safetyPromise.title'),
      sizes: "(max-width: 768px) 100vw, 365px",
      wrapper: "w-full max-w-91",
      inner: "text-background",
      title: t('safetyPromise.title'),
      description: t('safetyPromise.description'),
      cta: t('safetyPromise.cta'),
    },
    {
      publicId: IMAGES.home.liveMonitoring.card2,
      alt: t('viewPromise.title'),
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 365px, 647px",
      wrapper: "w-[clamp(345px,100%,365px)] max-w-full lg:w-162 gap-6",
      title: t('viewPromise.title'),
      description: t('viewPromise.description'),
      cta: t('viewPromise.cta'),
    },
  ]

  return (
    <section className="relative w-full py-24 overflow-hidden border-0 outline-none ring-0 shadow-none">
      <CloudinaryImage publicId={IMAGES.home.liveMonitoring.background} alt="Live Monitoring Background" fill sizes="100vw" className="absolute inset-0 object-cover" priority />

      <div className="relative mx-auto flex w-full flex-col items-center px-4 md:px-8 pt-21 max-w-[clamp(345px,100%,1268px)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full px-6 py-2 backdrop-blur-md text-background bg-[rgba(217,217,217,0.37)]">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h4>{t('liveMonitoring')}</h4>
        </div>

        <div className="flex w-full max-w-[clamp(355px,100%,962px)] flex-col items-center text-center text-background">
          <h2 className="mb-6 leading-[1.1]">{t('heading')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="mt-20 flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-center">
          {cards.map((card) => <Card key={card.publicId} {...card} />)}
        </div>
      </div>
    </section>
  )
}