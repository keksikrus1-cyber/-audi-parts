# Frontend MVP Review

Дата: 2026-05-23. Состояние после переноса HTML-макета в React.

## Что реализовано

### Дизайн-система
- `web/src/styles/audi-theme.css` — CSS-переменные dark/light, `.ap-*` классы для всех компонентов
- Google Fonts: IBM Plex Sans, IBM Plex Mono, Rajdhani
- Переключатель темы с `data-theme` на `documentElement` + `localStorage`

### Layout
- `Header` — sticky, логотип с 4 кольцами CSS, desktop nav, ThemeToggle, badges корзины и избранного, hamburger
- `MobileNav` — slide-in слева, overlay, активные ссылки
- `ThemeToggle` — dark/light, localStorage

### Главная страница (`/`)
- `HomeHero` — заголовок с акцентом, статистика 2×2
- `SearchForm` — 3 таба: по запросу / VIN / артикул
- `VIN decoder` — mock логика (WMI, модель, год, поколение, завод, двигатели)
- `PopularCategories` — 8 категорий из `data/categories.ts`
- `PriceComparisonTable` — 4 поставщика из `data/priceComparison.ts`

### Каталог (`/catalog`)
- `CatalogFilters` — тип, цена, бренды, доставка, поставщики
- `ProductsGrid` — auto-fill сетка, empty state
- `ProductCard` — badge, action buttons, цена, "В корзину"
- `SortSelect` — 4 варианта сортировки
- Фильтрация и сортировка на `useState`/`useMemo`

### Модели (`/models`)
- `ModelFilterChips` — Все/Седаны/Кроссоверы/Спорт/Электро
- `ModelAccordion` — раскрытие/закрытие, 14 моделей
- `GenerationCard` — код, годы, теги кузова и двигателей, кнопка "Выбрать"
- `SelectedModelBanner` — зелёный баннер, кнопка → `/catalog`
- Поиск по названию модели

### Корзина
- `CartProvider` — React Context + `localStorage`
- `CartDrawer` — slide-in справа, overlay, группировка по поставщику, +/−, удаление, subtotal/delivery/total
- Badge в Header показывает реальный count

### Избранное
- `LocalUiProvider` — Set<id> в `localStorage`
- Кнопка ♡/♥ в `ProductCard` с активным состоянием
- Badge в Header показывает count

### Сравнение
- `CompareBar` — fixed bottom bar при ≥2 товарах
- `CompareModal` — таблица 7 характеристик

### Данные (mock)
- `data/audiModels.ts` — 14 моделей, полные поколения, типы
- `data/products.ts` — 6 товаров
- `data/categories.ts` — 8 категорий
- `data/suppliers.ts` — 4 поставщика
- `data/priceComparison.ts` — 4 строки таблицы

## Что проверено

| Роут | Статус |
|------|--------|
| `/` | ✅ Работает |
| `/catalog` | ✅ Работает |
| `/models` | ✅ Работает |
| `/salvage` | ✅ Заглушка "скоро" |
| `/sto` | ✅ Заглушка "скоро" |
| `/app` | ✅ Работает (шаблонный auth UI) |

| Функция | Статус |
|---------|--------|
| Cart localStorage | ✅ |
| Favorites localStorage | ✅ |
| Compare state | ✅ |
| Theme localStorage | ✅ |
| VIN decoder mock | ✅ |
| Typecheck | ✅ чистый |
| Dev server | ✅ HTTP 200 |

## Что остаётся mock-заглушкой

- Поиск по запросу и артикулу — `console.log`, без реального поиска
- "В корзину" открывает drawer, но supplier всегда `Exist.ru` (mock)
- "Найти запчасти" из VIN decoder → `/catalog` без фильтрации по модели
- "Оформить заказ" → `console.log`
- "Следить за ценой" → `console.log`
- `/salvage` и `/sto` — заглушки
- `/app` — шаблонный auth UI из vibe template

## Что нужно сделать перед backend

1. Убедиться, что Prisma schema покрывает все сущности из `MVP_PLAN.md`
2. Подготовить seed-данные на основе `data/*.ts`
3. Определить контракты API (Zod schemas в `packages/contracts`)
4. Настроить Docker Compose PostgreSQL (уже есть в шаблоне)

## Что можно отложить

- Страница избранного (отдельный роут)
- Страница `/salvage` (разборки) — полноценный функционал
- Страница `/sto` — кабинет для СТО
- Реальная фильтрация каталога по VIN-результату
- Пагинация каталога
- Уведомления (badge "3" в Header — статичный)

## Технический долг

### console.log (допустимы сейчас, заменить при подключении API)
- `SearchForm.tsx` — поиск по запросу и артикулу
- `ProductCard.tsx` — "Следить за ценой"
- `CartDrawer.tsx` — "Оформить заказ"
- `ModelsPage.tsx` — "Найти запчасти" (частично, navigate уже работает)

### Inline styles (83 вхождения, приоритетные для выноса)
- `ProductCard.tsx` — повторяющиеся `fontSize`, `fontWeight`, `marginBottom` → можно добавить `.ap-product-sku`, `.ap-product-compat`
- `CartDrawer.tsx` — итоговая строка grand total → можно добавить `.ap-cart-total-grand`
- `HomeHero.tsx` — стили stat-card value/label → уже есть `.ap-stat-card`, можно добавить `.ap-stat-value`, `.ap-stat-label`
- `GenerationCard.tsx` — `h4` стили → можно добавить `.ap-gen-title`

### Прочее
- `AppPage` в `pages.tsx` — шаблонный UI из vibe, не в стиле AudiParts. Заменить при реализации авторизации.
- `web/src/data/parts.ts` — шаблонный файл из vibe, не используется. Можно удалить.
- Уведомления в Header — badge "3" статичный, нет провайдера уведомлений.
- Supplier в корзине всегда `Exist.ru` — нужно будет брать из реального предложения поставщика.
