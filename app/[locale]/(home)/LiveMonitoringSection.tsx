import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

type CardProps = Record<'publicId' | 'alt' | 'sizes' | 'title' | 'description' | 'cta' | 'href', string> & {
  wrapper?: string
  inner?: string
}

const Card = ({ publicId, alt, sizes, wrapper = '', inner = '', title, description, cta, href }: CardProps) => (
  <article className={`relative flex flex-col justify-end overflow-hidden px-6 md:px-7 lg:px-8 py-8 lg:py-10 h-111 rounded-(--radius) ${wrapper}`}>
    <CloudinaryImage publicId={publicId} alt={alt} fill sizes={sizes} className="absolute inset-0 object-cover" priority />
    <div className={`relative h-3/5 flex flex-col justify-between ${inner}`}>
      <h3 className="text-card-title">{title}</h3>
      <p>{description}</p>
      <Link href={href} className="text-card-link">{cta}</Link>
    </div>
  </article>
)

export async function LiveMonitoringSection() {
  const t = await getTranslations('weather')

  const cards: CardProps[] = [
    {
      publicId: IMAGES.home.liveMonitoring.card1,
      alt: t('safetyPromise.title'),
      sizes: "(max-width: 768px) 100vw, 365px",
      wrapper: "w-full",
      inner: "text-background",
      title: t('safetyPromise.title'),
      description: t('safetyPromise.description'),
      cta: t('safetyPromise.cta'),
      href: '/safety-heritage',
    },
    {
      publicId: IMAGES.home.liveMonitoring.card2,
      alt: t('viewPromise.title'),
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 365px, 647px",
      wrapper: "w-full",
      title: t('viewPromise.title'),
      description: t('viewPromise.description'),
      cta: t('viewPromise.cta'),
      href: '/plan-your-visit',
    },
  ]

  return (
    <section className="relative w-full overflow-hidden border-0 bg-black py-24 outline-none ring-0 shadow-none">
      <div className="relative mx-auto flex w-full flex-col items-center px-4 md:px-8 pt-21 max-w-[clamp(345px,100%,1268px)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full px-6 py-2 backdrop-blur-md text-background bg-[rgba(217,217,217,0.37)]">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h4>{t('liveMonitoring')}</h4>
        </div>

        <div className="flex w-full max-w-[clamp(355px,100%,962px)] flex-col items-center text-center text-background">
          <h2 className="mb-6 leading-[1.1]">{t('heading')}</h2>
          <p>{t('description')}</p>
        </div>

        <div className="mt-20 grid w-full max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {cards.map((card) => <Card key={card.publicId} {...card} />)}
        </div>
      </div>
    </section>
  )
}
