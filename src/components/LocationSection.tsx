import { Clock, MapPin, Phone, Truck } from 'lucide-react';
import { PIZZERIA_CONFIG } from '../config/pizzeria';
import { formatBRL } from '../utils/format';

interface LocationSectionProps {
  onOpenCart: () => void;
}

export function LocationSection({ onOpenCart }: LocationSectionProps) {
  const { contact, delivery } = PIZZERIA_CONFIG;

  return (
    <section
      id="contato"
      className="py-14 sm:py-20 bg-[#F2ECE1]/70 border-t border-[#1E1B18]/10"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-xs sm:text-sm font-medium text-[#4A5D3F] mb-2">
            Atendimento e região
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18] [text-wrap:balance]">
            Retirada no balcão ou entrega em Curitiba
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Address & Contact */}
          <div className="bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#C83E2B]">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold text-[#1E1B18]">
                Endereço ilustrativo
              </h3>
            </div>
            <p className="text-sm text-[#1E1B18] font-medium leading-relaxed">
              {contact.address}
            </p>
            <p className="text-xs text-[#5A534A]">{contact.addressNote}</p>

            <div className="pt-3 border-t border-[#1E1B18]/10 space-y-1.5 text-sm text-[#5A534A]">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5A534A]" aria-hidden="true" />
                <span>{contact.phoneDisplay}</span>
              </p>
              <p className="text-xs">{contact.instagramHandle} · {contact.emailDisplay}</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-[#C83E2B]">
              <Clock className="w-5 h-5" aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold text-[#1E1B18]">
                Horários de forno
              </h3>
            </div>
            <dl className="space-y-2.5 text-sm">
              {contact.hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex items-baseline justify-between gap-4 border-b border-[#1E1B18]/6 pb-2 last:border-b-0 last:pb-0"
                >
                  <dt className="text-[#5A534A]">{entry.days}</dt>
                  <dd className="font-medium text-[#1E1B18] tabular-nums text-right">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Delivery & Pickup Info */}
          <div className="bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-xl p-6 flex flex-col justify-between space-y-5 md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-[#C83E2B]">
                <Truck className="w-5 h-5" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-[#1E1B18]">
                  Entrega e retirada
                </h3>
              </div>
              <div className="space-y-2 text-sm text-[#5A534A] leading-relaxed">
                <p>
                  <strong className="font-semibold text-[#1E1B18]">Delivery:</strong> taxa demonstrativa fixa de{' '}
                  <span className="tabular-nums font-medium text-[#1E1B18]">
                    {formatBRL(delivery.fee)}
                  </span>{' '}
                  com previsão de {delivery.estimatedMinutes}.
                </p>
                <p>
                  <strong className="font-semibold text-[#1E1B18]">Retirada no balcão:</strong> sem taxa, pronta em{' '}
                  {delivery.pickupEstimatedMinutes}.
                </p>
                <p className="text-xs pt-1">{delivery.coverageNote}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[#1E1B18] bg-[#F2ECE1] hover:bg-[#E5DDD0] rounded-lg transition-colors cursor-pointer"
            >
              Revisar meu pedido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
