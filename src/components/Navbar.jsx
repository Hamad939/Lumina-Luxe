import { Menu, ShoppingBag } from 'lucide-react'

function Navbar({ cartCount, currentPage, onMenuToggle, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-[rgba(248,242,236,0.85)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/70 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:bg-white"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-brand text-2xl tracking-[0.08em] text-[var(--color-ink)] sm:text-3xl"
          aria-label="Lunelle home"
        >
          Lunelle
        </button>

        <button
          type="button"
          onClick={onCartClick}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition ${
            currentPage === 'checkout'
              ? 'border-[var(--color-accent)] bg-[var(--color-blush)]'
              : 'border-[var(--color-line)] bg-white/70 hover:border-[var(--color-accent)] hover:bg-white'
          }`}
          aria-label="Open checkout"
        >
          <ShoppingBag className="h-5 w-5 text-[var(--color-ink)]" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-[10px] font-semibold text-white">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
