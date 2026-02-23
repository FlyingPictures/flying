import { getTranslations } from 'next-intl/server'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'

const ICONS: Record<string, React.ReactNode> = {
  '1': (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9239 0.283203L29.2141 5.98965L37.7033 5.66255L38.8532 14.0813L45.5686 19.2846L41.0396 26.4705L42.8386 34.776L34.7495 37.3676L30.7892 44.8831L22.9239 41.6701L15.0587 44.8831L11.0984 37.3676L3.00923 34.776L4.80822 26.4705L0.279297 19.2846L6.99468 14.0813L8.14453 5.66255L16.6337 5.98965L22.9239 0.283203ZM22.9239 3.6799L18.322 7.85406L17.5622 8.54347L16.5356 8.50573L10.326 8.26669L9.48559 14.421L9.34722 15.44L8.53452 16.0665L3.62568 19.8733L6.93682 25.1319L7.48532 25.9974L7.26642 27.0039L5.95303 33.0752L11.8683 34.9723L12.8471 35.2868L13.3276 36.1951L16.2211 41.6902L21.9729 39.3427L22.9239 38.9527L23.875 39.3427L29.6267 41.6902L32.5227 36.1951L33.0008 35.2868L33.9795 34.9723L39.8948 33.0752L38.5815 27.0039L38.3626 25.9974L38.911 25.1319L42.2247 19.8733L37.3134 16.0665L36.5006 15.44L36.3623 14.421L35.5194 8.26669L29.3147 8.50573L28.2857 8.54347L27.5258 7.85406L22.9239 3.6799ZM30.9688 18.1508L32.491 20.1561L19.2439 30.2104L13.228 24.1944L15.0069 22.4156L19.4704 26.8791L30.9688 18.1508Z" fill="#03303B" stroke="#03303B" stroke-width="0.419345"/>
    </svg>

  ),
  '2': (
    <svg width="32" height="45" viewBox="0 0 32 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3235 22.25C18.3235 26.1267 20.5538 27.9355 22.7107 29.6815C25.4121 31.8725 28.4538 34.3383 28.768 41.8824H2.64381C2.95793 34.3383 5.99962 31.8725 8.70102 29.6815C10.858 27.9355 13.0882 26.1267 13.0882 22.25C13.0882 18.3733 10.858 16.5645 8.70102 14.8185C5.99962 12.6275 2.95793 10.1617 2.64381 2.61764H28.7679C28.4538 10.1617 25.4121 12.6275 22.7107 14.8185C20.5537 16.5645 18.3235 18.3733 18.3235 22.25ZM24.3598 16.8498C27.501 14.3028 31.4117 11.1329 31.4117 1.30883V0H0V1.30881C0 11.1329 3.91076 14.3028 7.05195 16.8498C9.1094 18.5199 10.4706 19.6219 10.4706 22.25C10.4706 24.8781 9.1094 25.9801 7.05195 27.6502C3.91076 30.1972 0 33.3671 0 43.1912V44.5H31.4118V43.1912C31.4118 33.3671 27.501 30.1972 24.3598 27.6502C22.3024 25.9801 20.9412 24.8781 20.9412 22.25C20.9412 19.6219 22.3023 18.5199 24.3598 16.8498ZM15.1078 29.543L11.176 32.7339C9.45363 34.1291 7.96942 35.3306 7.17366 37.9561H24.2381C23.4423 35.3306 21.9581 34.1291 20.2357 32.7339L16.304 29.543C15.9559 29.2603 15.4559 29.2603 15.1078 29.543Z" fill="#03303B"/>
    </svg>

  ),
  '3': (
    <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 32.0625C0 26.2001 3.73682 21.2103 8.95851 19.3455C10.3777 18.8386 11.9066 18.5625 13.5 18.5625C15.0934 18.5625 16.6223 18.8386 18.0414 19.3455C18.8125 19.6207 19.5509 19.9643 20.25 20.3686C20.9491 19.9643 21.6875 19.6207 22.4586 19.3455C23.8777 18.8386 25.4065 18.5625 27 18.5625C28.5935 18.5625 30.1223 18.8386 31.5414 19.3455C36.7632 21.2103 40.5 26.2001 40.5 32.0625V38.8125H28.6875V35.4375H37.125V32.0625C37.125 26.4706 32.5919 21.9375 27 21.9375C25.6565 21.9375 24.3742 22.1992 23.2011 22.6744C25.5528 25.1039 27 28.4141 27 32.0625V38.8125H0V32.0625ZM13.5 16.875C11.9498 16.875 10.4973 16.4569 9.24903 15.7275C6.74483 14.2641 5.0625 11.5472 5.0625 8.4375C5.0625 3.77759 8.84009 0 13.5 0C16.2601 0 18.7106 1.32527 20.25 3.37417C21.7894 1.32527 24.2399 0 27 0C31.66 0 35.4375 3.77759 35.4375 8.4375C35.4375 11.5472 33.7552 14.2641 31.2509 15.7275C30.0026 16.4569 28.5502 16.875 27 16.875C25.4498 16.875 23.9974 16.4569 22.7491 15.7275C21.7746 15.158 20.9248 14.3989 20.25 13.5008C19.5752 14.3991 18.7254 15.158 17.7509 15.7275C16.5026 16.4569 15.0502 16.875 13.5 16.875ZM23.625 32.0625V35.4375H3.375V32.0625C3.375 26.4706 7.90812 21.9375 13.5 21.9375C19.0919 21.9375 23.625 26.4706 23.625 32.0625ZM18.5625 8.4375C18.5625 11.2334 16.2959 13.5 13.5 13.5C10.7041 13.5 8.4375 11.2334 8.4375 8.4375C8.4375 5.64156 10.7041 3.375 13.5 3.375C16.2959 3.375 18.5625 5.64156 18.5625 8.4375ZM27 3.375C24.2041 3.375 21.9375 5.64156 21.9375 8.4375C21.9375 11.2334 24.2041 13.5 27 13.5C29.7959 13.5 32.0625 11.2334 32.0625 8.4375C32.0625 5.64156 29.7959 3.375 27 3.375Z" fill="#03303B"/>
    </svg>

  ),
}

export async function SafetyMastery() {
  const t = await getTranslations('safety.mastery')
  const cards = t.raw('cards') as Record<string, { name: string; description: string }>
  const captains = t.raw('captains') as Record<string, { name: string; description: string }>

  return (
    <section className="relative w-full min-h-230 flex flex-col items-center justify-start overflow-hidden pt-[clamp(60px,7vw,120px)] pb-[clamp(40px,5vw,80px)] px-4">
      <CloudinaryImage publicId={IMAGES.safety.mastery.background} alt="" fill className="object-cover object-center -z-10" />
      <div className="absolute inset-0 -z-10" />

      <div className="flex flex-col items-center text-center gap-6 max-w-230 w-full mb-[clamp(32px,5vw,80px)]">
        <div className="flex flex-col items-center gap-[clamp(4px,0.5vw,12px)]">
          <h4>{t('subtitle')}</h4>
          <h2 className="whitespace-pre-line">{t('title')}</h2>
        </div>
        <p className="max-w-155">{t('description')}</p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-4 max-w-325 w-full mb-[clamp(32px,5vw,80px)]">
        {Object.entries(cards).map(([key, card]) => (
          <div key={key} className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2.5 bg-background rounded-(--radius) p-4 md:p-[28px_16px_16px] flex-1">
            <div className="shrink-0 w-[clamp(44px,3.75vw,54px)] h-[clamp(44px,3.75vw,54px)] flex items-center justify-center">
              {ICONS[key]}
            </div>
            <div className="flex flex-col gap-1 text-left md:text-center">
              <h5 className="font-bold! text-xl ">{card.name}</h5>
              <p className="text-sm!">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-[clamp(16px,2.78vw,40px)]">
        {Object.entries(captains).map(([key, captain]) => (
          <div key={key} className="flex flex-col md:flex-row items-start md:items-center gap-3 w-25 md:w-auto">
            <div className="w-16 h-16 rounded-full bg-background shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-xs leading-5 text-background">{captain.name}</span>
              <span className="font-light text-xs leading-4 text-background ">{captain.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}