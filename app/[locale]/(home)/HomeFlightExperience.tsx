'use client'

import * as React from 'react'
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react'
import { useTranslations } from 'next-intl'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IMAGES } from '@/lib/images'

type TabKey = 'shared' | 'private' | 'vip'

const TABS: TabKey[] = ['shared', 'private', 'vip']

const ALL_FLIGHTS = [
  { id: 1, cat: 'shared', image: IMAGES.home.flightExperience.flights.shared },
  { id: 2, cat: 'private', image: IMAGES.home.flightExperience.flights.private },
  { id: 3, cat: 'vip', image: IMAGES.home.flightExperience.flights.vip },
] as const



const findClosestCardIndex = (container: HTMLElement): number => {
  const containerCenter = container.scrollLeft + container.offsetWidth / 2
  const cards = container.querySelectorAll<HTMLElement>('[data-slide]')

  let closestIndex = 0
  let minDistance = Infinity

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(containerCenter - cardCenter)
    if (distance < minDistance) {
      minDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

export function FlightExperienceSection() {
  const t = useTranslations('FlightExperience')
  const [activeFilter, setActiveFilter] = useState<TabKey>('private')

  const scrollRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    raf: null as number | null,
  })

  /* =============== TABS INDICATOR =============== */

  useEffect(() => {
    const update = () => {
      const container = pillRef.current
      if (!container) return

      const buttons = container.querySelectorAll<HTMLButtonElement>('button')
      const index = TABS.indexOf(activeFilter)
      const target = buttons[index]

      if (target) {
        setIndicatorStyle({
          left: target.offsetLeft,
          width: target.offsetWidth,
        })
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [activeFilter])

  /* =============== CAROUSEL LOGIC =============== */

  const scrollToCard = useCallback((index: number, smooth = true) => {
    const container = scrollRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>('[data-slide]')
    const target = cards[index]
    if (!target) return

    const cardCenter = target.offsetLeft + target.offsetWidth / 2
    const containerCenter = container.offsetWidth / 2
    const targetScroll = cardCenter - containerCenter

    if (smooth) {
      container.scrollTo({ left: targetScroll, behavior: 'smooth' })
    } else {
      container.scrollLeft = targetScroll
    }
  }, [])

  const snapToClosestCard = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    scrollToCard(findClosestCardIndex(container))
  }, [scrollToCard])

  useLayoutEffect(() => {
    scrollToCard(1, false)
  }, [scrollToCard])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const onScroll = () => {
      const index = findClosestCardIndex(container)
      setActiveFilter((prev) =>
        ALL_FLIGHTS[index].cat !== prev ? ALL_FLIGHTS[index].cat : prev
      )
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const startMomentum = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    let v = dragRef.current.velocity

    const step = () => {
      v *= 0.96
      el.scrollLeft -= v * 16

      if (Math.abs(v) > 0.015) {
        dragRef.current.raf = requestAnimationFrame(step)
      } else {
        snapToClosestCard()
      }
    }

    dragRef.current.raf = requestAnimationFrame(step)
  }, [snapToClosestCard])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const el = scrollRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    dragRef.current.isDragging = true
    dragRef.current.moved = false
    dragRef.current.startX = e.clientX - rect.left
    dragRef.current.startScroll = el.scrollLeft
    dragRef.current.lastX = e.clientX
    dragRef.current.lastTime = performance.now()
    dragRef.current.velocity = 0

    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.isDragging) return
    const el = scrollRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const walk = x - dragRef.current.startX

    if (Math.abs(walk) > 3) dragRef.current.moved = true

    const now = performance.now()
    const dx = e.clientX - dragRef.current.lastX
    const dt = Math.max(1, now - dragRef.current.lastTime)

    dragRef.current.velocity = dx / dt
    dragRef.current.lastX = e.clientX
    dragRef.current.lastTime = now

    el.scrollLeft = dragRef.current.startScroll - walk
  }

  const endDrag = useCallback(() => {
    if (!dragRef.current.isDragging) return

    dragRef.current.isDragging = false
    document.body.style.userSelect = ''
    document.body.style.cursor = ''

    Math.abs(dragRef.current.velocity) > 0.015
      ? startMomentum()
      : snapToClosestCard()
  }, [snapToClosestCard, startMomentum])

  useEffect(() => {
    window.addEventListener('mouseup', endDrag)
    return () => window.removeEventListener('mouseup', endDrag)
  }, [endDrag])

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.moved = false
    }
  }



  /* =============== JSX =============== */

  return (
    <section
      className="
        relative 
        w-full 
        overflow-visible 
        lg:bg-none
        bg-[linear-gradient(to_bottom,theme(colors.background)_0%,theme(colors.background)_20%,#758C9C_60%,#7e899b_100%)]
      "
      style={{ height: 'clamp(2300px, 250vw, 2440px)' }}
      >
        <div className="absolute top-0 left-0 w-full h-[1556px] lg:inset-0 lg:h-full">
          <CloudinaryImage
            publicId={IMAGES.home.flightExperience.background}
            alt="Sky"
            fill
            priority
            sizes="100vw"
            className="object-contain object-bottom lg:object-cover lg:object-center"
          />
        </div>

      <div className="relative mx-auto">
        {/* HEADER */}
        <header
          className="text-center px-6"
          style={{
            paddingTop: 'clamp(55px, 8vw, 78px)',
            marginBottom: 'clamp(25px, 4vw, 33px)',
          }}
        >
          <h4 className="text-foreground  mb-3">
            {t('subtitle')}
          </h4>
          <h2 className="text-foreground whitespace-pre-line max-w-[916px] mx-auto">
            {t('title')}
          </h2>
        </header>

        {/* TABS */}
        <div className="flex justify-center mb-[clamp(24px,7vw,106px)] px-6">
          <div
            ref={pillRef}
            className="relative bg-surface rounded-full flex items-center"
            style={{
              padding: 'clamp(9px, 1.2vw, 12px)',
              width: 'clamp(300px, 45vw, 514px)',
              height: 'clamp(52px, 6vw, 72px)',
              gap: '4px',
            }}
          >
            <div
              className="absolute bg-secondary rounded-full transition-all duration-100 ease-out z-0"
              style={{
                height: 'clamp(36px, 4vw, 50px)',
                width: indicatorStyle.width,
                left: indicatorStyle.left,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveFilter(tab)
                  scrollToCard(
                    ALL_FLIGHTS.findIndex((f) => f.cat === tab),
                    true
                  )
                }}
                className={cn(
                  'relative z-10 font-bold transition-colors duration-100 flex items-center justify-center flex-1 min-w-0',
                  'text-[clamp(12px,1.2vw,14px)]',
                  'h-[clamp(36px, 4vw, 50px)]',
                  activeFilter === tab
                    ? 'text-background'
                    : 'text-secondary'
                )}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="flex flex-col items-center">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onClickCapture={handleClickCapture}
            className="flex w-full overflow-x-auto no-scrollbar gap-[108px]"
            style={{
              paddingLeft: 'calc(50vw - 172.5px)',
              paddingRight: 'calc(50vw - 172.5px)',
            }}
          >
            {ALL_FLIGHTS.map((flight, index) => (
              <div
                key={flight.id}
                data-slide
                data-index={index}
                className="
                  shrink-0
                  w-[85vw]
                  sm:w-[345px]
                  md:w-[clamp(400px,48vw,698px)]
                  select-none
                  flex
                  flex-col
                  min-h-[clamp(354px,40vw,580px)]
                ">
                <div className="relative h-[clamp(232px,30vw,437px)] rounded-[var(--radius)] overflow-hidden">
                  <CloudinaryImage
                    publicId={flight.image}
                    alt={t(`tabs.${flight.cat}`)}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-secondary/75 opacity-50" />

                  <div className="absolute inset-0 p-6 flex flex-col text-white">
                    <div className="text-center">
                      <h4>
                        {t('flightBadge', {
                          type: t(`tabs.${flight.cat}`),
                        })}
                      </h4>
                      <h3 className="font-libre-baskerville text-[clamp(20px,2vw,24px)]">
                        {t(`titles.${flight.cat}`)}
                      </h3>
                    </div>

                    <div className="mt-auto flex justify-center items-center gap-4">
                      <strong className="text-[clamp(14px,1.8vw,20px)]">
                        {t('from', {
                          price: t(`prices.${flight.cat}`),
                        })}
                      </strong>
                      <Button variant="primary" size="xs">
                        {t('bookFlight')}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center px-2 py-4 h-[clamp(140px,12vw,170px)]">
                  <p className="flex-1 text-center text-popover-foreground max-w-[649px] text-[clamp(14px,1.4vw,18px)] leading-relaxed whitespace-pre-line">
                    {t(`descriptions.${flight.cat}`)}
                  </p>

                  <button className="font-bold underline text-popover-foreground decoration-foreground text-[clamp(15px,1.5vw,20px)]">
                    {t('flightDetails')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AWARDS + TEXT */}
        <div
          className="text-center px-6"
          style={{
            marginTop: 'clamp(98px, 10vw, 149px)',
            marginBottom: 'clamp(299px, 25vw, 449px)',
          }}
        >
          <CloudinaryImage
            publicId={IMAGES.home.flightExperience.awards.certificate}
            alt="Awards"
            width={235}
            className="mx-auto w-[150px] md:w-[235px] mb-[clamp(16px,8vw,108px)]"
          />

          <div className="max-w-[858px] mx-auto mb-8">
            <h2
              className="text-background"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {t('awardSection.title')}
            </h2>
            <h3
              className="text-background font-libre-baskerville font-normal"
              style={{ fontSize: 'clamp(24px, 5vw, 64px)' }}
            >
              {t('awardSection.subtitle')}
            </h3>
          </div>

          <p className="mx-auto text-white max-w-[clamp(309px,70vw,608px)]">
            {t('awardSection.description')}
          </p>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="relative w-full px-6 pb-8 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-1/2 lg:pb-0 lg:z-20 -mt-20 lg:mt-0 z-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 max-w-[1231px] mx-auto">
          {/* TRADITION CARD */}
          <div className="relative w-full max-w-[608px] h-[503px] lg:h-[clamp(503px,55vw,797px)] flex flex-col rounded-[var(--radius)] overflow-hidden">
  
            <div className="relative h-[207px] lg:h-[clamp(207px,30vw,444px)]">
              <CloudinaryImage
                publicId={IMAGES.home.flightExperience.bottomCards.tradition}
                alt={t('cards.tradition.title')}
                fill
                className="object-cover object-top"
              />
            </div>

            <div
              className="
                flex flex-col
                bg-card
                h-[296px]
                lg:flex-1 lg:h-auto
                p-[clamp(16px,4vw,24px)]
                lg:p-[clamp(24px,2.7vw,40px)]
              "
            >
              <h3 className="text-card-title text-secondary">
                {t('cards.tradition.title')}
              </h3>

              <div className="flex-1 flex items-center">
                <p className="text-card-body text-secondary">
                  {t('cards.tradition.description')}
                </p>
              </div>

              <div className="flex items-end justify-between gap-[clamp(12px,2vw,24px)]">
                <Button variant="secondary" size="sm" className="w-fit">
                  <span className="lg:hidden">
                    {t('cards.tradition.button').split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="hidden lg:inline">
                    {t('cards.tradition.button').split(' ').slice(0, 3).join(' ')}
                  </span>
                </Button>

                <div className="relative w-[clamp(142px,20vw,283px)] aspect-[283/72]">
                  <CloudinaryImage
                    publicId={IMAGES.home.flightExperience.awards.badge}
                    alt={t('cards.tradition.award_label')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* SAFETY CARD */}
            <div className="relative w-full max-w-[608px] h-[503px] lg:h-[clamp(503px,55vw,797px)] flex flex-col overflow-hidden rounded-[var(--radius)]">

          <CloudinaryImage
            publicId={IMAGES.home.flightExperience.bottomCards.safety}
            alt={t('cards.safety.title')}
            fill
            className="object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0" />

          <div
            className="
              relative z-10
              w-full
              h-[296px]
              lg:h-[clamp(296px,22vw,353px)]
              mt-auto
              p-[clamp(16px,4vw,24px)]
              lg:p-[clamp(24px,2.7vw,40px)]
              flex flex-col
            "
          >

            <h3 className="text-card-title text-white">
              {t('cards.safety.title')}
            </h3>

            <div className="flex-1 flex items-center">
              <p className="text-card-body text-white/90">
                {t('cards.safety.description')}
              </p>
            </div>

            <div>
              <Button variant="outline" size="sm" className="w-fit">
                {t('cards.safety.button')}
              </Button>
            </div>

          </div>
        </div>

        </div>
      </div>
    </section>
  )
}