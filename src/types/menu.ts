export type MenuCategoryId =
  | 'todas'
  | 'classicas'
  | 'especiais'
  | 'vegetarianas'
  | 'acompanhamentos'
  | 'bebidas'
  | 'sobremesas';

export type PizzaSizeId = 'individual' | 'media' | 'grande';

export interface PizzaSizeOption {
  id: PizzaSizeId;
  label: string;
  diameter: string;
  slices: number;
  priceDelta: number;
}

export interface PizzaAddonOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: Exclude<MenuCategoryId, 'todas'>;
  categoryLabel: string;
  basePrice: number;
  isPizza: boolean;
  isVegetarian?: boolean;
  highlightTag?: string;
  image: string;
  imageAlt: string;
  imageFocus?: string;
  allowAddons?: boolean;
}

export interface CartItem {
  cartItemId: string;
  menuItemId: string;
  name: string;
  isPizza: boolean;
  image: string;
  sizeId?: PizzaSizeId;
  sizeLabel?: string;
  addons: PizzaAddonOption[];
  notes: string;
  unitPrice: number;
  quantity: number;
}

export type FulfillmentMethod = 'entrega' | 'retirada';

export type PaymentMethodHint = 'Pix na entrega' | 'Cartão na maquininha' | 'Dinheiro';

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  fulfillment: FulfillmentMethod;
  streetAddress: string;
  neighborhood: string;
  complement: string;
  paymentMethod: PaymentMethodHint;
  orderNotes: string;
}
