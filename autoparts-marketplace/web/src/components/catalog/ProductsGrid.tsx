import type { Product } from '@/data/products'
import { ProductCard } from './ProductCard'

interface ProductsGridProps {
  products: Product[]
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <div className="ap-empty-state">
        <div className="ap-empty-state-icon">🔍</div>
        <div className="ap-empty-state-text">Ничего не найдено.<br />Попробуйте изменить фильтры.</div>
      </div>
    )
  }
  return (
    <div className="ap-products-grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
