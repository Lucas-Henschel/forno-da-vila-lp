import {
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  Settings2,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PIZZERIA_CONFIG } from '../config/pizzeria';
import { CartItem, CheckoutFormData, PaymentMethodHint } from '../types/menu';
import { formatBRL, sanitizePhoneDigits } from '../utils/format';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  calculateOrderTotals,
} from '../utils/whatsapp';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onBrowseMenu: () => void;
}

const WHATSAPP_STORAGE_KEY = 'forno_da_vila_whatsapp_v1';

const INITIAL_FORM: CheckoutFormData = {
  customerName: '',
  customerPhone: '',
  fulfillment: 'entrega',
  streetAddress: '',
  neighborhood: '',
  complement: '',
  paymentMethod: 'Pix na entrega',
  orderNotes: '',
};

const PAYMENT_OPTIONS: PaymentMethodHint[] = [
  'Pix na entrega',
  'Cartão na maquininha',
  'Dinheiro',
];

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseMenu,
}: CartDrawerProps) {
  const [form, setForm] = useState<CheckoutFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [showSummaryPreview, setShowSummaryPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPhoneSettings, setShowPhoneSettings] = useState(false);
  const [customWhatsappNumber, setCustomWhatsappNumber] = useState<string>(() => {
    if (typeof window === 'undefined') return PIZZERIA_CONFIG.whatsapp.defaultNumber;
    try {
      return window.localStorage.getItem(WHATSAPP_STORAGE_KEY) ?? PIZZERIA_CONFIG.whatsapp.defaultNumber;
    } catch {
      return PIZZERIA_CONFIG.whatsapp.defaultNumber;
    }
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSaveCustomWhatsapp = (value: string) => {
    setCustomWhatsappNumber(value);
    try {
      window.localStorage.setItem(WHATSAPP_STORAGE_KEY, value);
    } catch {
      // Ignore storage errors
    }
  };

  const totals = useMemo(
    () => calculateOrderTotals(items, form.fulfillment),
    [items, form.fulfillment],
  );

  const generatedMessage = useMemo(
    () => buildWhatsAppOrderMessage(items, form, totals),
    [items, form, totals],
  );

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(customWhatsappNumber, generatedMessage),
    [customWhatsappNumber, generatedMessage],
  );

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (form.customerName.trim().length < 2) {
      nextErrors.customerName = 'Informe seu nome completo.';
    }

    const phoneDigits = sanitizePhoneDigits(form.customerPhone);
    if (phoneDigits.length < 10) {
      nextErrors.customerPhone = 'Informe um telefone com DDD (ex: 41 99999-0000).';
    }

    if (form.fulfillment === 'entrega') {
      if (form.streetAddress.trim().length < 5) {
        nextErrors.streetAddress = 'Informe a rua e o número para entrega.';
      }
      if (form.neighborhood.trim().length < 2) {
        nextErrors.neighborhood = 'Informe o bairro em Curitiba.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleGenerateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setShowSummaryPreview(false);
      return;
    }
    setShowSummaryPreview(true);
  };

  const handleCopyMessage = async () => {
    if (!validateForm()) return;
    setShowSummaryPreview(true);
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback copy if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = generatedMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1E1B18]/60 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-[#FFFDF9] text-[#1E1B18] flex flex-col border-l border-[#1E1B18]/15"
      >
        {/* Drawer Header */}
        <div className="px-5 sm:px-6 h-16 border-b border-[#1E1B18]/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C83E2B]" aria-hidden="true" />
            <h2 id="cart-drawer-title" className="font-display text-xl font-semibold">
              Seu pedido
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onClearCart();
                  setShowSummaryPreview(false);
                }}
                className="text-xs font-medium text-[#5A534A] hover:text-[#C83E2B] px-2.5 py-1.5 rounded-md cursor-pointer"
              >
                Limpar sacola
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar sacola"
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg hover:bg-[#F2ECE1] text-[#1E1B18] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-14 h-14 rounded-full bg-[#F2ECE1] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-[#5A534A]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#1E1B18] mb-2">
              Sua sacola está vazia
            </h3>
            <p className="text-sm text-[#5A534A] max-w-[32ch] mb-6">
              Adicione pizzas, entradas ou bebidas do cardápio para montar o resumo do seu pedido.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBrowseMenu();
              }}
              className="min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors cursor-pointer"
            >
              Explorar cardápio
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
            {/* Cart Line Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 pb-4 border-b border-[#1E1B18]/10"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F2ECE1] shrink-0">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#1E1B18] leading-snug">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        aria-label={`Remover ${item.name}`}
                        className="text-[#5A534A] hover:text-[#C83E2B] p-1 rounded cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    {item.sizeLabel && (
                      <p className="text-xs text-[#5A534A] mt-0.5">{item.sizeLabel}</p>
                    )}

                    {item.addons.length > 0 && (
                      <p className="text-xs text-[#4A5D3F] mt-1 leading-snug">
                        + {item.addons.map((a) => a.name).join(', ')}
                      </p>
                    )}

                    {item.notes && (
                      <p className="text-xs text-[#5A534A] italic mt-1">
                        Obs.: {item.notes}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center border border-[#1E1B18]/15 rounded-lg bg-[#FAF6F0]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          aria-label={`Diminuir quantidade de ${item.name}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#1E1B18] hover:bg-[#F2ECE1] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          aria-label={`Aumentar quantidade de ${item.name}`}
                          className="w-8 h-8 inline-flex items-center justify-center text-[#1E1B18] hover:bg-[#F2ECE1] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#1E1B18] tabular-nums">
                        {formatBRL(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="bg-[#FAF6F0] border border-[#1E1B18]/10 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#5A534A]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1E1B18]">
                  {formatBRL(totals.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#5A534A]">
                <span>
                  {form.fulfillment === 'entrega'
                    ? 'Taxa demonstrativa de entrega'
                    : 'Retirada no balcão'}
                </span>
                <span className="tabular-nums font-medium text-[#1E1B18]">
                  {form.fulfillment === 'entrega' ? formatBRL(totals.deliveryFee) : 'Grátis'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1E1B18]/10 flex items-center justify-between font-semibold text-base text-[#1E1B18]">
                <span>Total estimado</span>
                <span className="tabular-nums text-[#C83E2B]">{formatBRL(totals.total)}</span>
              </div>
            </div>

            {/* Checkout Form (No online payment) */}
            <form onSubmit={handleGenerateOrder} noValidate className="space-y-4">
              <div>
                <span className="block text-sm font-semibold text-[#1E1B18] mb-2">
                  Como você prefere receber?
                </span>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F2ECE1] rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, fulfillment: 'entrega' }));
                      setErrors((prev) => ({ ...prev, streetAddress: undefined, neighborhood: undefined }));
                    }}
                    className={`min-h-[40px] px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      form.fulfillment === 'entrega'
                        ? 'bg-[#FFFDF9] text-[#1E1B18] shadow-xs'
                        : 'text-[#5A534A] hover:text-[#1E1B18]'
                    }`}
                  >
                    Entrega ({formatBRL(PIZZERIA_CONFIG.delivery.fee)})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({ ...prev, fulfillment: 'retirada' }));
                      setErrors((prev) => ({ ...prev, streetAddress: undefined, neighborhood: undefined }));
                    }}
                    className={`min-h-[40px] px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                      form.fulfillment === 'retirada'
                        ? 'bg-[#FFFDF9] text-[#1E1B18] shadow-xs'
                        : 'text-[#5A534A] hover:text-[#1E1B18]'
                    }`}
                  >
                    Retirada (Grátis)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                    Nome completo *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, customerName: e.target.value }));
                      if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: undefined }));
                    }}
                    placeholder="Seu nome"
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-[#C83E2B]">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={form.customerPhone}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, customerPhone: e.target.value }));
                      if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: undefined }));
                    }}
                    placeholder="(41) 99999-0000"
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                  />
                  {errors.customerPhone && (
                    <p className="mt-1 text-xs text-[#C83E2B]">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              {form.fulfillment === 'entrega' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                      Rua e número *
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      value={form.streetAddress}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, streetAddress: e.target.value }));
                        if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: undefined }));
                      }}
                      placeholder="Ex: Rua das Flores, 240"
                      className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                    />
                    {errors.streetAddress && (
                      <p className="mt-1 text-xs text-[#C83E2B]">{errors.streetAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="checkout-neighborhood" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                        Bairro *
                      </label>
                      <input
                        id="checkout-neighborhood"
                        type="text"
                        required
                        value={form.neighborhood}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, neighborhood: e.target.value }));
                          if (errors.neighborhood) setErrors((prev) => ({ ...prev, neighborhood: undefined }));
                        }}
                        placeholder="Ex: Batel"
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                      />
                      {errors.neighborhood && (
                        <p className="mt-1 text-xs text-[#C83E2B]">{errors.neighborhood}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="checkout-complement" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                        Complemento (opcional)
                      </label>
                      <input
                        id="checkout-complement"
                        type="text"
                        value={form.complement}
                        onChange={(e) => setForm((prev) => ({ ...prev, complement: e.target.value }))}
                        placeholder="Apto, bloco ou referência"
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="checkout-payment" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                    Pagamento na {form.fulfillment === 'entrega' ? 'entrega' : 'retirada'}
                  </label>
                  <select
                    id="checkout-payment"
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        paymentMethod: e.target.value as PaymentMethodHint,
                      }))
                    }
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                  >
                    {PAYMENT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="checkout-notes" className="block text-xs font-semibold text-[#1E1B18] mb-1">
                    Observações gerais (opcional)
                  </label>
                  <input
                    id="checkout-notes"
                    type="text"
                    value={form.orderNotes}
                    onChange={(e) => setForm((prev) => ({ ...prev, orderNotes: e.target.value }))}
                    placeholder="Troco, campainha..."
                    className="w-full min-h-[42px] px-3 py-2 text-sm bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40 focus:border-[#C83E2B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-[46px] px-5 py-3 text-sm font-semibold text-white bg-[#C83E2B] hover:bg-[#A93120] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C83E2B]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Preparar pedido para WhatsApp</span>
              </button>
            </form>

            {/* WhatsApp Preview & Configurable Destination */}
            {showSummaryPreview && (
              <div
                aria-live="polite"
                className="bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-xl p-4 space-y-3.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#1E1B18]">
                    Prévia da mensagem do pedido
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowPhoneSettings((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A534A] hover:text-[#1E1B18] cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Configurar WhatsApp</span>
                  </button>
                </div>

                {showPhoneSettings && (
                  <div className="p-3 bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-lg space-y-2">
                    <label
                      htmlFor="config-whatsapp-number"
                      className="block text-xs font-semibold text-[#1E1B18]"
                    >
                      Número da pizzaria para teste (DDI + DDD + Número)
                    </label>
                    <input
                      id="config-whatsapp-number"
                      type="tel"
                      value={customWhatsappNumber}
                      onChange={(e) => handleSaveCustomWhatsapp(e.target.value)}
                      placeholder="Ex: 5541999990000 (deixe vazio na demo)"
                      className="w-full min-h-[38px] px-3 py-1.5 text-xs bg-[#FAF6F0] border border-[#1E1B18]/15 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C83E2B]/40"
                    />
                    <p className="text-[11px] text-[#5A534A]">
                      Sem número configurado, o visitante pode visualizar e copiar a mensagem organizada.
                    </p>
                  </div>
                )}

                <pre className="whitespace-pre-wrap font-sans text-xs text-[#1E1B18] bg-[#FFFDF9] border border-[#1E1B18]/10 rounded-lg p-3.5 leading-relaxed max-h-60 overflow-y-auto">
                  {generatedMessage}
                </pre>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-[#4A5D3F] hover:bg-[#3B4B32] rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span>Abrir no WhatsApp</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="flex-1 px-3.5 py-2.5 text-xs text-[#5A534A] bg-[#F2ECE1] rounded-lg leading-snug">
                      Número do WhatsApp da pizzaria ainda não definido nesta demonstração. Copie o texto ao lado ou informe um número em “Configurar WhatsApp”.
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[#1E1B18] bg-[#F2ECE1] hover:bg-[#E5DDD0] rounded-lg transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#4A5D3F]" aria-hidden="true" />
                        <span>Mensagem copiada</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar mensagem</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-[#5A534A] leading-relaxed">
                  Importante: abrir o WhatsApp ou copiar a mensagem apenas prepara o resumo. O pedido só é confirmado após a resposta de confirmação da pizzaria.
                </p>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
