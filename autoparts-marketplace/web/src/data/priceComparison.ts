export interface PriceComparisonOffer {
  supplierId: string
  supplierName: string
  shortCode: string
  stars: number
  rating: number
  price: string
  delivery: string
  location: string
  total: string
  savings: string
  savingsPositive: boolean
  bestPrice: boolean
}

export const PRICE_COMPARISON_TITLE = 'Сравнение цен: Тормозные колодки Brembo P85075'

export const PRICE_COMPARISON: PriceComparisonOffer[] = [
  {
    supplierId: 'exist', supplierName: 'Exist.ru', shortCode: 'EX',
    stars: 4, rating: 4.2,
    price: '3 200 ₽', delivery: 'бесплатно, 1 день', location: 'Москва',
    total: '3 200 ₽', savings: 'Лучшая цена', savingsPositive: true, bestPrice: true,
  },
  {
    supplierId: 'emex', supplierName: 'Emex.ru', shortCode: 'EM',
    stars: 5, rating: 4.8,
    price: '3 450 ₽', delivery: '+350 ₽, 2 дня', location: 'Москва',
    total: '3 800 ₽', savings: '−600 ₽', savingsPositive: true, bestPrice: false,
  },
  {
    supplierId: 'autodoc', supplierName: 'Autodoc', shortCode: 'AU',
    stars: 3, rating: 3.4,
    price: '3 720 ₽', delivery: 'бесплатно, 3 дня', location: 'СПб',
    total: '3 720 ₽', savings: '−520 ₽', savingsPositive: true, bestPrice: false,
  },
  {
    supplierId: 'avtoall', supplierName: 'Avtoall.ru', shortCode: 'AV',
    stars: 3, rating: 3.1,
    price: '4 100 ₽', delivery: '+350 ₽, 4 дня', location: 'Под заказ',
    total: '4 450 ₽', savings: '+1 250 ₽', savingsPositive: false, bestPrice: false,
  },
]
