const ROWS = [
  {
    code: 'EX', name: 'Exist.ru',    rating: 4.2, stars: 4,
    price: '3 200 ₽', delivery: 'бесплатно, 1 день', location: 'Москва',
    total: '3 200 ₽', savings: 'Лучшая цена', savingsColor: 'var(--ap-success)', best: true,
  },
  {
    code: 'EM', name: 'Emex.ru',     rating: 4.8, stars: 5,
    price: '3 450 ₽', delivery: '+350 ₽, 2 дня',    location: 'Москва',
    total: '3 800 ₽', savings: '−600 ₽',       savingsColor: 'var(--ap-success)', best: false,
  },
  {
    code: 'AU', name: 'Autodoc',     rating: 3.4, stars: 3,
    price: '3 720 ₽', delivery: 'бесплатно, 3 дня', location: 'СПб',
    total: '3 720 ₽', savings: '−520 ₽',       savingsColor: 'var(--ap-success)', best: false,
  },
  {
    code: 'AV', name: 'Avtoall.ru',  rating: 3.1, stars: 3,
    price: '4 100 ₽', delivery: '+350 ₽, 4 дня',    location: 'Под заказ',
    total: '4 450 ₽', savings: '+1 250 ₽',     savingsColor: 'var(--ap-danger)',  best: false,
  },
]

function Stars({ filled, rating }: { filled: number; rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center', fontSize: '0.8rem' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: 'var(--ap-accent)', opacity: i < filled ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ color: 'var(--ap-text-muted)', marginLeft: '4px' }}>{rating}</span>
    </div>
  )
}

export function PriceComparisonTable() {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 className="ap-heading-lg" style={{ marginBottom: '1.5rem' }}>
        Сравнение цен: Тормозные колодки Brembo P85075
      </h2>
      <div className="ap-comparison-table">
        <div className="ap-comparison-header">
          <span>Магазин</span>
          <span>Цена</span>
          <span>Доставка</span>
          <span>Наличие</span>
          <span style={{ textAlign: 'right' }}>Итого / Экономия</span>
        </div>
        {ROWS.map(r => (
          <div key={r.code} className={`ap-comparison-row${r.best ? ' best' : ''}`}>
            <div className="ap-supplier-cell">
              <div className="ap-supplier-logo">{r.code}</div>
              <div>
                <strong>{r.name}</strong>
                <Stars filled={r.stars} rating={r.rating} />
              </div>
            </div>
            <div className="ap-mono" style={{ fontWeight: 500 }}>{r.price}</div>
            <div className="ap-text-secondary" style={{ fontSize: '0.9rem' }}>{r.delivery}</div>
            <div>
              <span className="ap-badge ap-badge-accent" style={{ background: 'var(--ap-surface-active)', color: 'var(--ap-text-primary)' }}>
                {r.location}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="ap-mono" style={{ fontWeight: 600 }}>{r.total}</div>
              <div style={{ fontSize: '0.75rem', color: r.savingsColor, marginTop: '0.25rem' }}>{r.savings}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
