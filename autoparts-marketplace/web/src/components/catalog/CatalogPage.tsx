import { useState, useMemo } from 'react'
import { PRODUCTS } from '@/data/products'
import { CatalogFilters, DEFAULT_FILTERS, type FilterState } from './CatalogFilters'
import { ProductsGrid } from './ProductsGrid'
import { SortSelect, type SortValue } from './SortSelect'

export function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [applied, setApplied] = useState<FilterState>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortValue>('price-asc')

  const products = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      if (applied.type !== 'all' && p.type !== applied.type) return false
      if (applied.minPrice && p.price < Number(applied.minPrice)) return false
      if (applied.maxPrice && p.price > Number(applied.maxPrice)) return false
      if (applied.brands.length && !applied.brands.includes(p.brand)) return false
      if (applied.delivery !== 'any') {
        const days = parseInt(p.delivery)
        if (applied.delivery === '1-2' && days > 2) return false
        if (applied.delivery === '5'   && days > 5) return false
        if (applied.delivery === '10'  && days > 10) return false
      }
      return true
    })

    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'delivery')   list = [...list].sort((a, b) => parseInt(a.delivery) - parseInt(b.delivery))
    if (sort === 'popular')    list = [...list].sort((a, b) => b.offers - a.offers)

    return list
  }, [applied, sort])

  return (
    <div className="ap-catalog-page">
      <div className="ap-catalog-layout">
        <CatalogFilters filters={filters} onChange={setFilters} onApply={() => setApplied(filters)} />

        <div>
          <div className="ap-catalog-toolbar">
            <div className="ap-text-secondary" style={{ fontSize: '0.95rem' }}>
              Найдено: <strong style={{ color: 'var(--ap-accent)' }}>{products.length}</strong> товаров
            </div>
            <SortSelect value={sort} onChange={setSort} />
          </div>
          <ProductsGrid products={products} />
        </div>
      </div>
    </div>
  )
}
