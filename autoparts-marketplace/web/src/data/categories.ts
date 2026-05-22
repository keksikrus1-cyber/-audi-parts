export interface Category {
  id: string
  name: string
  icon: string
  count: string
  query: string
}

export const CATEGORIES: Category[] = [
  { id: 'brakes',      name: 'Тормоза',     icon: '🛑', count: '1,240', query: 'тормоза' },
  { id: 'suspension',  name: 'Подвеска',    icon: '🔩', count: '2,180', query: 'подвеска' },
  { id: 'filters',     name: 'Фильтры',     icon: '🔧', count: '890',   query: 'фильтры' },
  { id: 'oils',        name: 'Масла',       icon: '🫙', count: '340',   query: 'масла' },
  { id: 'electronics', name: 'Электроника', icon: '⚡', count: '1,670', query: 'электроника' },
  { id: 'body',        name: 'Кузов',       icon: '🚗', count: '3,420', query: 'кузов' },
  { id: 'engine',      name: 'Двигатель',   icon: '⚙️', count: '2,890', query: 'двигатель' },
  { id: 'gearbox',     name: 'КПП',         icon: '🔄', count: '760',   query: 'кпп' },
]
