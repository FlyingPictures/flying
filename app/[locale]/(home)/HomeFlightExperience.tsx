// FlightExperienceSection.tsx
'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/images'
import { BOOKING_URLS, PRODUCT_PRICING, ProductSlug, formatMxn, getProductName } from '@/lib/commercial-config'
import { Link } from '@/i18n/routing'

type TabKey = 'shared' | 'private' | 'vip'

const TABS: TabKey[] = ['shared', 'private', 'vip']

const getMiddleIndex = (length: number): number => Math.floor((length - 1) / 2)

type HomeFlight = {
  slug: Exclude<ProductSlug, 'open' | 'corporate'>
  cat: TabKey
  image: string
  imageClassName?: string
  featured?: boolean
}

const ALL_FLIGHTS: HomeFlight[] = [
  { slug: 'transport', cat: 'shared', image: IMAGES.product.gallery.transport[0], imageClassName: 'object-[center_48%]', featured: true },
  { slug: 'classic', cat: 'shared', image: IMAGES.product.gallery.classic[0], imageClassName: 'object-[center_42%]' },
  { slug: 'journey', cat: 'shared', image: IMAGES.product.gallery.journey[0], imageClassName: 'object-[center_45%]' },
  { slug: 'proposal', cat: 'private', image: IMAGES.product.gallery.proposal[0], imageClassName: 'object-[center_48%]' },
  { slug: 'anniversary', cat: 'private', image: IMAGES.product.gallery.anniversary[0], imageClassName: 'object-[center_45%]' },
  { slug: 'birthday', cat: 'private', image: IMAGES.product.gallery.birthday[0], imageClassName: 'object-[center_44%]' },
  { slug: 'vip', cat: 'vip', image: IMAGES.product.gallery.vip[0], imageClassName: 'object-[center_46%]', featured: true },
]

const getClosestCardIndex = (container: HTMLElement): number => {
  const containerCenter = container.scrollLeft + container.offsetWidth / 2
  const cards = container.querySelectorAll<HTMLElement>('[data-slide]')
  let closestIndex = 0
  let minDistance = Infinity
  cards.forEach((card, index) => {
    const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - containerCenter)
    if (distance < minDistance) { minDistance = distance; closestIndex = index }
  })
  return closestIndex
}

const scrollToIndex = (container: HTMLElement, index: number, smooth = true) => {
  const cards = container.querySelectorAll<HTMLElement>('[data-slide]')
  const target = cards[index]
  if (!target) return
  container.scrollTo({
    left: target.offsetLeft + target.offsetWidth / 2 - container.offsetWidth / 2,
    behavior: smooth ? 'smooth' : 'instant',
  })
}

function usePillIndicator(activeFilter: TabKey) {
  const pillRef = useRef<HTMLDivElement | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const update = () => {
      const container = pillRef.current
      if (!container) return
      const buttons = container.querySelectorAll<HTMLButtonElement>('button')
      const target = buttons[TABS.indexOf(activeFilter)]
      if (target) setIndicatorStyle({ left: target.offsetLeft, width: target.offsetWidth })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [activeFilter])

  return { pillRef, indicatorStyle }
}

function useMouseDrag(scrollRef: React.RefObject<HTMLDivElement | null>, onDragEnd: () => void) {
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const el = scrollRef.current
    if (!el) return
    el.style.scrollSnapType = 'none'
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return
    const el = scrollRef.current
    if (!el) return
    const walk = e.clientX - drag.current.startX
    if (Math.abs(walk) > 3) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - walk
  }

  const onMouseUp = useCallback(() => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = scrollRef.current
    if (el) el.style.scrollSnapType = 'x mandatory'
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    onDragEnd()
  }, [onDragEnd, scrollRef])

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)
    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [onMouseUp])

  return { onMouseDown, onMouseMove, onMouseUp, onClickCapture }
}

export function FlightExperienceSection() {
  const t = useTranslations('FlightExperience')
  const productT = useTranslations('flightExperiences.cards')
  const locale = useLocale()
  const [activeFilter, setActiveFilter] = useState<TabKey>('shared')
  const [activeIndex, setActiveIndex] = useState(() =>
    getMiddleIndex(ALL_FLIGHTS.filter((flight) => flight.cat === 'shared').length),
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const { pillRef, indicatorStyle } = usePillIndicator(activeFilter)
  const visibleFlights = useMemo(
    () => ALL_FLIGHTS.filter((flight) => flight.cat === activeFilter),
    [activeFilter],
  )

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const syncIndex = () => setActiveIndex(getClosestCardIndex(container))

    if ('onscrollend' in window) {
      container.addEventListener('scrollend', syncIndex, { passive: true })
      return () => container.removeEventListener('scrollend', syncIndex)
    } else {
      let timeout: ReturnType<typeof setTimeout>
      const handleScroll = () => { clearTimeout(timeout); timeout = setTimeout(syncIndex, 120) }
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => { container.removeEventListener('scroll', handleScroll); clearTimeout(timeout) }
    }
  }, [activeFilter])

  React.useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const middleIndex = getMiddleIndex(visibleFlights.length)
    setActiveIndex(middleIndex)
    scrollToIndex(container, middleIndex, false)
  }, [visibleFlights])

  const snapToClosest = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    scrollToIndex(container, getClosestCardIndex(container))
  }, [])

  const dragHandlers = useMouseDrag(scrollRef, snapToClosest)

  const handleTabClick = useCallback((tab: TabKey) => {
    if (tab === activeFilter) {
      const container = scrollRef.current
      const middleIndex = getMiddleIndex(visibleFlights.length)
      setActiveIndex(middleIndex)
      if (container) scrollToIndex(container, middleIndex)
      return
    }
    setActiveFilter(tab)
  }, [activeFilter, visibleFlights.length])

  const moveTo = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const nextIndex = Math.max(0, Math.min(index, visibleFlights.length - 1))
    setActiveIndex(nextIndex)
    scrollToIndex(container, nextIndex)
  }, [visibleFlights.length])

  return (
    <section
      className="relative w-full overflow-visible bg-[linear-gradient(to_bottom,theme(colors.background)_0%,theme(colors.background)_24%,#758C9C_62%,#7e899b_100%)]"
      style={{ minHeight: 'clamp(2300px,250vw,2440px)' }}
    >
      {/* Background */}
      <div className="absolute left-0 top-48 h-341 w-full opacity-90 lg:inset-x-0 lg:top-52 lg:h-[calc(100%-13rem)]">
        <CloudinaryImage
          publicId={IMAGES.home.flightExperience.background}
          alt="Sky"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom lg:object-cover lg:object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_100%)]"
        />
      </div>

      {/* Header */}
      <header
        className="relative text-center px-6"
        style={{ paddingTop: 'clamp(72px,9vw,112px)', marginBottom: 'clamp(25px,4vw,33px)' }}
      >
        <h4 className="text-foreground mb-3">{t('subtitle')}</h4>
        <h2 className="text-foreground whitespace-pre-line max-w-229 mx-auto">{t('title')}</h2>
      </header>

      {/* Pill tabs */}
      <div className="relative flex justify-center mb-[clamp(24px,7vw,106px)] px-6">
        <div
          ref={pillRef}
          className="relative bg-background rounded-full flex items-center"
          style={{ padding: 'clamp(9px,1.2vw,12px)', width: 'clamp(300px,45vw,514px)', height: 'clamp(52px,6vw,72px)', gap: '4px' }}
        >
          <div
            className="absolute bg-secondary rounded-full"
            style={{
              height: 'clamp(36px,4vw,50px)',
              width: indicatorStyle.width,
              left: 0,
              top: '50%',
              transform: `translateY(-50%) translateX(${indicatorStyle.left}px)`,
              transition: 'transform 80ms ease-out',
              willChange: 'transform',
              // width sin transition — cambia instantáneo, solo el movimiento anima
            }}
          />
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={cn(
                'relative font-bold transition-colors duration-100 flex items-center justify-center flex-1 min-w-0',
                'text-[clamp(12px,1.2vw,14px)] h-[clamp(36px,4vw,50px)]',
                activeFilter === tab ? 'text-background' : 'text-secondary'
              )}
            >
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative flex flex-col items-center [--slide-width:min(84vw,620px)] md:[--slide-width:min(62vw,620px)] lg:[--slide-width:min(48vw,620px)]"
      >
        <div
          ref={scrollRef}
          {...dragHandlers}
          className="flex w-full overflow-x-auto no-scrollbar gap-[clamp(16px,3vw,36px)] cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50vw - var(--slide-width) / 2)',
            paddingRight: 'calc(50vw - var(--slide-width) / 2)',
            maskImage: 'linear-gradient(to right, transparent 0, black clamp(32px, 7vw, 100px), black calc(100% - clamp(32px, 7vw, 100px)), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, black clamp(32px, 7vw, 100px), black calc(100% - clamp(32px, 7vw, 100px)), transparent 100%)',
          }}
        >
          {visibleFlights.map((flight, index) => {
            const pricing = PRODUCT_PRICING[flight.slug]!
            const bookingUrl = BOOKING_URLS[flight.slug]!

            return (
            <article
              key={flight.slug}
              data-slide
              data-index={index}
              className="shrink-0 w-[var(--slide-width)] select-none flex flex-col"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div className="relative aspect-[16/10] rounded-(--radius) overflow-hidden bg-secondary/10 shadow-[0_18px_50px_rgba(3,48,59,0.12)]">
                <CloudinaryImage
                  publicId={flight.image}
                  alt={getProductName(flight.slug, locale)}
                  fill
                  sizes="(max-width: 767px) 84vw, (max-width: 1023px) 62vw, 620px"
                  className={`w-full h-full object-cover ${flight.imageClassName ?? ''}`}
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/5 via-65% to-transparent" />
                <div className="absolute inset-0 p-[clamp(18px,4vw,32px)] flex flex-col text-background">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                    <h4>{t('flightBadge', { type: t(`tabs.${flight.cat}`) })}</h4>
                    <h3 className="font-libre-baskerville text-[clamp(23px,3vw,34px)] leading-tight mt-1 max-w-120">
                      {getProductName(flight.slug, locale)}
                    </h3>
                    </div>
                    {flight.featured && (
                      <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary">
                        {t('featured')}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto flex flex-wrap justify-between items-center gap-3">
                    <strong className="text-[clamp(16px,2vw,22px)]">
                      {t('from', { price: formatMxn(pricing.primary) })}
                    </strong>
                    <Button variant="primary" size="xs" asChild>
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                        {t('bookFlight')}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center px-4 py-5">
                <p className="text-center text-popover-foreground max-w-150 text-[clamp(14px,1.4vw,17px)] leading-relaxed">
                  {productT(`subtitles.${flight.slug}`)}
                </p>
                <Link
                  href={`/product/${flight.slug}`}
                  scroll
                  className="font-bold underline text-popover-foreground decoration-current underline-offset-4 text-[clamp(15px,1.5vw,18px)] mt-3"
                >
                  {t('flightDetails')}
                </Link>
              </div>
            </article>
          )})}
        </div>

        <div className="relative z-30 mt-2 flex items-center gap-4 rounded-full bg-background/90 px-4 py-2 shadow-sm backdrop-blur-sm">
          <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label={t('previousPackage')} className="flex size-10 items-center justify-center rounded-full border border-secondary/20 text-secondary transition disabled:opacity-30 hover:bg-secondary hover:text-background">←</button>
          <span className="min-w-16 text-center text-sm font-bold text-secondary">
            {t('packageCount', { current: activeIndex + 1, total: visibleFlights.length })}
          </span>
          <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === visibleFlights.length - 1} aria-label={t('nextPackage')} className="flex size-10 items-center justify-center rounded-full border border-secondary/20 text-secondary transition disabled:opacity-30 hover:bg-secondary hover:text-background">→</button>
        </div>
      </div>

      {/* Awards */}
      <div
        className="relative text-center px-6"
        style={{ marginTop: 'clamp(98px,10vw,149px)', marginBottom: 'clamp(72px,8vw,120px)' }}
      >
        <CloudinaryImage
          publicId={IMAGES.home.flightExperience.awards.certificate}
          alt="Awards"
          width={236}  
          height={63}
          className="mx-auto w-37.5 md:w-59 mb-[clamp(16px,8vw,108px)]"
        />
        <div className="max-w-214.5 mx-auto mb-8">
          <h2 className="text-background" style={{ fontSize: 'clamp(36px,5vw,64px)' }}>
            {t('awardSection.title')}
          </h2>
          <h3
            className="text-background font-libre-baskerville font-normal"
            style={{ fontSize: 'clamp(24px,5vw,64px)' }}
          >
            {t('awardSection.subtitle')}
          </h3>
        </div>
        <p className="mx-auto text-background max-w-[clamp(309px,70vw,608px)]">
          {t('awardSection.description')}
        </p>
      </div>

      {/* Bottom cards */}
      <div className="relative z-20 w-full px-6 pb-20 lg:pb-28">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-308 mx-auto">

          <article className="relative w-full max-w-152 min-h-126 lg:h-[clamp(503px,55vw,797px)] flex flex-col rounded-(--radius) overflow-hidden bg-card">
            <div className="relative h-60 md:h-76 lg:h-[clamp(207px,30vw,444px)] shrink-0">
              <CloudinaryImage
                publicId={IMAGES.home.flightExperience.bottomCards.tradition}
                alt={t('cards.tradition.title')}
                width={608}
                height={444}
                className="w-full h-full object-cover object-[center_38%]"
              />
            </div>
            <div className="flex flex-col flex-1 p-[clamp(16px,4vw,24px)] lg:p-[clamp(24px,2.7vw,40px)] justify-between">
              <h3 className="text-card-title text-secondary">{t('cards.tradition.title')}</h3>
              <p className="text-card-body text-secondary my-auto">{t('cards.tradition.description')}</p>
              <div className="flex items-end justify-between gap-[clamp(12px,2vw,24px)]">
                <Button variant="secondary" size="sm" className="w-fit" asChild>
                  <Link href="/flight-experiences">
                    {t('cards.tradition.button')}
                  </Link>
                </Button>
                <div className="relative w-[clamp(142px,20vw,283px)] aspect-283/72">
                  <CloudinaryImage
                    publicId={IMAGES.home.flightExperience.awards.badge}
                    alt={t('cards.tradition.award_label')}
                    width={283}  
                    height={72}
                    className="w-full h-auto object-contain"
/>
                </div>
              </div>
            </div>
          </article>

          <article className="relative w-full max-w-152 h-126 lg:h-[clamp(503px,55vw,797px)] flex flex-col overflow-hidden rounded-(--radius)">
            <CloudinaryImage
              publicId={IMAGES.home.flightExperience.bottomCards.safety}
              alt={t('cards.safety.title')}
              fill
              urlWidth={800}
              sizes="(max-width: 768px) 100vw, 608px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-accent-foreground/70 via-black/40 to-transparent" />
            <div className="relative z-10 w-full h-74 lg:h-[clamp(296px,22vw,353px)] mt-auto p-[clamp(16px,4vw,24px)] lg:p-[clamp(24px,2.7vw,40px)] flex flex-col justify-between">
              <h3 className="text-card-title text-background">{t('cards.safety.title')}</h3>
              <p className="text-card-body text-background/90">{t('cards.safety.description')}</p>
              <Button variant="outline" size="sm" className="w-fit" asChild>
                <Link href="/safety-heritage">{t('cards.safety.button')}</Link>
              </Button>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}
