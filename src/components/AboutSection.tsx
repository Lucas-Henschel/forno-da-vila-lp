import { PIZZERIA_CONFIG } from '../config/pizzeria';
import { SafeImage } from './SafeImage';

export function AboutSection() {
  const { about } = PIZZERIA_CONFIG;

  return (
    <section id="sobre" className="py-14 sm:py-20 bg-[#FFFDF9] border-y border-[#1E1B18]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#1E1B18]/10">
              <SafeImage
                src={about.image}
                alt={about.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center py-2">
            <p className="text-xs sm:text-sm font-medium text-[#4A5D3F] mb-2">
              {about.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18] [text-wrap:balance] mb-5">
              {about.title}
            </h2>

            <div className="space-y-4 text-base text-[#5A534A] leading-relaxed max-w-[54ch]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 pt-5 border-t border-[#1E1B18]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A534A]">
              <span>Farinha italiana tipo 00 · Descanso frio de 48h</span>
              <span className="italic">{about.demoCaption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
