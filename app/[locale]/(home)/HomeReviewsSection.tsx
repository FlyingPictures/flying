'use client';

import { useSectionTranslations } from '@/hooks/use-section-translations';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

const STARS_ID = "v1769505467/Group_64_xrfcje";

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Javier S.',
    location: 'Local Guide',
    quote: 'I checked their permits',
    text: 'Their gear is Cameron from Bristol, and unlike most companies, they have all licenses up-to-date. Do not compromise your safety to save a few dollars. Go with the best.',
    avatarId: "v1769505304/Ellipse_8_reoc5x",
    // Esta va a la izquierda y centrada verticalmente en su bloque
    offset: "lg:translate-y-[120px]", 
    align: "justify-start"
  },
  {
    id: 2,
    name: 'Mike B.',
    location: 'New Zealand',
    quote: 'Out of all the adventures we did, this was the best',
    text: "No hidden costs (very unusual). Please do it if you are in Mexico City, you won't regret it.",
    avatarId: "v1769505304/Ellipse_8_reoc5x",
    // Primera de la derecha, más arriba
    offset: "lg:-translate-y-[40px]",
    align: "justify-end"
  },
  {
    id: 3,
    name: 'Robert C.',
    location: 'Singapore',
    quote: 'Everything was smooth',
    text: 'The reception was warm (coffee and heaters for the cold morning!), and the pilot totally nailed the beautiful views.',
    avatarId: "v1769505304/Ellipse_8_reoc5x",
    // Segunda de la derecha, más abajo
    offset: "lg:translate-y-[60px]", 
    align: "justify-end"
  },
] as const;

function ReviewCard({ review }: { review: typeof REVIEWS_DATA[number] }) {
  return (
    <article className="rounded-[22px] flex flex-col bg-[#F7F7F7] shadow-sm w-full max-w-[537px] lg:h-[356px] p-[clamp(1.5rem,4vw,2rem)] transition-transform hover:scale-[1.01]">
      {/* Header: Avatar + Stars */}
      <div className="flex items-center justify-between mb-[31px]">
        <div className="flex items-center gap-[14px]">
          <div className="relative w-[93px] h-[93px] rounded-full overflow-hidden flex-shrink-0">
            <CloudinaryImage publicId={review.avatarId} alt={review.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col text-secondary">
            <span className="font-poppins font-medium text-[16px] leading-[24px] tracking-[-0.03em]">{review.name}</span>
            <span className="font-poppins font-medium text-[16px] leading-[24px] tracking-[-0.03em] opacity-50">{review.location}</span>
          </div>
        </div>
        <CloudinaryImage publicId={STARS_ID} alt="Stars" width={162} height={24} className="h-auto object-contain" />
      </div>

      <div className="w-full border-t border-secondary/20 mb-[24px]" />

      {/* Content: Quote + Body */}
      <div className="grid grid-cols-1 sm:grid-cols-[187px_1fr] gap-[25px] items-start">
        <h3 className="text-secondary font-serif italic font-normal text-[clamp(1.25rem,2vw,1.5rem)] leading-[123.4%] tracking-[-0.03em]">
          “{review.quote}”
        </h3>
        <p className="text-secondary font-poppins font-medium text-[16px] leading-[24px] tracking-[-0.03em]">
          {review.text}
        </p>
      </div>
    </article>
  );
}

export default function HomeReviewsSection() {
  const { reviews } = useSectionTranslations();

  return (
    <section className="relative w-full flex flex-col items-center py-[100px] min-h-[1400px] overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0 -z-20">
        <CloudinaryImage publicId="v1769270544/backgroundreviews_uptzt8" alt="BG" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 w-full max-w-[1102px] px-4 flex flex-col items-center">
        <header className="text-center mb-24">
          <h4 className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-4">{reviews('readRealReviews')}</h4>
          <h2 className="text-secondary font-poppins font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1]">{reviews('dontJustTakeOurWord')}</h2>
        </header>

        {/* Reviews Grid: 1 Left, 2 Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-12 w-full">
          {/* Columna Izquierda: Javier */}
          <div className={cn("flex flex-col", REVIEWS_DATA[0].align, REVIEWS_DATA[0].offset)}>
            <ReviewCard review={REVIEWS_DATA[0]} />
          </div>

          {/* Columna Derecha: Mike y Robert */}
          <div className="flex flex-col">
            <div className={cn("flex", REVIEWS_DATA[1].align, REVIEWS_DATA[1].offset)}>
              <ReviewCard review={REVIEWS_DATA[1]} />
            </div>
            <div className={cn("flex", REVIEWS_DATA[2].align, REVIEWS_DATA[2].offset)}>
              <ReviewCard review={REVIEWS_DATA[2]} />
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de desvanecimiento (Rectangle 56, 59, 57, 58) */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[400px] bg-gradient-to-t from-[#ECECEC]/60 via-[#ECECEC]/20 to-transparent pointer-events-none" />
    </section>
  );
}