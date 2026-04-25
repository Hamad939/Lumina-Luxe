import { Minus, Plus } from "lucide-react";

function OrderSummary({ cartItems, onUpdateQuantity }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = 250;
  return (
    <div className="rounded-[32px] border border-white/70 bg-[var(--color-panel)] p-6 shadow-[0_24px_60px_rgba(88,66,44,0.07)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Order summary
        </p>
        <h2 className="mt-3 font-brand text-4xl text-[var(--color-ink)]">
          Your Cart
        </h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[28px] bg-white px-5 py-6 text-sm leading-7 text-[var(--color-muted)]">
          Your cart is empty. Add a few favorites from the collection to begin
          checkout.
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-[28px] bg-white p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-20 rounded-[20px] object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-ink)]">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      {item.price} Rs
                    </p>
                  </div>
                  <p className="font-brand text-2xl text-[var(--color-ink)]">
                    {item.price * item.quantity}Rs
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)]"
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-[var(--color-ink)]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)]"
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-[28px] bg-white p-5">
            <div className="flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Subtotal</span>
              <span>{subtotal} Rs</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-[var(--color-muted)]">
              <span>Shipping</span>
              <span>250 Rs</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-lg font-semibold text-[var(--color-ink)]">
              <span>Total</span>
              <span>Rs{subtotal + shipping}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
