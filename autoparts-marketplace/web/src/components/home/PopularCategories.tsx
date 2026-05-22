import { CATEGORIES } from '@/data/categories'

export function PopularCategories() {
  return (
    <section className="ap-categories-section">
      <h2 className="ap-heading-lg" style={{ marginBottom: '1.5rem' }}>Популярные категории</h2>
      <div className="ap-categories-grid">
        {CATEGORIES.map(c => (
          <div key={c.id} className="ap-category-card">
            <div className="ap-category-icon">{c.icon}</div>
            <div className="ap-category-name">{c.name}</div>
            <div className="ap-mono ap-text-muted" style={{ fontSize: '0.75rem' }}>{c.count}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
