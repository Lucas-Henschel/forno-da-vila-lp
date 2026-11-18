import { Check, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS, PIZZA_SIZES } from '../config/pizzeria';
import { MenuCategoryId, MenuItem } from '../types/menu';
import { formatBRL } from '../utils/format';
import { SafeImage } from './SafeImage';

interface MenuSectionProps {
  onSelectPizza: (item: MenuItem) => void;
  onQuickAddItem: (item: MenuItem) => void;
  recentlyAddedId: string | null;
}

export function MenuSection({
  onSelectPizza,
  onQuickAddItem,
  recentlyAddedId,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);

  const individualDelta = PIZZA_SIZES.find((s) => s.id === 'individual')?.priceDelta ?? -14;

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'todas' && item.category !== selectedCategory) {
        return false;
      }
      if (onlyVegetarian && !item.isVegetarian) {
        return false;
      }
      if (!query) return true;
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query)
      );
    });
  }, [selectedCategory, searchQuery, onlyVegetarian]);

  const hasActiveFilters =
    selectedCategory !== 'todas' || searchQuery.trim().length > 0 || onlyVegetarian;

  const resetFilters = () => {
    setSelectedCategory('todas');
    setSearchQuery('');
    setOnlyVegetarian(false);
  };

  return (
    <section id="cardapio" className="py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#4A5D3F] mb-2">
              Cardápio artesanal
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18] [text-wrap:balance]">
              Sabores assados na hora para a sua mesa
            </h2>
          </div>

          <p className="text-sm text-[#5A534A] max-w-[38ch]">
            Escolha entre individuais (25 cm), médias (30 cm) ou grandes (35 cm) e personalize adicionais antes de enviar.
          </p>
        </div>

        {/* Search & Vegetarian Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#5A534A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="menu-search" className="sr-only">
              Pesquisar pizzas, ingredientes ou bebidas
            </label>
            <input
              id="menu-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por sabor ou ingrediente (ex: burrata, cogumelos, calabresa)..."
              className="w-full min-h-[44px] pl-10 pr-10 py-2.5 text-sm bg-[#FFFDF9] text-[#1E1B18] placeholder:text-[#5A534A]/70 border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center text-[#5A534A] hover:text-[#1E1B18] rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOnlyVegetarian((prev) => !prev)}
            aria-pressed={onlyVegetarian}
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5D3F] ${
              onlyVegetarian
                ? 'bg-[#4A5D3F] text-white border-[#4A5D3F]'
                : 'bg-[#FFFDF9] text-[#1E1B18] border-[#1E1B18]/15 hover:bg-[#F2ECE1]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            <span>Apenas vegetarianos</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-[#1E1B18]/10"
        >
          {MENU_CATEGORIES.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSelectedCategory(category.id)}
                className={`min-h-[40px] px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] ${
                  active
                    ? 'bg-[#1E1B18] text-[#FFFDF9]'
                    : 'text-[#5A534A] hover:text-[#1E1B18] hover:bg-[#F2ECE1]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between gap-4 mb-6 text-xs sm:text-sm text-[#5A534A]">
          <span className="tabular-nums">
            Exibindo {filteredItems.length}{' '}
            {filteredItems.length === 1 ? 'opção' : 'opções'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="font-medium text-[#C83E2B] hover:underline underline-offset-4 cursor-pointer"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Menu Grid or Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-2xl p-10 sm:p-14 text-center max-w-xl mx-auto">
            <p className="font-display text-2xl font-semibold text-[#1E1B18] mb-2">
              Nenhum item encontrado
            </p>
            <p className="text-sm text-[#5A534A] mb-6">
              Não encontramos opções com os filtros atuais. Limpe a busca ou explore todas as categorias do nosso forno.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors cursor-pointer"
            >
              Mostrar todo o cardápio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const startingPrice = item.isPizza
                ? item.basePrice + individualDelta
                : item.basePrice;
              const isJustAdded = recentlyAddedId === item.id;

              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-xl overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {/* Photo Lead */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1]">
                    <SafeImage
                      src={item.image}
                      alt={item.imageAlt}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${item.imageFocus ?? 'object-center'}`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col p-5 sm:p-6">
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#5A534A] mb-2">
                      <span>{item.categoryLabel}</span>
                      {item.isVegetarian && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#4A5D3F] font-medium">Vegetariana</span>
                        </>
                      )}
                      {item.highlightTag && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#C83E2B] font-medium">{item.highlightTag}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#1E1B18] leading-snug mb-2">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#5A534A] leading-relaxed flex-1 mb-5">
                      {item.description}
                    </p>

                    {/* Pricing & CTA Footer */}
                    <div className="pt-4 border-t border-[#1E1B18]/10 flex items-center justify-between gap-4">
                      <div>
                        {item.isPizza ? (
                          <div className="space-y-0.5">
                            <span className="block text-[11px] text-[#5A534A]">
                              A partir de {formatBRL(startingPrice)}
                            </span>
                            <span className="block text-base font-semibold text-[#1E1B18] tabular-nums">
                              Média {formatBRL(item.basePrice)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-base font-semibold text-[#1E1B18] tabular-nums">
                            {formatBRL(item.basePrice)}
                          </span>
                        )}
                      </div>

                      {item.isPizza ? (
                        <button
                          type="button"
                          onClick={() => onSelectPizza(item)}
                          className="inline-flex items-center justify-center min-h-[42px] px-4 py-2 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C83E2B]"
                        >
                          Personalizar
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onQuickAddItem(item)}
                          className={`inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            isJustAdded
                              ? 'bg-[#4A5D3F] text-white focus-visible:ring-[#4A5D3F]'
                              : 'bg-[#F2ECE1] hover:bg-[#1E1B18] text-[#1E1B18] hover:text-[#FFFDF9] focus-visible:ring-[#1E1B18]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" aria-hidden="true" />
                              <span>Adicionado</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" aria-hidden="true" />
                              <span>Adicionar</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
