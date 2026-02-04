'use client'

import * as React from 'react'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CardTradition } from '@/components/ui/card'

type TabKey = 'shared' | 'private' | 'vip'

interface Flight {
  id: number
  cat: TabKey
  title: string
  price: string
  cloudinaryId: string
  desc: string
}

interface CardConfig {
  id: string
  titleKey: string
  imgId: string
  btnKey: string
  descKey: string
}

const ALL_FLIGHTS: Flight[] = [
  { id: 1, cat: 'shared', title: 'The Classic Journey', price: '2,599', cloudinaryId: 'v1769270545/toggle1_pydq5z', desc: 'Solo travellers, friends, & couples. Fly in a shared compartmented basket that gives everyone their own corner of the sky. Add extras with transport options and breakfast.' },
  { id: 2, cat: 'private', title: 'Private Escape', price: '5,999', cloudinaryId: 'v1769270545/toggle2_dasi0j', desc: 'Perfect for couples or small groups seeking intimacy. Enjoy the entire basket for yourselves with premium catering and private transfers included.' },
  { id: 3, cat: 'vip', title: 'Luxury Experience', price: '9,999', cloudinaryId: 'v1769270544/toggle3_fd1suy', desc: 'The ultimate sky-high luxury. Dedicated concierge, champagne breakfast on landing, and the most exclusive views in a custom-tailored flight path.' },
]

const CARD_CONFIGS: CardConfig[] = [
  { id: 'tradition', titleKey: 'cards.tradition.title', imgId: 'v1769270545/twocards_1_oijkmu', btnKey: 'cards.tradition.button', descKey: 'cards.tradition.description' },
  { id: 'safety', titleKey: 'cards.safety.title', imgId: 'v1769270544/Rectangle_40_1_x4el6d', btnKey: 'cards.safety.button', descKey: 'cards.safety.description' },
]

export function FlightExperienceSection() {
  const t = useTranslations('FlightExperience')
  const [activeFilter, setActiveFilter] = useState<TabKey>('shared')
  const scrollRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 })

  const scrollToCard = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    const cards = container.querySelectorAll<HTMLElement>('[data-slide]')
    const target = cards[index]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  // Scroll inicial para centrar tarjeta shared al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(0)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const handleScrollSync = () => {
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
      const newFilter = ALL_FLIGHTS[closestIndex].cat
      if (activeFilter !== newFilter) setActiveFilter(newFilter)
    }
    container.addEventListener('scroll', handleScrollSync, { passive: true })
    return () => container.removeEventListener('scroll', handleScrollSync)
  }, [activeFilter])

  useEffect(() => {
    const update = () => {
      const container = pillRef.current
      if (!container) return
      const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>('button'))
      const index = (['shared', 'private', 'vip'] as TabKey[]).indexOf(activeFilter)
      const target = buttons[index]
      if (target) {
        setIndicatorStyle({ left: target.offsetLeft, width: target.offsetWidth })
      }
    }

    update()
    const container = pillRef.current
    let ro: ResizeObserver | null = null
    if (container && (window as any).ResizeObserver) {
      ro = new ResizeObserver(update)
      ro.observe(container)
      Array.from(container.querySelectorAll('button')).forEach(btn => ro!.observe(btn as Element))
    }
    window.addEventListener('resize', update)
    return () => {
      if (ro) ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [activeFilter])

  const activeData = useMemo(() => ALL_FLIGHTS.find(f => f.cat === activeFilter) || ALL_FLIGHTS[0], [activeFilter])

  // Dragging support for desktop with smooth inertia and grab effect
  const [isDragging, setIsDragging] = useState(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)
  const movedRef = useRef(false)
  const velocityRef = useRef(0) // px per ms
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const el = scrollRef.current
    if (!el) return
    isDraggingRef.current = true
    setIsDragging(true)
    movedRef.current = false
    const rect = el.getBoundingClientRect()
    startXRef.current = e.clientX - rect.left
    startScrollRef.current = el.scrollLeft
    lastXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    // prevent text selection while dragging
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const el = scrollRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const walk = x - startXRef.current
    if (Math.abs(walk) > 3) movedRef.current = true

    // velocity in px / ms
    const now = performance.now()
    const dx = e.clientX - lastXRef.current
    const dt = Math.max(1, now - lastTimeRef.current)
    velocityRef.current = dx / dt

    lastXRef.current = e.clientX
    lastTimeRef.current = now

    el.scrollLeft = startScrollRef.current - walk
  }

  const snapToClosestCard = () => {
    const el = scrollRef.current
    if (!el) return
    const containerCenter = el.scrollLeft + el.offsetWidth / 2
    const cards = el.querySelectorAll<HTMLElement>('[data-slide]')
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
    const target = cards[closestIndex]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }

  const startMomentum = () => {
    const el = scrollRef.current
    if (!el) return
    let v = velocityRef.current // px per ms
    const step = () => {
      // decay per frame
      v *= 0.94
      // apply approximately per 16ms frame
      el.scrollLeft -= v * 16
      if (Math.abs(v) > 0.02) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
        snapToClosestCard()
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }

  const endDrag = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      // restore selection
      document.body.style.userSelect = ''
      // start momentum if velocity present
      if (Math.abs(velocityRef.current) > 0.02) {
        startMomentum()
      } else {
        snapToClosestCard()
      }
    }
  }

  useEffect(() => {
    const onUp = () => {
      if (isDraggingRef.current) {
        endDrag()
      }
    }
    window.addEventListener('mouseup', onUp)
    return () => window.removeEventListener('mouseup', onUp)
  }, [])

  return (
    <section className="relative w-full overflow-hidden lg:overflow-visible" style={{ height: 'clamp(2300px, 250vw, 2440px)' }}>
      <div className="absolute inset-0">
        <CloudinaryImage publicId="v1769270546/flightexp_kisynt" alt="Sky" fill priority className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <header
          className="text-center px-6"
          style={{
            paddingTop: 'clamp(55px, 8vw, 78px)',
            marginBottom: 'clamp(25px, 4vw, 33px)',
          }}
        >
          <h4 className="text-foreground uppercase font-bold mb-3">
            {t('subtitle')}
          </h4>
          <h2 className="text-foreground whitespace-pre-line max-w-[916px] mx-auto">
            {t('title')}
          </h2>
        </header>

        {/* SELECTOR (PILL) - Responsive fix */}
        <div className="flex justify-center mb-16 px-6">
          <div 
            ref={pillRef}
            className="relative bg-surface rounded-full flex items-center"
            style={{ 
              padding: 'clamp(9px, 1.2vw, 12px)',
              width: 'clamp(300px, 45vw, 514px)',
              height: 'clamp(52px, 6vw, 72px)',
              gap: '4px'
            }}
          >
            <div
              className="absolute bg-secondary rounded-full transition-all duration-100 ease-out z-0"
              style={{
                height: 'clamp(36px, 4vw, 50px)',
                width: indicatorStyle.width ? `${indicatorStyle.width}px` : undefined,
                left: indicatorStyle.left ? `${indicatorStyle.left}px` : '0px',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            {(['shared', 'private', 'vip'] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveFilter(tab); scrollToCard(ALL_FLIGHTS.findIndex(f => f.cat === tab)) }}
                className={cn(
                  'relative z-10 font-bold transition-colors duration-100 flex items-center justify-center flex-1 min-w-0',
                  'text-[clamp(12px,1.2vw,14px)]',
                  'h-[clamp(36px, 4vw, 50px)]',
                  activeFilter === tab ? 'text-background' : 'text-secondary'
                )}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS CONTAINER */}
        <div className="flex flex-col items-center">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onClickCapture={(e) => { if (movedRef.current) { e.stopPropagation(); e.preventDefault(); movedRef.current = false } }}
            className="flex w-full overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-12"
            style={{
              paddingLeft: 'calc(50vw - 172.5px)',
              paddingRight: 'calc(50vw - 172.5px)',
            }}
          >
            {ALL_FLIGHTS.map((flight, index) => (
              <div key={flight.id} data-slide data-index={index} className="snap-center shrink-0 w-[345px] md:w-[clamp(400px,48vw,698px)] select-none flex flex-col h-[clamp(354px,40vw,580px)]">
                {/* TOP: IMAGE (fixed clamp height, desktop 437, mobile 232) */}
                <div className="relative h-[clamp(232px,30vw,437px)] rounded-[var(--radius)] overflow-hidden shadow-lg">
                  <CloudinaryImage publicId={flight.cloudinaryId} alt={flight.title} fill className="object-cover" />

                  <div className="absolute inset-0 p-6 flex flex-col text-white">
                    <div className="text-center">
                      <h4 className="uppercase text-xs font-bold">{t(`tabs.${flight.cat}`)}</h4>
                      <h3 className="font-libre-baskerville text-[clamp(20px,2vw,24px)]">{flight.title}</h3>
                    </div>
                    <div className="mt-auto flex justify-center items-center gap-4">
                      <strong className="text-[clamp(14px,1.8vw,20px)]">{t('from', { price: flight.price })}</strong>
                      <Button variant="primary" size="sm" >
                        {t("bookFlight")}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* BOTTOM: INFO (fixed clamp height, desktop ~143, mobile ~122) */}
                <div className="h-[clamp(122px,10vw,143px)] flex flex-col items-center px-6 py-0">
                  <div className="flex-1 flex items-center justify-center w-full py-[clamp(12px,2vw,16px)]">
                    <p className="text-center text-popover-foreground font-medium max-w-[649px] text-[clamp(14px,1.4vw,18px)] leading-relaxed">
                      {flight.desc}
                    </p>
                  </div>

                  <button className="font-bold underline text-popover-foreground decoration-foreground text-[clamp(15px,1.5vw,20px)]">
                    {t("flightDetails")}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* AWARDS SECTION */}
        <div
          className="text-center px-6"
          style={{
            marginTop: 'clamp(98px, 10vw, 149px)',
            marginBottom: 'clamp(299px, 25vw, 449px)',
          }}
        >
          <img
            src="https://res.cloudinary.com/dkmjguzvx/image/upload/v1769270546/certificate_tde9fm.png"
            alt="Awards"
            className="mx-auto w-[150px] md:w-[235px] mb-12"
          />

          <div className="max-w-[858px] mx-auto mb-8">
            <h2
              className="text-background"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Award-winning
            </h2>
            <h3
              className="text-background font-libre-baskerville font-normal"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              {t('awardSection.title').replace('Award-winning', '')}
            </h3>
          </div>

          <p className="mx-auto text-white max-w-[clamp(309px,70vw,608px)]">
            {t('awardSection.description')}
          </p>
        </div>
      </div>

      {/* CARDS INFERIORES */}
      <div className="relative w-full px-6 pb-8 lg:absolute lg:bottom-0 lg:left-0 lg:translate-y-1/2 lg:pb-0 lg:z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1231px] mx-auto">
          {CARD_CONFIGS.map((config: CardConfig) => (
            <div key={config.id} className="relative overflow-hidden flex flex-col rounded-[var(--radius)] bg-surface h-[clamp(503px,45vw,650px)]">
              <div className="relative h-[45%]">
                <CloudinaryImage publicId={config.imgId} alt={t(config.titleKey)} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between p-10 h-full text-foreground">
                <div>
                  <h3 className="font-libre-baskerville italic mb-3">{t(config.titleKey)}</h3>
                  <p className="mb-6">{t(config.descKey)}</p>
                </div>
                {config.id === 'tradition' ? (
                  <Button variant="secondary" size="xs" className="w-fit">{t(config.btnKey)}</Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-fit">{t(config.btnKey)}</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}