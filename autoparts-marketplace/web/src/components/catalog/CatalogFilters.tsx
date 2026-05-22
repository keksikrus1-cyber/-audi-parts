import { SUPPLIERS } from '@/data/suppliers'

const BRANDS = ['Brembo', 'MANN-FILTER', 'Bilstein', 'NGK', 'Lemförder', 'Audi VAG', 'Bosch']
const BRAND_COUNTS: Record<string, number> = { Brembo: 42, 'MANN-FILTER': 89, Bilstein: 31, NGK: 56, 'Lemförder': 28, 'Audi VAG': 194, Bosch: 77 }

export interface FilterState {
  type: 'all' | 'original' | 'analog'
  minPrice: string
  maxPrice: string
  brands: string[]
  delivery: 'any' | '1-2' | '5' | '10'
  suppliers: string[]
}

export const DEFAULT_FILTERS: FilterState = {
  type: 'all', minPrice: '', maxPrice: '',
  brands: ['Brembo', 'MANN-FILTER', 'Audi VAG'],
  delivery: 'any',
  suppliers: SUPPLIERS.map(s => s.id),
}

interface CatalogFiltersProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  onApply: () => void
}

export function CatalogFilters({ filters, onChange, onApply }: CatalogFiltersProps) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val })

  const toggleBrand = (b: string) =>
    set('brands', filters.brands.includes(b) ? filters.brands.filter(x => x !== b) : [...filters.brands, b])

  const toggleSupplier = (id: string) =>
    set('suppliers', filters.suppliers.includes(id) ? filters.suppliers.filter(x => x !== id) : [...filters.suppliers, id])

  return (
    <aside className="ap-filters-sidebar">
      {/* Тип */}
      <div className="ap-filter-group">
        <h4>Тип</h4>
        <div className="ap-toggle-group">
          {(['all', 'original', 'analog'] as const).map(t => (
            <button
              key={t}
              className={`ap-toggle-btn${filters.type === t ? ' active' : ''}`}
              onClick={() => set('type', t)}
            >
              {t === 'all' ? 'Все' : t === 'original' ? 'Оригинал' : 'Аналог'}
            </button>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div className="ap-filter-group">
        <h4>Цена</h4>
        <div className="ap-price-range">
          <input className="ap-input" type="number" placeholder="От" value={filters.minPrice} onChange={e => set('minPrice', e.target.value)} style={{ width: '80px', textAlign: 'center' }} />
          <span className="ap-text-muted">—</span>
          <input className="ap-input" type="number" placeholder="До" value={filters.maxPrice} onChange={e => set('maxPrice', e.target.value)} style={{ width: '80px', textAlign: 'center' }} />
          <span className="ap-text-muted">₽</span>
        </div>
      </div>

      {/* Бренды */}
      <div className="ap-filter-group">
        <h4>Бренды</h4>
        <div className="ap-checkbox-group">
          {BRANDS.map(b => (
            <label key={b} className="ap-checkbox-label">
              <input type="checkbox" checked={filters.brands.includes(b)} onChange={() => toggleBrand(b)} style={{ accentColor: 'var(--ap-accent)', width: 16, height: 16 }} />
              {b}
              <span className="ap-mono ap-text-muted" style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>{BRAND_COUNTS[b]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Доставка */}
      <div className="ap-filter-group">
        <h4>Срок доставки</h4>
        <div className="ap-radio-group">
          {([['any','Любой'],['1-2','1-2 дня'],['5','до 5 дней'],['10','до 10 дней']] as const).map(([v, l]) => (
            <label key={v} className="ap-radio-label">
              <input type="radio" name="delivery" checked={filters.delivery === v} onChange={() => set('delivery', v)} style={{ accentColor: 'var(--ap-accent)' }} />
              {l}
            </label>
          ))}
        </div>
      </div>

      {/* Поставщики */}
      <div className="ap-filter-group">
        <h4>Поставщики</h4>
        <div className="ap-checkbox-group">
          {SUPPLIERS.map(s => (
            <label key={s.id} className="ap-checkbox-label">
              <input type="checkbox" checked={filters.suppliers.includes(s.id)} onChange={() => toggleSupplier(s.id)} style={{ accentColor: 'var(--ap-accent)', width: 16, height: 16 }} />
              {s.name}
            </label>
          ))}
        </div>
      </div>

      <button className="ap-btn ap-btn-primary" style={{ width: '100%' }} onClick={onApply}>
        Применить
      </button>
    </aside>
  )
}
