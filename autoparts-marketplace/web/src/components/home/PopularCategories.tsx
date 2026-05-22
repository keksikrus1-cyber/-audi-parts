const CATEGORIES = [
  { icon: '🛑', name: 'Тормоза',     count: '1,240' },
  { icon: '🔩', name: 'Подвеска',    count: '2,180' },
  { icon: '🔧', name: 'Фильтры',     count: '890'   },
  { icon: '🫙', name: 'Масла',       count: '340'   },
  { icon: '⚡', name: 'Электроника', count: '1,670' },
  { icon: '🚗', name: 'Кузов',       count: '3,420' },
  { icon: '⚙️', name: 'Двигатель',  count: '2,890' },
  { icon: '🔄', name: 'КПП',         count: '760'   },
]

export function PopularCategories() {
  return (
    <section className="ap-categories-section">
      <h2 className="ap-heading-lg" style={{ marginBottom: '1.5rem' }}>Популярные категории</h2>
      <div className="ap-categories-grid">
        {CATEGORIES.map(c => (
          <div key={c.name} className="ap-category-card">
            <div className="ap-category-icon">{c.icon}</div>
            <div className="ap-category-name">{c.name}</div>
            <div className="ap-mono ap-text-muted" style={{ fontSize: '0.75rem' }}>{c.count}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
