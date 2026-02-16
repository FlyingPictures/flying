import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

export async function LiveMonitoringSection() {
  const t = await getTranslations('weather')

  return (
    <section className="relative w-full py-24 overflow-hidden border-0 outline-none ring-0 shadow-none">
      <CloudinaryImage publicId={IMAGES.home.liveMonitoring.background} alt="Live Monitoring Background" fill sizes="100vw" className="absolute inset-0 -z-10 object-cover" priority />

      <div className="relative mx-auto flex w-full flex-col items-center px-4 md:px-8 pt-[84px] max-w-[clamp(345px,100%,1268px)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full px-6 py-2 backdrop-blur-md text-background bg-[rgba(217,217,217,0.37)]">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h4>{t('liveMonitoring')}</h4>
        </div>

        <div className="flex w-full max-w-[clamp(355px,100%,962px)] flex-col items-center text-center">
          <h2 className="mb-6 font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-white">{t('heading')}</h2>
          <p className="text-lg font-medium leading-relaxed text-gray-300 md:text-xl">{t('description')}</p>
        </div>

        <div className="mt-20 flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-center">
          <div className="relative flex h-[437px] w-full max-w-[365px] flex-col justify-end overflow-hidden px-8 py-10 rounded-[var(--radius)]">
            <CloudinaryImage publicId={IMAGES.home.liveMonitoring.card1} alt={t('safetyPromise.title')} fill sizes="(max-width: 768px) 100vw, 365px" className="absolute inset-0 object-cover" priority />
            <div className="relative text-[color:var(--color-background)]">
              <h3 className="text-card-title">{t('safetyPromise.title')}</h3>
              <p className="py-4 text-card-body">{t('safetyPromise.description')}</p>
              <Link href="#" className="text-card-link">{t('safetyPromise.cta')}</Link>
            </div>
          </div>

          <div className="relative flex flex-col justify-end overflow-hidden px-8 py-10 w-[clamp(345px,100%,365px)] max-w-full h-[444px] lg:h-[437px] lg:w-[647px] rounded-[var(--radius)]">
            <CloudinaryImage publicId={IMAGES.home.liveMonitoring.card2} alt={t('viewPromise.title')} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 365px, 647px" className="absolute inset-0 object-cover" priority />
            <div className="relative text-[color:var(--color-secondary)]">
              <h3 className="text-card-title">{t('viewPromise.title')}</h3>
              <p className="py-4 text-card-body">{t('viewPromise.description')}</p>
              <Link href="#" className="text-card-link">{t('viewPromise.cta')}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
