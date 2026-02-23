'use client'

import { useRef, useState } from 'react'
import { CloudinaryImage } from '@/components/CloudinaryImage'
import { IMAGES } from '@/lib/images'
import { useTranslations } from 'next-intl'

const FLAGS: Record<string, React.ReactNode> = {
  gb: <svg width="24" height="16" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="40" fill="#012169"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth={8}/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth={5}/><path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth={13}/><path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth={8}/></svg>,
  mx: <svg width="24" height="16" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="60" fill="#006847"/><rect x="30" width="30" height="60" fill="#fff"/><rect x="60" width="30" height="60" fill="#CE1126"/><ellipse cx="45" cy="32" rx="7" ry="5" fill="#6B8C3E"/><ellipse cx="45" cy="28" rx="4" ry="6" fill="#8B4513"/><circle cx="45" cy="23" r="4" fill="#8B4513"/></svg>,
}

function Flag({ code }: { code: string }) {
  return <span className="shrink-0 inline-flex">{FLAGS[code] ?? null}</span>
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="#ffffff" viewBox="0 0 256 256" aria-hidden="true">
      <path d="M224 128a8 8 0 01-8 8H59.31l58.35 58.34a8 8 0 01-11.32 11.32l-72-72a8 8 0 010-11.32l72-72a8 8 0 0111.32 11.32L59.31 120H216a8 8 0 018 8z" />
    </svg>
  )
}

export function SafetyTale() {
  const t = useTranslations('safety.tale')
  const messages = t.raw('cards') as Record<string, { flag: string; title: string; description: string }>
  const images = IMAGES.safety.tale.cards
  const cards = Object.entries(messages).map(([key, value], index) => ({
    id: key,
    image: images[index],
    flag: value.flag,
    title: value.title,
    description: value.description,
  }))

  const [active, setActive] = useState(0)
  const dragStart = useRef<number | null>(null)

  const goTo = (index: number) => setActive(Math.max(0, Math.min(index, cards.length - 1)))

  const onMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX }
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
    <section className="relative w-full h-194 md:h-242 flex flex-col overflow-hidden">
      <div className="px-4 md:px-18 md:mt-20 pt-[clamp(55px,8vw,78px)] flex flex-col items-center text-center">
        <h4 className="mb-2">{t('subtitle')}</h4>
        <h2 className="whitespace-pre-line">{t('title')}</h2>
        <p className="hidden md:block max-w-150 mt-8 whitespace-pre-line">{t('description')}</p>
      </div>

      <div className="mt-8 md:mt-30 cursor-grab active:cursor-grabbing select-none" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={() => { dragStart.current = null }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex gap-[clamp(12px,2.15vw,31px)]" style={{ paddingLeft: 'clamp(16px, 4.97vw, 72px)', transform: `translateX(calc(-${active} * (clamp(340px, 25.35vw, 365px) + clamp(12px, 2.15vw, 31px))))`, transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          {cards.map((card) => (
            <div key={card.id} className="shrink-0 w-[clamp(340px,25.35vw,365px)]">
              <div className="relative overflow-hidden rounded-(--radius) w-full h-110">
                <CloudinaryImage publicId={card.image} alt={card.title} width={365} height={437} className="object-cover w-full h-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <Flag code={card.flag} />
                    <h3 className="text-background">{card.title}</h3>
                  </div>
                  <p className="text-background text-left text-card-body mt-4">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden flex justify-center pb-6 mt-auto">
        <div className="flex items-center justify-between h-18 bg-background rounded-full px-4 shadow-md" style={{ width: `${cards.length * 28 + 128 + 32}px` }}>
          <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Anterior" className="w-16 h-12 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `oklch(0.2864 0.0496 218.94 / ${active === 0 ? 0.2 : active / (cards.length - 1)})` }}>
            <Arrow />
          </button>
          <div className="flex gap-3" aria-hidden="true">
            {cards.map((_, i) => (
              <span key={i} className={`block h-3 w-3 rounded-full transition-colors duration-300 ${i === active ? 'bg-secondary' : 'bg-secondary/20'}`} />
            ))}
          </div>
          <button onClick={() => goTo(active + 1)} disabled={active === cards.length - 1} aria-label="Siguiente" className="w-16 h-12 rounded-full flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: `oklch(0.2864 0.0496 218.94 / ${active === cards.length - 1 ? 0.2 : 1 - active / (cards.length - 1)})` }}>
            <Arrow className="rotate-180" />
          </button>
        </div>
      </div>
    </section>
  )
}