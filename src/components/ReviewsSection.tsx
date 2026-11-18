import { PIZZERIA_CONFIG } from '../config/pizzeria';

export function ReviewsSection() {
  const { reviews } = PIZZERIA_CONFIG;

  return (
    <section aria-labelledby="reviews-heading" className="py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#4A5D3F] mb-2">
              {reviews.kicker}
            </p>
            <h2
              id="reviews-heading"
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18] [text-wrap:balance]"
            >
              {reviews.title}
            </h2>
          </div>

          <p className="text-xs text-[#5A534A] max-w-[38ch]">
            {reviews.disclaimer}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.items.map((review) => (
            <blockquote
              key={review.id}
              className="flex flex-col justify-between bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-xl p-6"
            >
              <p className="text-sm sm:text-base text-[#1E1B18] leading-relaxed mb-6">
                “{review.quote}”
              </p>

              <footer className="pt-4 border-t border-[#1E1B18]/10 text-xs">
                <p className="font-semibold text-[#1E1B18]">{review.author}</p>
                <p className="text-[#5A534A] mt-0.5">
                  {review.neighborhood} · {review.orderNote}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
