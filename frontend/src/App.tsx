import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider, useCart } from './context/CartContext';
import BookList from './components/BookList';
import CartOffcanvas from './components/CartOffcanvas';

// Inner component so it can access the cart context for the badge count
function AppContent() {
  const { cartCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="container mt-4">
      {/* Header row: title on left, cart button on right */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="mb-0">Online Bookstore</h1>
        </div>
        <div className="col-auto">
          {/* Cart button — clicking it opens the Offcanvas cart panel.
              The Offcanvas is NEW BOOTSTRAP FEATURE #1 (see CartOffcanvas.tsx).
              The Toast notification on add is NEW BOOTSTRAP FEATURE #2 (see BookList.tsx). */}
          <button
            className="btn btn-outline-primary position-relative"
            onClick={() => setShowCart(true)}
          >
            Cart
            {/* Bootstrap Badge shows live item count on the button */}
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main book list */}
      <BookList />

      {/* Cart offcanvas panel — slides in from the right */}
      <CartOffcanvas show={showCart} onClose={() => setShowCart(false)} />
    </div>
  );
}

// Wrap everything in CartProvider so cart state is available app-wide.
// This is what makes the cart persist across the whole session.
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
