import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { PIZZERIA_CONFIG } from '../config/pizzeria';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOrderNow: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export function Header({ cartCount, onOpenCart, onOrderNow }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#1E1B18]/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#inicio"
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#1E1B18] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] rounded-sm"
        >
          {PIZZERIA_CONFIG.brand.name}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A534A]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#1E1B18] hover:underline underline-offset-4 decoration-[#C83E2B]/70 transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart & Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir sacola de pedidos (${cartCount} ${cartCount === 1 ? 'item' : 'itens'})`}
            className="inline-flex items-center justify-center gap-2 min-h-[42px] px-3 sm:px-3.5 py-2 text-sm font-medium text-[#1E1B18] bg-[#F2ECE1] hover:bg-[#E5DDD0] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#C83E2B]" aria-hidden="true" />
            <span className="hidden sm:inline">Sacola</span>
            <span className="tabular-nums font-semibold text-xs px-1.5 py-0.5 rounded bg-[#FFFDF9] text-[#1E1B18]">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onOrderNow}
            className="hidden sm:inline-flex items-center justify-center min-h-[42px] px-4 py-2 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C83E2B] cursor-pointer"
          >
            Peça agora
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#1E1B18] hover:bg-[#F2ECE1] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegação mobile"
          className="md:hidden border-t border-[#1E1B18]/10 bg-[#FFFDF9] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#1E1B18] hover:bg-[#F2ECE1] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOrderNow();
              }}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors cursor-pointer"
            >
              Peça agora
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
