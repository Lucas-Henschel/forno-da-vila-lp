import { PIZZERIA_CONFIG } from '../config/pizzeria';
import { CartItem, CheckoutFormData } from '../types/menu';
import { formatBRL, sanitizePhoneDigits } from './format';

export interface OrderSummaryCalculation {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function calculateOrderTotals(
  items: CartItem[],
  fulfillment: CheckoutFormData['fulfillment'],
): OrderSummaryCalculation {
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = items.length > 0 && fulfillment === 'entrega' ? PIZZERIA_CONFIG.delivery.fee : 0;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  form: CheckoutFormData,
  totals: OrderSummaryCalculation,
): string {
  const lines: string[] = [];

  lines.push(`*Novo Pedido — ${PIZZERIA_CONFIG.brand.name}*`);
  lines.push(
    `Modalidade: ${form.fulfillment === 'entrega' ? 'Entrega (Delivery)' : 'Retirada no balcão'}`,
  );
  lines.push('');
  lines.push('*Itens do pedido:*');

  items.forEach((item, index) => {
    const sizeText = item.sizeLabel ? ` (${item.sizeLabel})` : '';
    lines.push(
      `${index + 1}. ${item.quantity}x ${item.name}${sizeText} — ${formatBRL(item.unitPrice * item.quantity)}`,
    );
    if (item.addons.length > 0) {
      lines.push(`   Adicionais: ${item.addons.map((a) => a.name).join(', ')}`);
    }
    if (item.notes.trim()) {
      lines.push(`   Obs.: ${item.notes.trim()}`);
    }
  });

  lines.push('');
  lines.push(`Subtotal: ${formatBRL(totals.subtotal)}`);
  if (form.fulfillment === 'entrega') {
    lines.push(`Taxa de entrega estimada: ${formatBRL(totals.deliveryFee)}`);
  } else {
    lines.push('Taxa de retirada: Grátis');
  }
  lines.push(`*Total estimado: ${formatBRL(totals.total)}*`);
  lines.push('');
  lines.push('*Dados para atendimento:*');
  lines.push(`Nome: ${form.customerName.trim() || 'Não informado'}`);
  lines.push(`Telefone: ${form.customerPhone.trim() || 'Não informado'}`);

  if (form.fulfillment === 'entrega') {
    const addressParts = [
      form.streetAddress.trim(),
      form.neighborhood.trim(),
      form.complement.trim(),
    ].filter(Boolean);
    lines.push(`Endereço: ${addressParts.join(' · ') || 'Não informado'}`);
  }

  lines.push(`Pagamento na ${form.fulfillment === 'entrega' ? 'entrega' : 'retirada'}: ${form.paymentMethod}`);

  if (form.orderNotes.trim()) {
    lines.push(`Observações gerais: ${form.orderNotes.trim()}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string | null {
  const cleaned = sanitizePhoneDigits(phoneNumber);
  if (cleaned.length < 10) {
    return null;
  }
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
