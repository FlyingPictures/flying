'use client';

import { useSectionTranslations } from '@/hooks/use-section-translations';
import { CloudinaryImage } from '@/components/ui/CloudinaryImage';

// --- CONSTANTS & TYPES ---
interface Review {
  id: number;
  name: string;
  location: string;
  quote: string;
  text: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 1,
    name: 'Javier S.',
    location: 'Local Guide',
    quote: 'I checked their permits',
    text:
      'Their gear is Cameron from Bristol, and unlike most companies, they have all licenses up-to-date. Do not compromise your safety to save a few dollars. Go with the best.',
  },
  {
    id: 2,
    name: 'Mike B.',
    location: 'New Zealand',
    quote: 'Out of all the adventures we did, this was the best',
    text:
      "No hidden costs (very unusual). Please do it if you are in Mexico City, you won't regret it.",
  },
  {
    id: 3,
    name: 'Robert C.',
    location: 'Singapore',
    quote: 'Everything was smooth',
    text:
      'The reception was warm (coffee and heaters for the cold morning!), and the pilot totally nailed the beautiful views.',
  },
];

const PLATFORMS = ['Google', 'Tripadvisor', 'Facebook'];

// --- REVIEW CARD ---
function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="rounded-[22px] p-[31px] flex flex-col bg-background text-secondary shadow-sm transition-transform hover:scale-[1.01]"
      style={{ width: 'clamp(320px, 100%, 537px)', height: '356px' }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-[14px]">
            <div className="relative w-[93px] h-[93px] rounded-full overflow-hidden flex-shrink-0">
              <CloudinaryImage
                publicId="v1769505304/Ellipse_8_reoc5x"
                alt={review.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-poppins font-medium text-[16px] tracking-[-0.03em]">
                {review.name}
              </span>
              <span className="font-poppins font-medium text-[16px] text-secondary/50">
                {review.location}
              </span>
            </div>
          </div>

          <CloudinaryImage
            publicId="v1769505467/Group_64_xrfcje"
            alt="5 stars"
            width={162}
            height={24}
            className="mt-2"
          />
        </div>

        <div className="w-full border-t border-secondary/20 mb-6" />

        {/* Content */}
        <div className="grid grid-cols-[187px_1fr] gap-6 mt-auto">
          <h3 className="font-libre-baskerville italic text-[24px] tracking-[-0.03em]">
            “{review.quote}”
          </h3>
          <p className="font-inter font-medium text-[16px] tracking-[-0.03em]">
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
    <section className="relative w-full overflow-hidden flex flex-col items-center py-24 min-h-[1381px]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <CloudinaryImage
          publicId="v1769270544/backgroundreviews_uptzt8"
          alt="Reviews background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 w-full max-w-[1102px] px-4 flex flex-col items-center">
        {/* Header */}
        <header className="flex flex-col items-center gap-3 mb-12 text-center">
          <h4 className="font-inter font-bold tracking-[0.2em] uppercase">
            {reviews('readRealReviews')}
          </h4>
          <h2 className="font-poppins font-semibold text-[clamp(2.5rem,6vw,64px)] leading-[1.1] tracking-[-0.03em] max-w-[916px]">
            {reviews('dontJustTakeOurWord')}
          </h2>
        </header>

        {/* Platforms */}
        <div className="flex flex-wrap justify-center gap-12 mb-20 items-center">
          {PLATFORMS.map((name) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <span className="font-inter font-bold text-[18px]">{name}</span>
              <CloudinaryImage
                publicId="v1769505467/Group_64_xrfcje"
                alt="Rating"
                width={120}
                height={18}
              />
            </div>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[32px] gap-x-[24px] w-full">
          <div className="lg:translate-y-[189px] flex justify-center lg:justify-start">
            <ReviewCard review={REVIEWS_DATA[0]} />
          </div>

          <div className="flex justify-center lg:justify-end">
            <ReviewCard review={REVIEWS_DATA[1]} />
          </div>

          <div className="lg:col-start-2 lg:translate-y-[13px] flex justify-center lg:justify-end">
            <ReviewCard review={REVIEWS_DATA[2]} />
          </div>
        </div>
      </div>

      {/* Edge gradients */}
      <div className="absolute top-0 left-0 w-full h-[356px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[356px] bg-gradient-to-t from-[#ECECEC]/50 to-transparent pointer-events-none" />
    </section>
  );
}
