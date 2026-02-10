'use client';

import { useTranslations } from 'next-intl';
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

// Constants
const CARD_STYLES = {
  width: 'clamp(345px, 40vw, 537px)',
  height: 'clamp(280px, 28vw, 356px)',
  borderRadius: '22px',
};

const AVATAR_SIZES = {
  mobile: { w: 'w-[32px]', h: 'h-[32px]' },
  desktop: { w: 'lg:w-[72px]', h: 'lg:h-[72px]' },
};

const GHOST_CARD_GRADIENTS = {
  top: 'linear-gradient(180deg, rgba(255,255,255,0) 75.32%, #ECECEC 100%)',
  bottom: 'linear-gradient(180deg, #ECECEC 0%, rgba(255,255,255,0) 24.68%)',
};

const PLATFORMS_IMAGE_SIZES = { width: 1200, height: 160 };

export default function HomeReviewsSection() {
  const t = useTranslations('reviews');
  const reviewsData: Review[] = t.raw('items') || [];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '1386px' }}>
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <CloudinaryImage
          publicId={IMAGES.homeReviews.background}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 pt-[100px] h-full">
        {/* HEADER */}
        <header className="text-center">
          <h4 className="text-secondary">{t('readRealReviews')}</h4>
          <h2 className="text-secondary">{t('dontJustTakeOurWord')}</h2>
        </header>

        {/* LOGOS */}
        <div className="flex justify-center mt-8 lg:mt-4 mb-20 lg:mb-12">
          <div className="max-w-[450px] w-[clamp(365px,40vw,450px)]">
            <CloudinaryImage
              publicId={IMAGES.homeReviews.platforms}
              alt="Google TripAdvisor Facebook reviews"
              {...PLATFORMS_IMAGE_SIZES}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        {/* DESKTOP CARDS */}
        <div className="hidden lg:grid grid-cols-2 gap-[24px] overflow-hidden justify-center" style={{ height: '1018px' }}>
          <DesktopColumn leftAlign>
            <GhostCard position="top" />
            {reviewsData[0] && <ReviewCard review={reviewsData[0]} />}
            <GhostCard position="bottom" />
          </DesktopColumn>

          <DesktopColumn>
            <GhostCard position="top" />
            {reviewsData[1] && <ReviewCard review={reviewsData[1]} />}
            {reviewsData[2] && <ReviewCard review={reviewsData[2]} />}
            <GhostCard position="bottom" />
          </DesktopColumn>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden flex flex-col items-center justify-end gap-6 pb-8 h-[900px]">
          {reviewsData.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopColumn({ children, leftAlign }: { children: React.ReactNode; leftAlign?: boolean }) {
  return (
    <div className={`flex flex-col gap-[24px] w-full ${leftAlign ? 'items-end' : 'justify-center'} ${!leftAlign ? '-translate-y-[120px]' : ''}`}>
      {children}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const StarRating = () => <div className="text-yellow-400 text-[clamp(18px,2vw,26px)]">★★★★★</div>;

  return (
    <article className="bg-card p-6 flex flex-col" style={CARD_STYLES}>
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`relative ${AVATAR_SIZES.mobile.w} ${AVATAR_SIZES.mobile.h} ${AVATAR_SIZES.desktop.w} ${AVATAR_SIZES.desktop.h} rounded-full overflow-hidden`}>
            <CloudinaryImage
              publicId={IMAGES.homeReviews.avatars[review.avatarIndex]}
              alt={review.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-secondary">{review.name}</p>
            <p className="text-secondary">{review.location}</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <StarRating />
        </div>
      </div>

      <div className="border-t border-secondary/20 mb-6" />

      {/* CONTENT */}
      <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] lg:gap-4">
        <h3 className="font-libre-baskerville italic text-[clamp(20px,2.5vw,24px)] mb-2 lg:mb-0 leading-tight">
          "{review.quote}"
        </h3>
        <p className="font-poppins text-[clamp(14px,0.5vw,16px)] leading-tight">
          {review.text}
        </p>
      </div>

      {/* STARS MOBILE */}
      <div className="lg:hidden mt-auto self-start">
        <StarRating />
      </div>
    </article>
  );
}

function GhostCard({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      style={{
        ...CARD_STYLES,
        background: GHOST_CARD_GRADIENTS[position],
      }}
    />
  );
}