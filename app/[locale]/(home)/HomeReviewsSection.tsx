'use client';

import { useSectionTranslations } from '@/hooks/use-section-translations';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';
import { cn } from '@/lib/utils';

// --- CONSTANTS ---
const STARS_ID = "v1769505467/Group_64_xrfcje";

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Javier S.',
    location: 'Local Guide',
    quote: 'I checked their permits',
    text: 'Their gear is Cameron from Bristol, and unlike most companies, they have all licenses up-to-date. Do not compromise your safety to save a few dollars. Go with the best.',
    avatarId: "v1769505304/Ellipse_8_reoc5x",
    offset: "lg:translate-y-[189px]",
    align: "lg:justify-start"
  },
  {
    id: 2,
    name: 'Mike B.',
    location: 'New Zealand',
    quote: 'Out of all the adventures we did, this was the best',
    text: "No hidden costs (very unusual). Please do it if you are in Mexico City, you won't regret it.",
    avatarId: "v1769505304/Ellipse_8_reoc5x", // Cambiar por el ID real si es diferente
    offset: "",
    align: "lg:justify-end"
  },
  {
    id: 3,
    name: 'Robert C.',
    location: 'Singapore',
    quote: 'Everything was smooth',
    text: 'The reception was warm (coffee and heaters for the cold morning!), and the pilot totally nailed the beautiful views.',
    avatarId: "v1769505304/Ellipse_8_reoc5x",
    offset: "lg:col-start-2 lg:translate-y-[13px]",
    align: "lg:justify-end"
  },
] as const;

const PLATFORMS = ['Google', 'Tripadvisor', 'Facebook'];

// --- REUSABLE COMPONENTS ---

function StarRating({ width = 120, height = 18, className = "" }) {
  return (
    <CloudinaryImage
      publicId={STARS_ID}
      alt="Rating stars"
      width={width}
      height={height}
      className={className}
    />
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS_DATA[number] }) {
  return (
    <article
      className="rounded-[22px] p-[31px] flex flex-col bg-background text-secondary shadow-sm transition-transform hover:scale-[1.01] w-full max-w-[537px] h-[356px]"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-[14px]">
            <div className="relative w-[93px] h-[93px] rounded-full overflow-hidden flex-shrink-0">
              <CloudinaryImage
                publicId={review.avatarId}
                alt={review.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-secondary">
              <span className="font-poppins font-medium text-[16px] tracking-tight">{review.name}</span>
              <span className="font-poppins font-medium text-[16px] opacity-50">{review.location}</span>
            </div>
          </div>
          <StarRating width={162} height={24} className="mt-2" />
        </div>

        <div className="w-full border-t border-secondary/20 mb-6" />

        {/* Content */}
        <div className="grid grid-cols-[1fr_2fr] sm:grid-cols-[187px_1fr] gap-6 mt-auto text-secondary">
          <h3 className="font-libre-baskerville italic text-[24px] leading-tight tracking-tight">
            “{review.quote}”
          </h3>
          <p className="font-inter font-medium text-[16px] tracking-tight leading-snug">
            {review.text}
          </p>
        </div>
      </div>
    </article>
  );
}

// --- MAIN SECTION ---
export default function HomeReviewsSection() {
  const { reviews } = useSectionTranslations();

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center py-24 min-h-[1300px]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId="v1769270544/backgroundreviews_uptzt8"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1102px] px-4 flex flex-col items-center">
        {/* Header */}
        <header className="flex flex-col items-center gap-3 mb-12 text-center text-secondary">
          <h4 className="font-inter font-bold tracking-[0.2em] uppercase text-sm">
            {reviews('readRealReviews')}
          </h4>
          <h2 className="font-poppins font-semibold text-[clamp(2.5rem,6vw,64px)] leading-[1.1] tracking-tighter max-w-[916px]">
            {reviews('dontJustTakeOurWord')}
          </h2>
        </header>

        {/* Platforms */}
        <div className="flex flex-wrap justify-center gap-12 mb-20 items-center">
          {PLATFORMS.map((name) => (
            <div key={name} className="flex flex-col items-center gap-3 text-secondary">
              <span className="font-inter font-bold text-[18px]">{name}</span>
              <StarRating />
            </div>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-6 w-full">
          {REVIEWS_DATA.map((review) => (
            <div 
              key={review.id} 
              className={cn("flex justify-center", review.align, review.offset)}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Overlays */}
      <div className="absolute top-0 inset-x-0 h-[356px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[356px] bg-gradient-to-t from-[#ECECEC]/50 to-transparent pointer-events-none" />
    </section>
  );
}