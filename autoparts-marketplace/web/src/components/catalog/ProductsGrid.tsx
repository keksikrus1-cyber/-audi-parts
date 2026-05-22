import type { Product } from '@/data/products'
import { ProductCard } from './ProductCard'

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div style={{ padding: '4rem 1rem', textAlign: 'center', color: 'var(--ap-text-muted)' }}>
        Ничего не найдено. Попробуйте изменить фильтры.
      </div>
    )
  }
  return (
    <div className="ap-products-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
