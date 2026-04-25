function CategoryCard({ category }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/70 bg-[var(--color-panel)] shadow-[0_24px_60px_rgba(88,66,44,0.07)]">
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-5 py-5">
        <h3 className="text-lg font-semibold text-[var(--color-ink)]">
          {category.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
          {category.description}
        </p>
      </div>
    </article>
  )
}

export default CategoryCard
