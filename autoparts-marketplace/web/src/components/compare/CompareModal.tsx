import { useLocalUi } from '@/components/local-ui/LocalUiProvider'
import { PRODUCTS } from '@/data/products'

const ROWS = [
  { label: 'Бренд',        key: 'brand' as const },
  { label: 'Артикул',      key: 'sku' as const },
  { label: 'Тип',          key: 'type' as const },
  { label: 'Цена',         key: 'priceFormatted' as const },
  { label: 'Доставка',     key: 'delivery' as const },
  { label: 'Предложений',  key: 'offers' as const },
  { label: 'Совместимость',key: 'compat' as const },
]

export function CompareModal() {
  const { compareIds, compareModalOpen, setCompareModalOpen, clearCompare } = useLocalUi()
  if (!compareModalOpen) return null

  const products = compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS

  return (
    <div className={`ap-modal-overlay open`} onClick={() => setCompareModalOpen(false)}>
      <div className="ap-modal" onClick={e => e.stopPropagation()}>
        <div className="ap-modal-header">
          <h3 className="ap-heading-md">Сравнение товаров</h3>
          <button className="ap-cart-close" onClick={() => setCompareModalOpen(false)}>✕</button>
        </div>
        <div className="ap-modal-body" style={{ overflowX: 'auto' }}>
          <table className="ap-compare-table">
            <thead>
              <tr>
                <th>Характеристика</th>
                {products.map(p => (
                  <th key={p.id} className="ap-compare-product-col">
                    <div style={{ fontSize: '1.5rem' }}>{p.icon}</div>
                    <div style={{ fontWeight: 600, margin: '0.5rem 0 0.25rem' }}>{p.name}</div>
                    <div className="ap-mono ap-text-muted" style={{ fontSize: '0.75rem' }}>{p.sku}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.key}>
                  <td style={{ fontWeight: 500, background: 'var(--ap-bg-primary)' }}>{row.label}</td>
                  {products.map(p => (
                    <td key={p.id} style={{ textAlign: 'center' }}>
                      {row.key === 'type'
                        ? (p.type === 'original' ? 'Оригинал' : 'Аналог')
                        : String(p[row.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ap-modal-footer">
          <button className="ap-btn ap-btn-secondary ap-btn-small" onClick={clearCompare}>Очистить</button>
          <button className="ap-btn ap-btn-secondary ap-btn-small" onClick={() => setCompareModalOpen(false)}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}
