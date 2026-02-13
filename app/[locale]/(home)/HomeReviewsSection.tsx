'use client';

import { useTranslations } from 'next-intl';
import { CloudinaryImage } from '@/components/CloudinaryImage';
import { IMAGES } from '@/lib/images';
import React from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  quote: string;
  text: string;
  avatarIndex: number;
}

/* =========================
   CONSTANTS
========================= */

const CARD_STYLES = {
  width: 'clamp(345px, 40vw, 537px)',
  height: 'clamp(280px, 28vw, 356px)',
  borderRadius: '22px',
};

const AVATAR_CLASSES = `
  relative
  w-[32px] h-[32px]
  lg:w-[72px] lg:h-[72px]
  rounded-full
  overflow-hidden
`;

const GHOST_CARD_GRADIENTS = {
  top: 'linear-gradient(180deg, rgba(255,255,255,0) 75.32%, #ECECEC 100%)',
  bottom: 'linear-gradient(180deg, #ECECEC 0%, rgba(255,255,255,0) 24.68%)',
};

const STAR_RATING = (
  <div className="text-yellow-400 text-[clamp(18px,2vw,26px)]">
    ★★★★★
  </div>
);

const PLATFORM_KEYS = ['google', 'tripadvisor', 'facebook'] as const;

/* =========================
   MAIN COMPONENT
========================= */

export default function HomeReviewsSection() {
  const t = useTranslations('reviews');
  const reviewsData: Review[] = t.raw('items') || [];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '1386px' }}>
      <Background />

      <div className="relative z-10 mx-auto px-4 pt-[100px] h-full">
        <Header t={t} />
        <Platforms />

        {/* DESKTOP */}
        <div
          className="hidden lg:grid grid-cols-2 gap-[24px] overflow-hidden justify-center relative lg:-top-24"
          style={{ height: '1018px' }}
        >
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
        <div className="lg:hidden flex flex-col items-center gap-6 mt-36 pb-8 h-[900px]">
          {reviewsData.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   SUB COMPONENTS
========================= */

function Background() {
  return (
    <div className="absolute inset-0 -z-20">
      <CloudinaryImage
        publicId={IMAGES.home.reviews.background}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}

function Header({ t }: { t: any }) {
  return (
    <header className="text-center">
      <h4 className="text-secondary">{t('readRealReviews')}</h4>
      <h2 className="text-secondary">{t('dontJustTakeOurWord')}</h2>
    </header>
  );
}

function Platforms() {
  return (
    <div className="max-w-[450px] w-[clamp(365px,40vw,450px)] mx-auto mt-8">
      <div className="flex items-center justify-center gap-[clamp(16px,4vw,40px)] h-[clamp(40px,6vw,60px)]">
        {PLATFORM_KEYS.map((key) => (
          <div key={key} className="flex items-center justify-center h-full">
            <CloudinaryImage
              publicId={IMAGES.home.reviews.platforms[key]}
              alt={`${key} 5 star reviews`}
              width={500}
              height={150}
              className="h-full w-auto object-contain"
              priority={key === 'google'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopColumn({
  children,
  leftAlign,
}: {
  children: React.ReactNode;
  leftAlign?: boolean;
}) {
  const alignment = leftAlign
    ? 'items-end'
    : 'justify-center -translate-y-[120px]';

  return (
    <div className={`flex flex-col gap-[24px] w-full ${alignment}`}>
      {children}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="bg-card p-6 flex flex-col" style={CARD_STYLES}>
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={AVATAR_CLASSES}>
            <CloudinaryImage
              publicId={IMAGES.home.reviews.avatars[review.avatarIndex]}
              alt={review.name}
              fill
              sizes="(max-width: 1024px) 32px, 72px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-secondary">{review.name}</p>
            <p className="text-secondary">{review.location}</p>
          </div>
        </div>

        <div className="hidden lg:block">{STAR_RATING}</div>
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
        {STAR_RATING}
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