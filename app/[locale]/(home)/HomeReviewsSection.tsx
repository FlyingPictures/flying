'use client';

import { cn } from '@/lib/utils';
import { useSectionTranslations } from '@/hooks/use-section-translations';

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
    name: "Javier S.",
    location: "Local Guide",
    quote: "I checked their permits",
    text: "Their gear is Cameron from Bristol, and unlike most companies, they have all licenses up-to-date. Do not compromise your safety to save a few dollars. Go with the best."
  },
  {
    id: 2,
    name: "Mike B.",
    location: "New Zealand",
    quote: "Out of all the adventures we did, this was the best",
    text: "No hidden costs (very unusual). Please do it if you are in Mexico City, you won't regret it."
  },
  {
    id: 3,
    name: "Robert C.",
    location: "Singapore",
    quote: "Everything was smooth",
    text: "The reception was warm (coffee and heaters for the cold morning!), and the pilot totally nailed the beautiful views."
  }
];

const PLATFORMS = [{ name: 'Google' }, { name: 'Tripadvisor' }, { name: 'Facebook' }];

// --- SUB-COMPONENT: REVIEW CARD ---
function ReviewCard({ review }: { review: Review }) {
  return (
    <article 
      className="rounded-[22px] p-[31px] flex flex-col justify-between bg-background text-secondary shadow-sm transition-transform hover:scale-[1.01]"
      style={{ 
        width: "clamp(320px, 100%, 537px)", 
        height: "356px" 
      }}
    >
      <div className="flex flex-col h-full">
        {/* Top: Avatar, Name & Rating */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-[14px]">
            <div className="w-[93px] h-[93px] rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769505304/Ellipse_8_reoc5x.png" 
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins font-medium text-[16px] leading-[24px] tracking-[-0.03em] text-secondary">
                {review.name}
              </span>
              <span className="font-poppins font-medium text-[16px] leading-[24px] tracking-[-0.03em] text-secondary/50">
                {review.location}
              </span>
            </div>
          </div>
          {/* Rating Image */}
          <img 
            src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769505467/Group_64_xrfcje.png" 
            alt="5 stars" 
            className="w-[162px] h-[24px] mt-2"
          />
        </div>
        
        {/* Separator Line usando color-secondary */}
        <div className="w-full border-t border-secondary/20 mb-6" />
        
        {/* Content: Quote (Baskerville) & Body (Inter) */}
        <div className="grid grid-cols-[187px_1fr] gap-6 mt-auto overflow-hidden">
          <h3 className="font-libre-baskerville italic text-[24px] leading-[123.4%] tracking-[-0.03em] text-secondary !filter-none !drop-shadow-none">
            “{review.quote}”
          </h3>
          <p className="font-inter font-medium text-[16px] leading-[24px] tracking-[-0.03em] text-secondary !filter-none !drop-shadow-none">
            {review.text}
          </p>
        </div>
      </div>
    </article>
  );
}

// --- MAIN COMPONENT ---
export default function HomeReviewsSection() {
  const { reviews } = useSectionTranslations();

  return (
    <section 
      className="relative w-full overflow-hidden flex flex-col items-center py-24"
      style={{ 
        backgroundImage: `url('https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270544/backgroundreviews_uptzt8.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '1381px'
      }}
    >
      <div className="relative z-10 w-full max-w-[1102px] px-4 flex flex-col items-center">
        
        {/* Header Section */}
        <header className="flex flex-col items-center gap-3 mb-12 text-center">
          <h4 className="font-inter font-bold text-[clamp(0.75rem,2vw,0.875rem)] tracking-[0.2em] text-secondary uppercase">
            {reviews('readRealReviews')}
          </h4>
          <h2 className="font-poppins font-semibold text-[clamp(2.5rem,6vw,64px)] leading-[1.1] text-secondary tracking-[-0.03em] max-w-[916px]">
            {reviews('dontJustTakeOurWord')}
          </h2>
        </header>

        {/* Platforms Ratings */}
        <div className="flex flex-wrap justify-center gap-12 mb-20 items-center">
          {PLATFORMS.map((platform) => (
            <div key={platform.name} className="flex flex-col items-center gap-3">
              <span className="font-inter font-bold text-[18px] text-secondary">{platform.name}</span>
              <img 
                src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769505467/Group_64_xrfcje.png" 
                alt="Rating" 
                className="w-[120px] h-auto"
              />
            </div>
          ))}
        </div>

        {/* Grid: Staggered Layout 1102px total width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[32px] gap-x-[24px] w-full">
          {/* Card 1 - Posicionada según Figma */}
          <div className="lg:translate-y-[189px] flex justify-center lg:justify-start">
            <ReviewCard review={REVIEWS_DATA[0]} />
          </div>
          
          {/* Card 2 - Posicionada según Figma */}
          <div className="flex justify-center lg:justify-end">
            <ReviewCard review={REVIEWS_DATA[1]} />
          </div>

          {/* Card 3 - Posicionada según Figma */}
          <div className="lg:col-start-2 lg:translate-y-[13px] flex justify-center lg:justify-end">
            <ReviewCard review={REVIEWS_DATA[2]} />
          </div>
        </div>
      </div>

      {/* Degradados de bordes para suavizar la sección */}
      <div className="absolute top-0 left-0 w-full h-[356px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[356px] bg-gradient-to-t from-[#ECECEC]/50 to-transparent pointer-events-none" />
    </section>
  );
}