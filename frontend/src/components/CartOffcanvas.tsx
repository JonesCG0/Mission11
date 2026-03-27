import { useCart } from '../context/CartContext';

interface Props {
  show: boolean;
  onClose: () => void; // called by "Continue Shopping" and the X button
}

// CartOffcanvas uses Bootstrap's Offcanvas component (slides in from the right).
// NEW BOOTSTRAP FEATURE #1: Offcanvas — never used in class before.
// The `show` class toggles visibility via React state (no Bootstrap JS needed).
function CartOffcanvas({ show, onClose }: Props) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Dark backdrop behind the offcanvas — clicking it also closes the cart */}
      {show && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={onClose}
        />
      )}

      {/* Offcanvas panel slides in from the right */}
      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
        style={{ visibility: show ? 'visible' : 'hidden' }}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Your Cart</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>

        {/* Body — list of cart items */}
        <div className="offcanvas-body d-flex flex-column">
          {cartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              {/* One row per cart item */}
              {cartItems.map((item) => (
                <div key={item.book.bookId} className="border-bottom pb-2 mb-2">
                  <div className="fw-semibold">{item.book.title}</div>
                  <div className="text-muted small">{item.book.author}</div>

                  {/* Quantity controls and subtotal */}
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.book.bookId, item.quantity - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.book.bookId, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                    {/* Price per unit */}
                    <span className="ms-auto text-muted small">
                      ${item.book.price.toFixed(2)} ea.
                    </span>

                    {/* Subtotal for this line */}
                    <span className="fw-semibold">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove button */}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.book.bookId)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              {/* Order total */}
              <div className="mt-auto pt-3 border-top fs-5 fw-bold text-end">
                Total: ${cartTotal.toFixed(2)}
              </div>
            </>
          )}

          {/* "Continue Shopping" closes the cart and returns the user to exactly
              where they were on the book list (page + category are untouched) */}
          <button
            className="btn btn-primary mt-3"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartOffcanvas;
