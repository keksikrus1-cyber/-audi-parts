import { PRICE_COMPARISON, PRICE_COMPARISON_TITLE } from '@/data/priceComparison'

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
      <h2 className="ap-heading-lg" style={{ marginBottom: '1.5rem' }}>{PRICE_COMPARISON_TITLE}</h2>
      <div className="ap-comparison-table">
        <div className="ap-comparison-header">
          <span>Магазин</span>
          <span>Цена</span>
          <span>Доставка</span>
          <span>Наличие</span>
          <span style={{ textAlign: 'right' }}>Итого / Экономия</span>
        </div>
        {PRICE_COMPARISON.map(r => (
          <div key={r.supplierId} className={`ap-comparison-row${r.bestPrice ? ' best' : ''}`}>
            <div className="ap-supplier-cell">
              <div className="ap-supplier-logo">{r.shortCode}</div>
              <div>
                <strong>{r.supplierName}</strong>
                <Stars filled={r.stars} rating={r.rating} />
              </div>
            </div>
            <div className="ap-mono" style={{ fontWeight: 500 }}>{r.price}</div>
            <div className="ap-text-secondary" style={{ fontSize: '0.9rem' }}>{r.delivery}</div>
            <div>
              <span style={{ background: 'var(--ap-surface-active)', color: 'var(--ap-text-primary)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                {r.location}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="ap-mono" style={{ fontWeight: 600 }}>{r.total}</div>
              <div style={{ fontSize: '0.75rem', color: r.savingsPositive ? 'var(--ap-success)' : 'var(--ap-danger)', marginTop: '0.25rem' }}>
                {r.savings}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
