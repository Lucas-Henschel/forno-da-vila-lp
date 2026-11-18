import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PIZZA_ADDONS, PIZZA_SIZES } from '../config/pizzeria';
import { MenuItem, PizzaAddonOption, PizzaSizeId } from '../types/menu';
import { formatBRL } from '../utils/format';
import { SafeImage } from './SafeImage';

interface PizzaCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (payload: {
    menuItemId: string;
    name: string;
    isPizza: boolean;
    image: string;
    sizeId: PizzaSizeId;
    sizeLabel: string;
    addons: PizzaAddonOption[];
    notes: string;
    unitPrice: number;
    quantity: number;
  }) => void;
}

export function PizzaCustomizerModal({
  item,
  onClose,
  onAddToCart,
}: PizzaCustomizerModalProps) {
  const [selectedSize, setSelectedSize] = useState<PizzaSizeId>('media');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
      setSelectedSize('media');
      setSelectedAddonIds([]);
      setNotes('');
      setQuantity(1);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const sizeObj = PIZZA_SIZES.find((s) => s.id === selectedSize) ?? PIZZA_SIZES[1];
  const chosenAddons = PIZZA_ADDONS.filter((addon) => selectedAddonIds.includes(addon.id));
  const addonsTotal = chosenAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = item.basePrice + sizeObj.priceDelta + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId],
    );
  };

  const handleConfirm = () => {
    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      isPizza: item.isPizza,
      image: item.image,
      sizeId: sizeObj.id,
      sizeLabel: `${sizeObj.label} · ${sizeObj.diameter}`,
      addons: chosenAddons,
      notes: notes.trim(),
      unitPrice,
      quantity,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1E1B18]/60 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-xl max-h-[92vh] bg-[#FFFDF9] text-[#1E1B18] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col border border-[#1E1B18]/15"
      >
        {/* Top Media Header */}
        <div className="relative h-44 sm:h-52 w-full bg-[#F2ECE1] shrink-0">
          <SafeImage
            src={item.image}
            alt={item.imageAlt}
            className={`w-full h-full object-cover ${item.imageFocus ?? 'object-center'}`}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar personalização"
            className="absolute top-3 right-3 w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#FFFDF9]/95 text-[#1E1B18] hover:bg-[#FFFDF9] border border-[#1E1B18]/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div>
            <p className="text-xs text-[#5A534A] mb-1">
              {item.categoryLabel}
              {item.isVegetarian ? ' · Vegetariana' : ''}
            </p>
            <h2
              id="customizer-title"
              className="font-display text-2xl font-semibold text-[#1E1B18] mb-2"
            >
              {item.name}
            </h2>
            <p className="text-sm text-[#5A534A] leading-relaxed">{item.description}</p>
          </div>

          {/* Size Selection */}
          <fieldset>
            <legend className="text-sm font-semibold text-[#1E1B18] mb-3">
              1. Escolha o tamanho
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PIZZA_SIZES.map((size) => {
                const sizePrice = item.basePrice + size.priceDelta;
                const active = selectedSize === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size.id)}
                    aria-pressed={active}
                    className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B] ${
                      active
                        ? 'bg-[#C83E2B]/8 border-[#C83E2B] text-[#1E1B18]'
                        : 'bg-[#FAF6F0] border-[#1E1B18]/12 hover:border-[#1E1B18]/30 text-[#1E1B18]'
                    }`}
                  >
                    <div className="flex items-center justify-between sm:block">
                      <span className="block text-sm font-semibold">{size.label}</span>
                      <span className="text-xs text-[#5A534A]">
                        {size.diameter} · {size.slices} fatias
                      </span>
                    </div>
                    <span className="mt-1.5 block text-sm font-semibold text-[#C83E2B] tabular-nums">
                      {formatBRL(sizePrice)}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Optional Add-ons */}
          {item.allowAddons && (
            <fieldset>
              <legend className="text-sm font-semibold text-[#1E1B18] mb-1">
                2. Adicionais opcionais
              </legend>
              <p className="text-xs text-[#5A534A] mb-3">
                Personalize sua pizza com ingredientes extras ou borda recheada.
              </p>
              <div className="divide-y divide-[#1E1B18]/10 border border-[#1E1B18]/12 rounded-xl bg-[#FAF6F0]">
                {PIZZA_ADDONS.map((addon) => {
                  const checked = selectedAddonIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer hover:bg-[#F2ECE1]/60 transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm text-[#1E1B18]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-4 h-4 accent-[#C83E2B] rounded cursor-pointer"
                        />
                        <span>{addon.name}</span>
                      </span>
                      <span className="text-sm font-medium text-[#5A534A] tabular-nums shrink-0">
                        + {formatBRL(addon.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* Kitchen Notes */}
          <div>
            <label
              htmlFor="pizza-notes"
              className="block text-sm font-semibold text-[#1E1B18] mb-1.5"
            >
              3. Observações (opcional)
            </label>
            <input
              id="pizza-notes"
              type="text"
              maxLength={120}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: retirar cebola, massa bem assada, cortar em 8..."
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FAF6F0] text-[#1E1B18] placeholder:text-[#5A534A]/70 border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
            />
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="border-t border-[#1E1B18]/10 bg-[#FFFDF9] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="inline-flex items-center border border-[#1E1B18]/15 rounded-lg bg-[#FAF6F0]">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Diminuir quantidade"
              className="w-10 h-11 inline-flex items-center justify-center text-[#1E1B18] hover:bg-[#F2ECE1] rounded-l-lg cursor-pointer"
            >
              <Minus className="w-4 h-4" aria-hidden="true" />
            </button>
            <span className="w-9 text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              aria-label="Aumentar quantidade"
              className="w-10 h-11 inline-flex items-center justify-center text-[#1E1B18] hover:bg-[#F2ECE1] rounded-r-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 min-h-[46px] px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C83E2B]"
          >
            <span>Adicionar à sacola</span>
            <span className="tabular-nums">{formatBRL(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
