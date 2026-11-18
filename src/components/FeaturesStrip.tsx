import { PIZZERIA_CONFIG } from '../config/pizzeria';

export function FeaturesStrip() {
  return (
    <section
      aria-label="Diferenciais do preparo"
      className="border-y border-[#1E1B18]/10 bg-[#FFFDF9] py-10 sm:py-12"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PIZZERIA_CONFIG.highlights.map((item) => (
            <div key={item.index} className="space-y-2.5">
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold tabular-nums text-[#C83E2B]">
                  {item.index}.
                </span>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-[#1E1B18]">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm text-[#5A534A] leading-relaxed pl-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
