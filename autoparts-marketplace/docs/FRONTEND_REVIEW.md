# Frontend MVP Review

Дата: 2026-05-24. Обновлено после добавления toast-системы.

## Что реализовано

### Дизайн-система
- `web/src/styles/audi-theme.css` — CSS-переменные dark/light, `.ap-*` классы для всех компонентов
- Google Fonts: IBM Plex Sans, IBM Plex Mono, Rajdhani
- Переключатель темы с `data-theme` на `documentElement` + `localStorage`
- Inline script в `index.html` — тема применяется до первого рендера (нет flash)

### Layout
- `Header` — sticky, логотип с 4 кольцами CSS, desktop nav, ThemeToggle, badges корзины и избранного, hamburger
- `MobileNav` — slide-in слева, overlay, активные ссылки
- `ThemeToggle` — dark/light, localStorage

### Главная страница (`/`)
- `HomeHero` — заголовок с акцентом, статистика 2×2
- `SearchForm` — 3 таба: по запросу / VIN / артикул; поиск → navigate `/catalog`
- `VIN decoder` — mock логика (WMI, модель, год, поколение, завод, двигатели)
- `PopularCategories` — 8 категорий, клик → navigate `/catalog`
- `PriceComparisonTable` — 4 поставщика из `data/priceComparison.ts`

### Каталог (`/catalog`)
- `CatalogFilters` — тип, цена, бренды, доставка, поставщики
- `ProductsGrid` — auto-fill сетка, empty state
- `ProductCard` — badge, action buttons, цена, "В корзину" (toast success)
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

### Toast-уведомления ✅ (добавлено)
- `ToastProvider` — React Context, `showToast(message, type)`, авто-скрытие 2.8с, стек
- Типы: `success` (зелёный), `error` (красный), `info` (синий)
- "В корзину" → toast success
- "Оформить заказ" → toast info (вместо `alert()`)
- "Следить за ценой" → toast info (вместо `alert()`)

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
| Toast notifications | ✅ |
| Typecheck | ✅ чистый |
| Dev server | ✅ HTTP 200 |

## Что остаётся mock-заглушкой

- Поиск по запросу/артикулу — navigate `/catalog` без реальной фильтрации
- "В корзину" — supplier всегда `Exist.ru` (mock)
- "Найти запчасти" из VIN decoder → `/catalog` без фильтрации по модели
- "Оформить заказ" → toast info (без Order API)
- "Следить за ценой" → toast info (без backend)
- `/salvage` и `/sto` — заглушки "скоро"
- `/app` — шаблонный auth UI из vibe template
- Уведомления в Header — badge "3" статичный

## Frontend mock MVP готов к backend integration

Все подготовительные шаги выполнены:

| Шаг | Статус |
|-----|--------|
| Prisma schema (User, Part, Supplier, Offer, CartItem, Favorite, VinRequest, Order) | ✅ |
| Seed-файл (`backend/prisma/seed.ts`) | ✅ |
| Shared contracts (`packages/contracts`) | ✅ |
| API implementation plan (`docs/API_IMPLEMENTATION_PLAN.md`) | ✅ |

**Следующий шаг после установки Docker:**
```bash
docker compose up -d postgres
bun run --cwd backend prisma:migrate
bun run --cwd backend prisma:seed
# затем реализовать API routes по docs/API_IMPLEMENTATION_PLAN.md
```

## Что нужно сделать при подключении backend

1. Реализовать API routes (порядок: products → VIN → cart → favorites → orders)
2. Заменить `CartProvider` localStorage на TanStack Query + `/api/cart`
3. Заменить `LocalUiProvider` favorites на TanStack Query + `/api/favorites`
4. Подключить поиск к `/api/products` с реальными фильтрами
5. Заменить mock VIN decoder на `/api/vin/decode`
6. Реализовать `/api/orders` для checkout

## Что можно отложить

- Страница избранного (отдельный роут)
- Страница `/salvage` — полноценный функционал
- Страница `/sto` — кабинет для СТО
- Реальная фильтрация каталога по VIN-результату
- Пагинация каталога

## Технический долг

### Оставшиеся console.log
- `ModelsPage.tsx` — "Найти запчасти" (navigate уже работает, console.log можно убрать)

### Прочее
- `AppPage` в `pages.tsx` — шаблонный UI из vibe, заменить при реализации авторизации
- `web/src/data/parts.ts` — шаблонный файл из vibe, не используется, можно удалить
- Supplier в корзине всегда `Exist.ru` — брать из реального предложения при подключении API
