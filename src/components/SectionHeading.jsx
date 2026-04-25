function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-brand text-4xl text-[var(--color-ink)] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
        {description}
      </p>
    </div>
  )
}

export default SectionHeading
