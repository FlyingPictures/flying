import { CloudinaryImage } from '@/components/CloudinaryImage'
import { SAFETY_FLEET, type FleetBalloon } from '@/lib/safety-fleet'
import { getTranslations } from 'next-intl/server'

export async function SafetyMeetGiants() {
  const t = await getTranslations('safety.meetGiants')

  return (
    <section
      className="relative isolate w-full overflow-hidden px-4 pb-[clamp(72px,9vw,144px)] sm:px-6"
      style={{
        background:
          'linear-gradient(180deg, #dae2e8 0%, #a8b7c7 22%, #51748a 47%, #173746 72%, #071820 100%)',
      }}
    >
      <div className="relative mx-auto max-w-325">
        <div className="mx-auto flex max-w-210 flex-col items-center gap-4 pt-[clamp(64px,8vw,112px)] text-center">
          <h4 className="text-secondary">{t('subtitle')}</h4>
          <h2 className="text-secondary">{t('title')}</h2>
          <p className="max-w-175 text-secondary/85">{t('description')}</p>
        </div>

        <div className="mt-[clamp(40px,6vw,80px)] grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {SAFETY_FLEET.map((balloon, index) => (
            <BalloonCard
              key={balloon.name}
              balloon={balloon}
              index={index}
              pendingPhoto={t('pendingPhoto')}
              photoAlt={t('photoAlt', { name: balloon.name })}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function BalloonCard({
  balloon,
  index,
  pendingPhoto,
  photoAlt,
}: {
  balloon: FleetBalloon
  index: number
  pendingPhoto: string
  photoAlt: string
}) {
  return (
    <figure className="group relative aspect-[3/4] min-w-0 overflow-hidden rounded-(--radius) bg-[#123441] shadow-[0_14px_35px_rgba(5,25,34,0.13)] sm:aspect-[4/5]">
      {balloon.publicId ? (
        <CloudinaryImage
          publicId={balloon.publicId}
          alt={photoAlt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 25% 20%, #527c91 0%, #284c60 40%, #102a37 100%)',
          }}
        >
          <div className="absolute -right-18 -top-16 h-52 w-52 rounded-full border border-white/20 sm:h-72 sm:w-72" />
          <div className="absolute -right-8 -top-7 h-52 w-52 rounded-full border border-white/10 sm:h-72 sm:w-72" />
          <span className="absolute left-4 top-5 text-[10px] font-semibold tracking-[0.2em] text-white/75 uppercase sm:left-6 sm:top-6">
            {pendingPhoto}
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
      <span
        className="pointer-events-none absolute right-4 top-3 font-['Libre_Baskerville'] text-4xl italic text-white/45 sm:right-6 sm:top-5 sm:text-5xl"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <span className="mb-2 block h-px w-8 bg-white/70" aria-hidden="true" />
        <h3 className="text-left! font-['Libre_Baskerville'] text-[clamp(1.15rem,2vw,1.75rem)]! italic leading-tight! text-white">
          {balloon.name}
        </h3>
      </figcaption>
    </figure>
  )
}
