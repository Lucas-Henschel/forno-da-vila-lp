import { useCallback, useEffect, useState } from 'react';
import { CartItem, PizzaAddonOption, PizzaSizeId } from '../types/menu';

const CART_STORAGE_KEY = 'forno_da_vila_cart_v1';

export function buildCartItemKey(
  menuItemId: string,
  sizeId?: PizzaSizeId,
  addons: PizzaAddonOption[] = [],
  notes = '',
): string {
  const addonKey = [...addons]
    .map((a) => a.id)
    .sort()
    .join(',');
  const normalizedNotes = notes.trim().toLowerCase();
  return `${menuItemId}__${sizeId ?? 'padrao'}__${addonKey}__${normalizedNotes}`;
}

function readInitialCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = buildCartItemKey(
      newItem.menuItemId,
      newItem.sizeId,
      newItem.addons,
      newItem.notes,
    );

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }
      return [...prev, { ...newItem, cartItemId }];
    });
  }, []);

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  return {
    items,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
