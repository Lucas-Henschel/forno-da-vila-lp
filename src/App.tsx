import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CartDrawer } from './components/CartDrawer';
import { FeaturesStrip } from './components/FeaturesStrip';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LocationSection } from './components/LocationSection';
import { MenuSection } from './components/MenuSection';
import { PizzaCustomizerModal } from './components/PizzaCustomizerModal';
import { ReviewsSection } from './components/ReviewsSection';
import { useCart } from './hooks/useCart';
import { MenuItem } from './types/menu';
import { formatBRL } from './utils/format';

export default function App() {
  const { items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearCart } =
    useCart();

  const [customizingPizza, setCustomizingPizza] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const scrollToMenu = () => {
    const el = document.getElementById('cardapio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderNow = () => {
    if (totalItems > 0) {
      setCartOpen(true);
    } else {
      scrollToMenu();
    }
  };

  const handleQuickAddItem = (item: MenuItem) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      isPizza: false,
      image: item.image,
      addons: [],
      notes: '',
      unitPrice: item.basePrice,
      quantity: 1,
    });
    setRecentlyAddedId(item.id);
    setToastMessage(`${item.name} adicionado à sacola.`);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === item.id ? null : current));
    }, 1400);
  };

  const handleAddCustomizedPizza = (payload: Parameters<typeof addItem>[0]) => {
    addItem(payload);
    setToastMessage(`${payload.name} (${payload.sizeLabel}) adicionada à sacola.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#1E1B18]">
      <Header
        cartCount={totalItems}
        onOpenCart={() => setCartOpen(true)}
        onOrderNow={handleOrderNow}
      />

      <main className="flex-1">
        <Hero onViewMenu={scrollToMenu} onStartOrder={handleOrderNow} />
        <FeaturesStrip />
        <MenuSection
          onSelectPizza={(item) => setCustomizingPizza(item)}
          onQuickAddItem={handleQuickAddItem}
          recentlyAddedId={recentlyAddedId}
        />
        <AboutSection />
        <ReviewsSection />
        <LocationSection onOpenCart={() => setCartOpen(true)} />
      </main>

      <Footer />

      {/* Mobile Bottom Cart Bar (visible only when items > 0, compact <= 56px) */}
      {totalItems > 0 && !cartOpen && !customizingPizza && (
        <div className="sm:hidden fixed bottom-3 inset-x-4 z-30">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="w-full h-12 px-4 bg-[#1E1B18] text-[#FFFDF9] rounded-xl shadow-lg flex items-center justify-between gap-3 text-sm font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83E2B]"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#C83E2B]" aria-hidden="true" />
              <span>
                Ver pedido ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
              </span>
            </span>
            <span className="tabular-nums">{formatBRL(subtotal)}</span>
          </button>
        </div>
      )}

      {/* Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 max-w-sm bg-[#1E1B18] text-[#FFFDF9] px-4 py-3 rounded-xl shadow-lg border border-[#FFFDF9]/10 flex items-center gap-2.5 text-sm"
        >
          <CheckCircle2 className="w-4 h-4 text-[#8FB378] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PizzaCustomizerModal
        item={customizingPizza}
        onClose={() => setCustomizingPizza(null)}
        onAddToCart={handleAddCustomizedPizza}
      />

      <CartDrawer
        isOpen={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onBrowseMenu={scrollToMenu}
      />
    </div>
  );
}
