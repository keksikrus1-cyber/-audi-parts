import type { Product } from '@/data/products'
import { useCart } from '@/components/cart/CartProvider'
import { useLocalUi } from '@/components/local-ui/LocalUiProvider'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { add, setOpen: openCart } = useCart()
  const { favorites, toggleFavorite, compareIds, toggleCompare } = useLocalUi()

  const isFav = favorites.has(product.id)
  const isCompare = compareIds.includes(product.id)

  const handleAddToCart = () => {
    add({
      id: product.id, name: product.name, sku: product.sku,
      price: product.price, priceFormatted: product.priceFormatted,
      delivery: product.delivery, supplier: 'Exist.ru',
    })
    openCart(true)
  }

  return (
    <div className="ap-product-card">
      <div className="ap-product-image">
        <span>{product.icon}</span>
        <span className={`ap-product-badge ${product.type === 'original' ? 'ap-badge-original' : 'ap-badge-analog'}`}>
          {product.type === 'original' ? 'Оригинал' : 'Аналог'}
        </span>
        <div className="ap-product-actions">
          <button className={`ap-action-btn${isFav ? ' active' : ''}`} title="В избранное" onClick={() => toggleFavorite(product.id)}>
            {isFav ? '♥' : '♡'}
          </button>
          <button className={`ap-action-btn${isCompare ? ' active' : ''}`} title="Сравнить" onClick={() => toggleCompare(product.id)}>
            ⚖️
          </button>
          <button className="ap-action-btn" title="Следить за ценой" onClick={() => console.log('alert', product.id)}>🔔</button>
        </div>
      </div>
      <div className="ap-product-info">
        <div className="ap-product-brand">{product.brand}</div>
        <div className="ap-product-name">{product.name}</div>
        <div className="ap-product-sku">{product.sku}</div>
        <div className="ap-product-compat">{product.compat}</div>
        <div className="ap-product-footer">
          <div>
            <div className="ap-product-price">{product.priceFormatted}</div>
            <div className="ap-product-delivery">{product.delivery}</div>
          </div>
          <div className="ap-product-offers">
            <strong>{product.offers}</strong> предлож.
          </div>
        </div>
        <button className="ap-product-add-btn" onClick={handleAddToCart}>В корзину</button>
      </div>
    </div>
  )
}
