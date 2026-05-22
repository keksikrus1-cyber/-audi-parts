import { useCart } from './CartProvider'

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total, count } = useCart()

  const delivery = items.length > 0 ? 350 : 0
  const bySupplier = items.reduce<Record<string, typeof items>>((acc, item) => {
    ;(acc[item.supplier] ??= []).push(item)
    return acc
  }, {})

  return (
    <>
      <div className={`ap-cart-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <div className={`ap-cart-panel${open ? ' open' : ''}`}>
        <div className="ap-cart-header">
          <h3 className="ap-heading-md">🛒 Корзина <span style={{ color: 'var(--ap-accent)' }}>{count > 0 ? count : ''}</span></h3>
          <button className="ap-cart-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="ap-cart-body">
          {items.length === 0 ? (
            <div className="ap-cart-empty">
              <div style={{ fontSize: '4rem', opacity: 0.5, marginBottom: '1rem' }}>🛒</div>
              <div>Корзина пуста</div>
            </div>
          ) : (
            Object.entries(bySupplier).map(([supplier, supplierItems]) => (
              <div key={supplier} className="ap-cart-supplier">
                <div className="ap-cart-supplier-header">
                  <span>{supplier}</span>
                  <span className="ap-mono ap-text-muted" style={{ fontSize: '0.85rem' }}>
                    {supplierItems.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                {supplierItems.map(item => (
                  <div key={item.id} className="ap-cart-item">
                    <div className="ap-cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="ap-mono">{item.sku}</p>
                      <div className="ap-cart-item-qty">
                        <button className="ap-qty-btn" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                        <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                        <button className="ap-qty-btn" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                        <button onClick={() => remove(item.id)} style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--ap-danger)', cursor: 'pointer', background: 'none', border: 'none' }}>✕</button>
                      </div>
                    </div>
                    <div className="ap-cart-item-price">
                      {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="ap-cart-footer">
            <div className="ap-cart-totals">
              <div className="ap-cart-total-row">
                <span>Товары</span>
                <span className="ap-mono">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="ap-cart-total-row">
                <span>Доставка</span>
                <span className="ap-mono">{delivery > 0 ? `${delivery} ₽` : 'бесплатно'}</span>
              </div>
              <div className="ap-cart-total-row" style={{ fontWeight: 600, fontSize: '1.1rem', borderTop: '2px solid var(--ap-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <span>Итого</span>
                <span className="ap-mono">{(total + delivery).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
            <button
              className="ap-btn ap-btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
              onClick={() => console.log('checkout', { items, total })}
            >
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </>
  )
}
