import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'
import { getTranslations } from 'next-intl/server'

type PilotStory = {
  label: string
  title: string
  description: string
}

export async function SafetyMastery() {
  const t = await getTranslations('safety.mastery')
  const stories = Object.values(t.raw('cards') as Record<string, PilotStory>)

  return (
    <section className="relative w-full overflow-hidden bg-[#dbe7eb] pt-[clamp(72px,8vw,112px)] pb-[clamp(72px,8vw,112px)]">
      <div className="relative mx-auto flex max-w-230 flex-col items-center gap-5 px-4 text-center sm:px-6">
        <h4 className="text-secondary">{t('subtitle')}</h4>
        <h2 className="max-w-210 text-secondary">{t('title')}</h2>
        <p className="max-w-175 text-secondary/90">{t('description')}</p>
      </div>

      <div className="relative mt-[clamp(36px,5vw,72px)] h-[clamp(260px,44vw,620px)] w-full overflow-hidden bg-[#b7cbd4]">
        <CloudinaryImage
          publicId={IMAGES.safety.mastery.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_58%] md:object-[center_55%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#dbe7eb]/40" />
      </div>

      <div className="relative mx-auto -mt-8 max-w-325 px-4 sm:-mt-12 sm:px-6 lg:-mt-16">
        <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
          {stories.map((story, index) => (
            <li
              key={story.title}
              className="flex min-h-68 flex-col rounded-(--radius) border border-white/70 bg-white/90 p-6 shadow-[0_16px_45px_rgba(18,52,65,0.1)] backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold tracking-[0.18em] text-secondary/70 uppercase">
                  {story.label}
                </span>
                <span
                  className="font-['Libre_Baskerville'] text-4xl italic leading-none text-secondary/25"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-auto pt-10">
                <span className="mb-5 block h-px w-9 bg-primary" aria-hidden="true" />
                <h3 className="text-left! text-[clamp(1.25rem,2vw,1.65rem)]! leading-snug! text-secondary">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm! leading-relaxed! text-secondary/85">
                  {story.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
