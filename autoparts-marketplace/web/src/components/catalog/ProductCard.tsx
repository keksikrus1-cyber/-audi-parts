import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="ap-product-card">
      <div className="ap-product-image">
        <span style={{ fontSize: '3rem' }}>{product.icon}</span>
        <span className={`ap-product-badge ${product.type === 'original' ? 'ap-badge-original' : 'ap-badge-analog'}`}>
          {product.type === 'original' ? 'Оригинал' : 'Аналог'}
        </span>
        <div className="ap-product-actions">
          <button className="ap-action-btn" title="В избранное" onClick={() => console.log('favorite', product.id)}>♡</button>
          <button className="ap-action-btn" title="Сравнить"    onClick={() => console.log('compare', product.id)}>⚖️</button>
          <button className="ap-action-btn" title="Следить за ценой" onClick={() => console.log('alert', product.id)}>🔔</button>
        </div>
      </div>
      <div className="ap-product-info">
        <div className="ap-product-brand">{product.brand}</div>
        <div className="ap-product-name">{product.name}</div>
        <div className="ap-mono ap-text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{product.sku}</div>
        <div className="ap-text-secondary" style={{ fontSize: '0.75rem', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.compat}
        </div>
        <div className="ap-product-footer">
          <div>
            <div className="ap-mono" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{product.priceFormatted}</div>
            <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>{product.delivery}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--ap-text-secondary)' }}>
              <strong style={{ color: 'var(--ap-accent)' }}>{product.offers}</strong> предлож.
            </div>
          </div>
        </div>
        <button
          className="ap-btn ap-btn-primary"
          style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', fontSize: '0.85rem' }}
          onClick={() => console.log('addToCart', product.id)}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}
