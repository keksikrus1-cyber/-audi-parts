export type ProductType = 'original' | 'analog'

export interface Product {
  id: string
  name: string
  brand: string
  sku: string
  type: ProductType
  price: number
  priceFormatted: string
  delivery: string
  offers: number
  compat: string
  icon: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1', brand: 'Brembo',     name: 'Тормозные колодки P85075',   sku: 'P85075',
    type: 'analog',   price: 3200,  priceFormatted: '3 200 ₽', delivery: '1 дн.', offers: 4,
    compat: 'A4 B8, A5 Q5', icon: '🛑',
  },
  {
    id: '2', brand: 'Audi VAG',   name: 'Тормозные колодки 8K0698151F', sku: '8K0698151F',
    type: 'original', price: 7800,  priceFormatted: '7 800 ₽', delivery: '2 дн.', offers: 2,
    compat: 'A4 B8', icon: '🛑',
  },
  {
    id: '3', brand: 'MANN-FILTER', name: 'Масляный фильтр W712/35',    sku: 'W712/35',
    type: 'analog',   price: 680,   priceFormatted: '680 ₽',   delivery: '1 дн.', offers: 4,
    compat: 'A3, A4, A6, Q5, Q7', icon: '🔧',
  },
  {
    id: '4', brand: 'Bilstein',   name: 'Амортизатор 22-153694',       sku: '22-153694',
    type: 'analog',   price: 12500, priceFormatted: '12 500 ₽', delivery: '3 дн.', offers: 3,
    compat: 'A6 C7, A7', icon: '🔩',
  },
  {
    id: '5', brand: 'NGK',        name: 'Свеча зажигания IZFR6K-13',  sku: 'IZFR6K-13',
    type: 'analog',   price: 890,   priceFormatted: '890 ₽',   delivery: '1 дн.', offers: 4,
    compat: 'A4, A5, Q5 2.0 TFSI', icon: '⚡',
  },
  {
    id: '6', brand: 'Lemförder',  name: 'Рычаг подвески 32801 01',    sku: '32801 01',
    type: 'analog',   price: 4300,  priceFormatted: '4 300 ₽', delivery: '2 дн.', offers: 3,
    compat: 'A4 B8, A5, Q5', icon: '🔩',
  },
]
