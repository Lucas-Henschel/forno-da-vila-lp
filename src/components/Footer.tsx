import { PIZZERIA_CONFIG } from '../config/pizzeria';

export function Footer() {
  const { brand, contact } = PIZZERIA_CONFIG;

  return (
    <footer className="bg-[#1E1B18] text-[#FAF6F0] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#FAF6F0]/12">
          <div className="md:col-span-5 space-y-2.5">
            <p className="font-display text-2xl font-semibold tracking-tight text-[#FFFDF9]">
              {brand.name}
            </p>
            <p className="text-sm text-[#FAF6F0]/75 max-w-[36ch] leading-relaxed">
              {brand.tagline} em {brand.city}. Cardápio interativo com personalização de sabores e envio organizado para WhatsApp.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF6F0]/60">
              Navegação
            </p>
            <ul className="space-y-2 text-sm text-[#FAF6F0]/85">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Contato e horários
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm text-[#FAF6F0]/80">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FAF6F0]/60">
              Contatos ilustrativos
            </p>
            <p>{contact.address}</p>
            <p>{contact.phoneDisplay}</p>
            <p>{contact.emailDisplay}</p>
            <p>{contact.instagramHandle}</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#FAF6F0]/60">
          <p>{brand.demoAttribution}</p>
          <p className="max-w-[65ch]">{brand.demoFullNotice}</p>
        </div>
      </div>
    </footer>
  );
}
