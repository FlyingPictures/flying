'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

export function LiveMonitoringSection() {
  const t = useTranslations('weather')

  return (
    <section className="relative w-full py-24 border-0 outline-none ring-0 shadow-none overflow-hidden">
      <CloudinaryImage
        publicId={IMAGES.liveMonitoring.background}
        alt="Live Monitoring Background"
        fill
        className="absolute inset-0 object-cover -z-10"
        priority
      />

      <div
        className="mx-auto relative flex w-full flex-col items-center px-4 md:px-8"
        style={{ maxWidth: 'clamp(345px, 100%, 1268px)', paddingTop: '84px' }}
      >
        <div
          className="text-background absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full px-6 py-2 backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(217, 217, 217, 0.37)',
          }}
        >
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <h4>{t('liveMonitoring')}</h4>
        </div>

        <div
          className="flex flex-col items-center text-center"
          style={{ width: 'clamp(355px, 100%, 962px)' }}
        >
          <h2 className="mb-6 font-sans text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-white">
            {t('heading')}
          </h2>
          <p className="text-lg font-medium leading-relaxed text-gray-300 md:text-xl">
            {t('description')}
          </p>
        </div>

        <div className="mt-20 flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-center">
          <div
            className="relative flex h-[437px] w-full max-w-[365px] flex-col justify-end overflow-hidden px-8 py-10"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <CloudinaryImage
              publicId={IMAGES.liveMonitoring.card1}
              alt={t('safetyPromise.title')}
              fill
              className="absolute inset-0 object-cover"
              priority
            />


            <div className="relative text-[color:var(--color-background)]">
              <h3 className="text-card-title">
                {t('safetyPromise.title')}
              </h3>

              <p className="text-card-body py-4">
                {t('safetyPromise.description')}
              </p>

              <Link href="#" className="text-card-link">
                {t('safetyPromise.cta')}
              </Link>
            </div>
          </div>

          <div
            className="card-2 relative flex h-[444px] w-[clamp(345px,100%,365px)] max-w-full flex-col justify-end overflow-hidden px-8 py-10 "
            style={{ borderRadius: 'var(--radius)' }}
          >
            <CloudinaryImage
              publicId={IMAGES.liveMonitoring.card2}
              alt={t('viewPromise.title')}
              fill
              className="absolute inset-0 object-cover "
              priority
            />

            <div className="relative text-[color:var(--color-secondary)]">
              <h3 className="text-card-title">
                {t('viewPromise.title')}
              </h3>

              <p className="text-card-body py-4">
                {t('viewPromise.description')}
              </p>

              <Link href="#" className="text-card-link">
                {t('viewPromise.cta')}
              </Link>
            </div>

            <style jsx>{`
              @media (min-width: 1024px) {
                .card-2 {
                  width: 647px;
                  height: 437px;
                }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  )
}
