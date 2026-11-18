import { ArrowDownRight } from 'lucide-react';
import { PIZZERIA_CONFIG } from '../config/pizzeria';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onViewMenu: () => void;
  onStartOrder: () => void;
}

export function Hero({ onViewMenu, onStartOrder }: HeroProps) {
  const { hero } = PIZZERIA_CONFIG;

  return (
    <section id="inicio" className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#4A5D3F] mb-4">
              {hero.kicker}
            </p>

            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.06] font-semibold tracking-tight text-[#1E1B18] [text-wrap:balance] mb-5">
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#5A534A] leading-relaxed max-w-[52ch] mb-8">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onViewMenu}
                className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C83E2B] cursor-pointer"
              >
                Ver cardápio
              </button>

              <button
                type="button"
                onClick={onStartOrder}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 text-sm sm:text-base font-semibold text-[#1E1B18] bg-[#F2ECE1] hover:bg-[#E5DDD0] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E1B18] cursor-pointer"
              >
                <span>Montar pedido</span>
                <ArrowDownRight className="w-4 h-4 text-[#C83E2B]" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1E1B18]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#5A534A]">
              <span>Entrega em {PIZZERIA_CONFIG.delivery.estimatedMinutes}</span>
              <span aria-hidden="true">·</span>
              <span>Retirada em {PIZZERIA_CONFIG.delivery.pickupEstimatedMinutes}</span>
              <span aria-hidden="true">·</span>
              <span>{PIZZERIA_CONFIG.brand.neighborhoodLabel}</span>
            </div>
          </div>

          {/* Culinary Visual Column */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[480px] rounded-2xl overflow-hidden bg-[#1E1B18] border border-[#1E1B18]/10">
              <SafeImage
                src={hero.image}
                alt={hero.imageAlt}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1E1B18]/65 via-[#1E1B18]/20 to-transparent pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-xs sm:text-sm text-[#FFFDF9]/95">
                <span className="font-medium">Forno aquecido a alta temperatura</span>
                <span className="text-[#FFFDF9]/80 tabular-nums">Terça a Domingo · 18h30+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
