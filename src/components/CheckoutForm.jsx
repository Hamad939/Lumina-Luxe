import { useState } from 'react'

const initialFormState = {
  fullName: '',
  phoneNumber: '',
  shippingAddress: '',
  city: '',
  paymentMethod: 'Cash on Delivery',
}

function CheckoutForm({
  disabled,
  isProcessing,
  onPlaceOrder,
  orderFeedback,
  whatsappUrl,
}) {
  const [formData, setFormData] = useState(initialFormState)
  const [phoneError, setPhoneError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentForm) => ({ ...currentForm, [name]: value }))

    if (name === 'phoneNumber') {
      setPhoneError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (disabled) {
      return
    }

    const phonePattern = /^\d{11}$/

    if (!phonePattern.test(formData.phoneNumber)) {
      setPhoneError('Phone number must be 11 digits.')
      return
    }

    setPhoneError('')
    const isSuccessful = await onPlaceOrder(formData)

    if (isSuccessful) {
      setFormData(initialFormState)
    }
  }

  return (
    <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(88,66,44,0.07)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Secure checkout
        </p>
        <h2 className="mt-3 font-brand text-4xl text-[var(--color-ink)]">
          Shipping Details
        </h2>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            Full Name
          </span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="h-12 w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-cream)] px-4 text-sm outline-none transition focus:border-[var(--color-accent)]"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            Phone Number
          </span>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            inputMode="tel"
            placeholder="03001234567"
            className={`h-12 w-full rounded-2xl border bg-[var(--color-cream)] px-4 text-sm outline-none transition focus:border-[var(--color-accent)] ${
              phoneError ? 'border-red-400' : 'border-[var(--color-line)]'
            }`}
            required
          />
          {phoneError && (
            <p className="mt-2 text-sm text-red-500">{phoneError}</p>
          )}
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            Shipping Address
          </span>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            placeholder="Enter your delivery address"
            rows="4"
            className="w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-accent)]"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            City
          </span>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="h-12 w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-cream)] px-4 text-sm outline-none transition focus:border-[var(--color-accent)]"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
            Payment Method
          </span>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-cream)] px-4 text-sm outline-none transition focus:border-[var(--color-accent)]"
          >
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
            <option>Debit Card on Delivery</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={disabled || isProcessing}
          className="mt-4 h-12 w-full rounded-full bg-[var(--color-accent)] text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:bg-[#d9c0b2]"
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>

      {orderFeedback && (
        <div className="mt-6 rounded-3xl bg-[var(--color-blush)] px-4 py-4 text-sm leading-6 text-[var(--color-ink)]">
          <p>{orderFeedback}</p>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              Open WhatsApp
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default CheckoutForm
