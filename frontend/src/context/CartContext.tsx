import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Book } from '../types/Book';
import type { CartItem } from '../types/CartItem';

// Shape of everything the cart context exposes
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  cartTotal: number; // sum of (price * quantity) for all items
  cartCount: number; // total number of individual items
}

// Create the context (undefined until a provider wraps the tree)
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider keeps cart state for the entire session.
// Wrap your app in this so every component can reach the cart.
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add a book: increment quantity if already present, otherwise add new entry
  function addToCart(book: Book) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.bookId === book.bookId);
      if (existing) {
        return prev.map((item) =>
          item.book.bookId === book.bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, quantity: 1 }];
    });
  }

  // Remove a book from the cart entirely
  function removeFromCart(bookId: number) {
    setCartItems((prev) => prev.filter((item) => item.book.bookId !== bookId));
  }

  // Change the quantity of a specific item; removes it if quantity drops to 0
  function updateQuantity(bookId: number, quantity: number) {
    if (quantity < 1) {
      removeFromCart(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.book.bookId === bookId ? { ...item, quantity } : item
      )
    );
  }

  // Derived totals recalculated whenever cartItems changes
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Convenience hook — throws if used outside a CartProvider
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
