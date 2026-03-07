'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { useTranslations } from 'next-intl'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/images'

type TabKey = 'shared' | 'private' | 'vip'

const TABS: TabKey[] = ['shared', 'private', 'vip']

const ALL_FLIGHTS = [
  { id: 1, cat: 'shared' as TabKey, image: IMAGES.home.flightExperience.flights.shared },
  { id: 2, cat: 'private' as TabKey, image: IMAGES.home.flightExperience.flights.private },
  { id: 3, cat: 'vip' as TabKey, image: IMAGES.home.flightExperience.flights.vip },
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
  const [activeFilter, setActiveFilter] = useState<TabKey>('private')
  const scrollRef = useRef<HTMLDivElement>(null)
  const { pillRef, indicatorStyle } = usePillIndicator(activeFilter)
  const isProgrammaticScroll = useRef(false)

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return
    scrollToIndex(container, 1, false)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const syncPill = () => {
      isProgrammaticScroll.current = false
      const newCat = ALL_FLIGHTS[getClosestCardIndex(container)].cat
      setActiveFilter(prev => prev !== newCat ? newCat : prev)
    }

    if ('onscrollend' in window) {
      container.addEventListener('scrollend', syncPill, { passive: true })
      return () => container.removeEventListener('scrollend', syncPill)
    } else {
      let timeout: ReturnType<typeof setTimeout>
      const handleScroll = () => { clearTimeout(timeout); timeout = setTimeout(syncPill) }
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => { container.removeEventListener('scroll', handleScroll); clearTimeout(timeout) }
    }
  }, [])

  const snapToClosest = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    scrollToIndex(container, getClosestCardIndex(container))
  }, [])

  const dragHandlers = useMouseDrag(scrollRef, snapToClosest)

  const handleTabClick = useCallback((tab: TabKey) => {
    const container = scrollRef.current
    if (!container) return
    setActiveFilter(tab)
    isProgrammaticScroll.current = true
    scrollToIndex(container, ALL_FLIGHTS.findIndex(f => f.cat === tab))
  }, [])

  return (
    <section
      className="relative w-full overflow-visible lg:bg-none bg-[linear-gradient(to_bottom,theme(colors.background)_0%,theme(colors.background)_20%,#758C9C_60%,#7e899b_100%)]"
      style={{ height: 'clamp(2300px,250vw,2440px)' }}
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-389 lg:inset-0 lg:h-full">
        <CloudinaryImage
          publicId={IMAGES.home.flightExperience.background}
          alt="Sky"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom lg:object-cover lg:object-center"
        />
      </div>

      {/* Header */}
      <header
        className="relative text-center px-6"
        style={{ paddingTop: 'clamp(55px,8vw,78px)', marginBottom: 'clamp(25px,4vw,33px)' }}
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
              transition: 'transform 80ms ease-out, width 80ms ease-out',
              willChange: 'transform',
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
      <div className="relative flex flex-col items-center">
        <div
          ref={scrollRef}
          {...dragHandlers}
          className="flex w-full overflow-x-auto no-scrollbar gap-27 cursor-grab active:cursor-grabbing"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50vw - 172.5px)',
            paddingRight: 'calc(50vw - 172.5px)',
          }}
        >
          {ALL_FLIGHTS.map((flight, index) => (
            <div
              key={flight.id}
              data-slide
              data-index={index}
              className="shrink-0 w-[85vw] sm:w-86 md:w-[clamp(400px,48vw,698px)] select-none flex flex-col min-h-[clamp(354px,40vw,580px)]"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div className="relative h-[clamp(232px,30vw,437px)] rounded-(--radius) overflow-hidden">
                <CloudinaryImage
                  publicId={flight.image}
                  alt={t(`tabs.${flight.cat}`)}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 345px, (max-width: 1024px) 48vw, 698px"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-secondary/20 via-transparent to-secondary/75 opacity-50" />
                <div className="absolute inset-0 p-6 flex flex-col text-background">
                  <div className="text-center">
                    <h4>{t('flightBadge', { type: t(`tabs.${flight.cat}`) })}</h4>
                    <h3 className="font-libre-baskerville text-[clamp(20px,2vw,24px)]">
                      {t(`titles.${flight.cat}`)}
                    </h3>
                  </div>
                  <div className="mt-auto flex justify-center items-center gap-4">
                    <strong className="text-[clamp(14px,1.8vw,20px)]">
                      {t('from', { price: t(`prices.${flight.cat}`) })}
                    </strong>
                    <Button variant="primary" size="xs">{t('bookFlight')}</Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center px-2 py-4">
                <p className="text-center text-popover-foreground max-w-166.25 text-[clamp(14px,1.4vw,18px)] leading-relaxed whitespace-pre-line">
                  {t(`descriptions.${flight.cat}`)}
                </p>
                <button className="font-bold underline text-popover-foreground decoration-foreground text-[clamp(15px,1.5vw,20px)] mt-2">
                  {t('flightDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div
        className="relative text-center px-6"
        style={{ marginTop: 'clamp(98px,10vw,149px)', marginBottom: 'clamp(299px,25vw,449px)' }}
      >
        <CloudinaryImage
          publicId={IMAGES.home.flightExperience.awards.certificate}
          alt="Awards"
          width={700}
          height={700}
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
      <div className="relative w-full px-6 pb-8 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-1/2 lg:pb-0 lg:z-20 -mt-20 lg:mt-0 z-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-308 mx-auto">

          <article className="relative w-full max-w-152 h-126 lg:h-[clamp(503px,55vw,797px)] flex flex-col rounded-(--radius) overflow-hidden bg-card">
            <div className="relative h-52 lg:h-[clamp(207px,30vw,444px)]">
              <CloudinaryImage
                publicId={IMAGES.home.flightExperience.bottomCards.tradition}
                alt={t('cards.tradition.title')}
                width={608}
                height={444}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col flex-1 p-[clamp(16px,4vw,24px)] lg:p-[clamp(24px,2.7vw,40px)] justify-between">
              <h3 className="text-card-title text-secondary">{t('cards.tradition.title')}</h3>
              <p className="text-card-body text-secondary my-auto">{t('cards.tradition.description')}</p>
              <div className="flex items-end justify-between gap-[clamp(12px,2vw,24px)]">
                <Button variant="secondary" size="sm" className="w-fit">
                  <span className="lg:hidden">{t('cards.tradition.button').split(' ').slice(0, 2).join(' ')}</span>
                  <span className="hidden lg:inline">{t('cards.tradition.button').split(' ').slice(0, 3).join(' ')}</span>
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
              sizes="(max-width: 768px) 100vw, 608px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-linear-to-t from-accent-foreground/70 via-black/40 to-transparent" />
            <div className="relative z-10 w-full h-74 lg:h-[clamp(296px,22vw,353px)] mt-auto p-[clamp(16px,4vw,24px)] lg:p-[clamp(24px,2.7vw,40px)] flex flex-col justify-between">
              <h3 className="text-card-title text-background">{t('cards.safety.title')}</h3>
              <p className="text-card-body text-background/90">{t('cards.safety.description')}</p>
              <Button variant="outline" size="sm" className="w-fit">{t('cards.safety.button')}</Button>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}