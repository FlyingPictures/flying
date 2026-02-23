'use client'

import { useRef, useState } from 'react'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'
import { useTranslations } from 'next-intl'

export function SafetyFinest() {
  const t = useTranslations('safety.finest')
  const messages = t.raw('cards') as Record<string, { title: string; description: string }>
  const images = IMAGES.safety.finest.cards
  const cards = Object.entries(messages).map(([key, value], index) => ({
    id: key,
    image: images[index],
    title: value.title,
    description: value.description,
  }))

  const [active, setActive] = useState(0)
  const dragStart = useRef<number | null>(null)
  const dragging = useRef(false)

  const goTo = (index: number) => setActive(Math.max(0, Math.min(index, cards.length - 1)))

  const onMouseDown = (e: React.MouseEvent) => {
    dragStart.current = e.clientX
    dragging.current = false
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    if (Math.abs(e.clientX - dragStart.current) > 5) dragging.current = true
  }

  const onMouseUp = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    const delta = dragStart.current - e.clientX
    if (Math.abs(delta) > 50) goTo(delta > 0 ? active + 1 : active - 1)
    dragStart.current = null
  }

  const onTouchStart = (e: React.TouchEvent) => { dragStart.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (dragStart.current === null) return
    const delta = dragStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) goTo(delta > 0 ? active + 1 : active - 1)
    dragStart.current = null
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--background) 0%, var(--background) 95%, #dae2e8 100%)' }}
    >
      <div className="text-center px-6 pt-[clamp(55px,8vw,78px)]">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <CloudinaryImage publicId={IMAGES.home.hero.cameronLogo} alt="Cameron Logo" width={80} height={32} />
            <h4 className="whitespace-pre-line text-left">{t('subtitle')}</h4>
          </div>
        </div>
        <h2 className="whitespace-pre-line">{t('title')}</h2>
        <p className="max-w-187 mx-auto mt-6 whitespace-pre-line">{t('description')}</p>
      </div>

      <div
        className="mt-15 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { dragStart.current = null }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-[clamp(12px,5vw,108px)]"
          style={{
            transform: `translateX(calc(-${active} * (clamp(343px, 85vw, 615px) + clamp(12px, 5vw, 108px)) + calc(50vw - clamp(343px, 85vw, 615px) / 2)))`,
            transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {cards.map((card) => (
            <div key={card.id} className="shrink-0 w-[clamp(343px,85vw,615px)]">
              <div className="overflow-hidden rounded-(--radius) w-full h-[clamp(297px,35vw,434px)]">
                <CloudinaryImage publicId={card.image} alt={card.title} width={1200} height={800} className="object-cover w-full h-full pointer-events-none" />
              </div>
              <div className="mt-6">
                <h3 className="text-card-title">{card.title}</h3>
                <p className="text-card-body mt-3">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex justify-center mt-12 pb-12">
        <div className="flex items-center justify-between w-68 h-18 bg-background rounded-full px-4 shadow-md">
          <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Anterior" className="w-16 h-12 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `oklch(0.2864 0.0496 218.94 / ${active === 0 ? 0.2 : active / (cards.length - 1)})` }} >
            <Arrow />
          </button>

          <div className="flex gap-3" aria-hidden="true">
            {cards.map((_, i) => (
              <span key={i} className={`block h-3 w-3 rounded-full transition-colors duration-300 ${i === active ? 'bg-secondary' : 'bg-secondary/20'}`} />
            ))}
          </div>

          <button onClick={() => goTo(active + 1)} disabled={active === cards.length - 1} aria-label="Siguiente" className="w-16 h-12 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `oklch(0.2864 0.0496 218.94 / ${active === cards.length - 1 ? 0.2 : 1 - active / (cards.length - 1)})` }} >
            <Arrow className="rotate-180" />
          </button>
        </div>
      </div>
    </section>
  )
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="#ffffff" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M224 128a8 8 0 01-8 8H59.31l58.35 58.34a8 8 0 01-11.32 11.32l-72-72a8 8 0 010-11.32l72-72a8 8 0 0111.32 11.32L59.31 120H216a8 8 0 018 8z" />
    </svg>
  )
}