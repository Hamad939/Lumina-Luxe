import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

function formatDate(value) {
  if (!value) {
    return 'Recently placed'
  }

  return new Intl.DateTimeFormat('en-PK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function normalizeStatus(status) {
  if (!status) {
    return 'Pending'
  }

  return String(status)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function OrderTrackingPanel({ initialPhoneNumber = '', refreshKey = 0 }) {
  const [searchPhone, setSearchPhone] = useState(initialPhoneNumber)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchOrders = async (phoneNumber) => {
    if (!phoneNumber) {
      setOrders([])
      setErrorMessage('')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('phone_number', phoneNumber)

    setIsLoading(false)

    if (error) {
      setOrders([])
      setErrorMessage(error.message || 'Unable to load orders right now.')
      return
    }

    const sortedOrders = [...(data || [])].sort((firstOrder, secondOrder) => {
      const firstValue =
        firstOrder.created_at || firstOrder.id || firstOrder.customer_name || ''
      const secondValue =
        secondOrder.created_at ||
        secondOrder.id ||
        secondOrder.customer_name ||
        ''

      return String(secondValue).localeCompare(String(firstValue))
    })

    setOrders(sortedOrders)

    if (sortedOrders.length === 0) {
      setErrorMessage('No orders found for this phone number yet.')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await fetchOrders(searchPhone)
  }

  useEffect(() => {
    setSearchPhone(initialPhoneNumber)

    if (initialPhoneNumber) {
      fetchOrders(initialPhoneNumber)
    }
  }, [initialPhoneNumber, refreshKey])

  return (
    <section className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_24px_60px_rgba(88,66,44,0.07)] sm:p-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Track order
        </p>
        <h2 className="mt-3 font-brand text-4xl text-[var(--color-ink)]">
          Check your order status
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          Enter the same phone number you used at checkout to see your placed
          orders and their current status.
        </p>
      </div>

      <form className="flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
        <input
          type="tel"
          value={searchPhone}
          onChange={(event) => setSearchPhone(event.target.value)}
          inputMode="tel"
          placeholder="03001234567"
          className="h-12 flex-1 rounded-2xl border border-[var(--color-line)] bg-[var(--color-cream)] px-4 text-sm outline-none transition focus:border-[var(--color-accent)]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-12 rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold tracking-[0.12em] text-white transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:bg-[#d9c0b2]"
        >
          {isLoading ? 'Checking...' : 'Track Order'}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-5 rounded-3xl bg-[var(--color-blush)] px-4 py-4 text-sm leading-6 text-[var(--color-ink)]">
          {errorMessage}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-6 space-y-4">
          {orders.map((order, index) => (
            <article
              key={order.id || `${order.phone_number}-${index}`}
              className="rounded-[28px] border border-[var(--color-line)] bg-[var(--color-panel)] p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-[var(--color-ink)]">
                    {order.customer_name || 'Customer'}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-[var(--color-blush)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-ink)]">
                  {normalizeStatus(order.status)}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-[var(--color-muted)] sm:grid-cols-2">
                <p>
                  <span className="font-medium text-[var(--color-ink)]">
                    Total:
                  </span>{' '}
                  {formatCurrency(order.total_price)}
                </p>
                <p>
                  <span className="font-medium text-[var(--color-ink)]">
                    Payment:
                  </span>{' '}
                  {order.payment_method || 'Not provided'}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-medium text-[var(--color-ink)]">
                    Address:
                  </span>{' '}
                  {[order.address, order.city].filter(Boolean).join(', ')}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-[var(--color-ink)]">
                  Items
                </p>
                <ul className="mt-2 space-y-2 text-sm text-[var(--color-muted)]">
                  {(order.items || []).map((item, itemIndex) => (
                    <li
                      key={`${item.name || 'item'}-${itemIndex}`}
                      className="rounded-2xl bg-white/80 px-4 py-3"
                    >
                      {(item.name || 'Item') + ` x${item.quantity || 1}`}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrderTrackingPanel
