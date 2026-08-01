import { MessageCircleHeart, icons, MessageCircle, Mail } from "lucide-react";

function Footer() {
  return (
    <footer id="about" className="px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/70 bg-white/70 px-6 py-10 shadow-[0_24px_60px_rgba(88,66,44,0.06)] sm:px-10 sm:py-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-brand text-2xl text-[var(--color-ink)]">
              Lunelle
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              Minimal wardrobe pieces, thoughtfully curated for modern
              femininity.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink)]/10 text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/30 hover:bg-[var(--color-ink)]/5"
              >
                <MessageCircleHeart size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink)]/10 text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/30 hover:bg-[var(--color-ink)]/5"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-ink)]/10 text-[var(--color-ink)] transition hover:border-[var(--color-ink)]/30 hover:bg-[var(--color-ink)]/5"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Dresses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Outerwear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">
              Company
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <li>
                <a
                  href="#about"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition hover:text-[var(--color-ink)]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">
              Stay in touch
            </h3>
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Get first access to new drops and seasonal edits.
            </p>
            <form
              className="mt-4 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-1 items-center gap-2 rounded-full border border-[var(--color-ink)]/10 bg-white px-4 py-2">
                <Mail size={15} className="text-[var(--color-muted)]" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-[var(--color-ink)]/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-[var(--color-muted)] sm:flex-row">
            <p>
              &copy; {new Date().getFullYear()} Lunelle. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a href="#" className="transition hover:text-[var(--color-ink)]">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-[var(--color-ink)]">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
