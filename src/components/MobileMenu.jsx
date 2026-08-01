import { X } from "lucide-react";

const links = [
  { id: "top", label: "Home" },
  { id: "collections", label: "Collections" },
  { id: "about", label: "About" },
];

function MobileMenu({ currentPage, isOpen, onClose, onNavigate }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-[rgba(39,28,20,0.28)] transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-[var(--color-panel)] px-6 py-6 shadow-2xl transition-transform duration-300 sm:px-8 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-12 flex items-center justify-between">
          <span className="font-brand text-3xl text-[var(--color-ink)]">
            Lunelle
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)]"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-3">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate(link.id)}
              className={`cursor-pointer block w-full rounded-2xl px-4 py-4 text-left text-lg transition ${
                currentPage === "home" && link.id === "top"
                  ? "bg-[var(--color-blush)] text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-ink)]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-[28px] bg-white px-5 py-6 shadow-[0_24px_60px_rgba(88,66,44,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-muted)]">
            Soft essentials
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Thoughtful everyday pieces designed for easy styling, graceful
            layering, and effortless gifting.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default MobileMenu;
