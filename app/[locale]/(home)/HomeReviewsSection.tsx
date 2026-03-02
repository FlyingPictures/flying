import { getTranslations } from 'next-intl/server';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { IMAGES } from '@/lib/images';

interface Review {
  id: number;
  name: string;
  location: string;
  quote: string;
  text: string;
  avatarIndex: number;
}

const CARD_STYLE = { width: 'clamp(345px, 40vw, 537px)', minHeight: 'clamp(280px, 28vw, 356px)', height: 'auto', borderRadius: '22px' };
const GHOST_GRADIENTS = { top: 'linear-gradient(180deg, rgba(255,255,255,0) 75.32%, #ECECEC 100%)', bottom: 'linear-gradient(180deg, #ECECEC 0%, rgba(255,255,255,0) 24.68%)' };
const STAR_RATING = <div className="text-yellow-400 text-[clamp(18px,2vw,26px)]">★★★★★</div>;
const PLATFORMS = ['google', 'tripadvisor', 'facebook'] as const;

export default async function HomeReviewsSection() {
  const t = await getTranslations('reviews');
  const reviews: Review[] = t.raw('items') || [];

  return (
    <section className="relative w-full overflow-hidden min-h-347 lg:h-347">
      <div className="absolute inset-0">
        <CloudinaryImage publicId={IMAGES.home.reviews.background} alt="" fill sizes="100vw" className="object-cover" priority />
      </div>
      <div className="relative mx-auto px-4 pt-25 h-full flex flex-col">
        <header className="text-center space-y-2">
          <h4 className="text-secondary font-poppins uppercase tracking-wider">{t('readRealReviews')}</h4>
          <h2 className="text-secondary font-libre-baskerville text-[clamp(32px,5vw,64px)] leading-tight">{t('dontJustTakeOurWord')}</h2>
        </header>
        <div className="max-w-112.5 w-[clamp(320px,80vw,450px)] mx-auto mt-8">
          <div className="flex items-center justify-center gap-[clamp(16px,4vw,40px)] h-[clamp(40px,6vw,60px)]">
            {PLATFORMS.map((key) => (
              <div key={key} className="flex items-center justify-center h-full">
                <CloudinaryImage publicId={IMAGES.home.reviews.platforms[key]} alt={key} width={500} height={150} className="h-full w-auto object-contain" priority={key === 'google'} />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-2 gap-6 overflow-hidden justify-center relative -top-24 h-255">
          <div className="flex flex-col gap-6 w-full items-end">
            <GhostCard pos="top" />
            {reviews[0] && <ReviewCard review={reviews[0]} />}
            <GhostCard pos="bottom" />
          </div>
          <div className="flex flex-col gap-6 w-full justify-center -translate-y-30">
            <GhostCard pos="top" />
            {reviews[1] && <ReviewCard review={reviews[1]} />}
            {reviews[2] && <ReviewCard review={reviews[2]} />}
            <GhostCard pos="bottom" />
          </div>
        </div>
        <div className="lg:hidden flex flex-col items-center gap-8 mt-16 pb-20 w-full">
          {reviews.slice(0, 3).map((r) => <ReviewCard key={r.id} review={r} />)}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-card p-6 flex flex-col shadow-sm transition-all duration-300" style={CARD_STYLE}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 lg:w-18 lg:h-18 rounded-full overflow-hidden flex-shrink-0">
            <CloudinaryImage publicId={IMAGES.home.reviews.avatars[review.avatarIndex]} alt={review.name} fill sizes="(max-width: 1024px) 32px, 72px" className="object-cover" />
          </div>
          <div>
            <p className="text-secondary font-bold text-lg leading-none mb-1">{review.name}</p>
            <p className="text-secondary/70 text-sm leading-none">{review.location}</p>
          </div>
        </div>
        <div className="hidden lg:block">{STAR_RATING}</div>
      </div>
      <div className="border-t border-secondary/10 mb-6" />
      <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr_1.8fr] lg:gap-6 flex-1 h-full">
        <h3 className="font-libre-baskerville italic text-[clamp(20px,2.5vw,24px)] mb-4 lg:mb-0 leading-tight">&ldquo;{review.quote}&rdquo;</h3>
        <p className="font-poppins text-[clamp(15px,1vw,16px)] leading-relaxed text-secondary/90">{review.text}</p>
      </div>
      <div className="lg:hidden mt-6 self-start pt-4 w-full">{STAR_RATING}</div>
    </article>
  );
}

function GhostCard({ pos }: { pos: 'top' | 'bottom' }) {
  return <div className="hidden lg:block opacity-40" style={{ ...CARD_STYLE, background: GHOST_GRADIENTS[pos] }} />;
}