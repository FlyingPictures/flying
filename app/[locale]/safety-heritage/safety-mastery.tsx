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
    <section className="relative isolate w-full overflow-hidden px-4 py-[clamp(72px,9vw,144px)] sm:px-6">
      <div className="absolute inset-0 -z-20">
        <CloudinaryImage
          publicId={IMAGES.safety.mastery.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(229,238,243,0.89)_0%,rgba(229,238,243,0.72)_49%,rgba(204,222,230,0.87)_100%)]" />

      <div className="relative mx-auto max-w-325">
        <div className="mx-auto flex max-w-230 flex-col items-center gap-5 text-center">
          <h4 className="text-secondary">{t('subtitle')}</h4>
          <h2 className="max-w-210 text-secondary">{t('title')}</h2>
          <p className="max-w-175 text-secondary/90">{t('description')}</p>
        </div>

        <ol className="mt-[clamp(40px,6vw,80px)] grid gap-4 md:grid-cols-3 md:gap-5">
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
