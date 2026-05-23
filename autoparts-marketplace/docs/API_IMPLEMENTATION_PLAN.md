# API Implementation Plan — AudiParts

## Стек и паттерны

- Framework: Hono + `@hono/zod-openapi` (уже используется в auth)
- Validation: Zod schemas из `@autoparts/contracts`
- DB: Prisma client из `src/generated/prisma`
- Auth middleware: из `src/auth/` (JWT access token, cookie refresh)
- Routing: `createXxxRoutes()` функции, монтируются в `app.ts`
- Error helpers: `src/http/errors.ts` — `AppError`, `errorResponse`

Каждый новый модуль следует паттерну auth:
```
src/
  products/
    routes.ts   ← OpenAPIHono, Zod-validated routes
    service.ts  ← Prisma queries, business logic
```

---

## Порядок реализации

### Этап 1 — Products (public)

**Цель:** каталог работает без авторизации.

| Endpoint | Method | Auth | Contract |
|----------|--------|------|----------|
| `/api/products` | GET | public | `productSearchSchema` → `productListResponseSchema` |
| `/api/products/:id` | GET | public | — → `productWithOffersSchema` |
| `/api/categories` | GET | public | — → `{ items: Category[] }` |
| `/api/suppliers` | GET | public | — → `{ items: Supplier[] }` |

**Prisma:** `Part` + `Offer` + `Supplier` + `Category`

Query для `/api/products`:
```ts
prisma.part.findMany({
  where: {
    brand:   filters.brand ? { contains: filters.brand, mode: 'insensitive' } : undefined,
    type:    filters.type,
    offers:  { some: { isActive: true, deliveryDays: filters.delivery ? { lte: filters.delivery } : undefined } },
  },
  include: { offers: { where: { isActive: true }, include: { supplier: true } }, category: true },
  orderBy: sortMap[sort],
  skip: (page - 1) * limit,
  take: limit,
})
```

---

### Этап 2 — VIN (public, с логированием)

| Endpoint | Method | Auth | Contract |
|----------|--------|------|----------|
| `/api/vin/decode` | POST | public | `vinDecodeInputSchema` → `vinDecodeResultSchema` |

**Логика:**
1. Вызвать `decodeAudiVin(vin)` из `src/lib/vin/` (перенести из frontend)
2. Сохранить результат в `VinRequest` (userId nullable — для анонимов)
3. Вернуть `VinDecodeResult`

**Prisma:** `VinRequest`

---

### Этап 3 — Cart (requires auth)

| Endpoint | Method | Auth | Contract |
|----------|--------|------|----------|
| `/api/cart` | GET | ✅ | — → `cartSummarySchema` |
| `/api/cart` | POST | ✅ | `addToCartInputSchema` → `cartItemSchema` |
| `/api/cart/:itemId` | PATCH | ✅ | `updateCartItemInputSchema` → `cartItemSchema` |
| `/api/cart/:itemId` | DELETE | ✅ | — → `{ ok: true }` |

**Prisma:** `CartItem` + `Part` + `Offer`

Бизнес-правила:
- При `quantity = 0` в PATCH — удалить запись
- `@@unique([userId, partId, offerId])` — при повторном POST увеличивать quantity

---

### Этап 4 — Favorites (requires auth)

| Endpoint | Method | Auth | Contract |
|----------|--------|------|----------|
| `/api/favorites` | GET | ✅ | — → `{ items: FavoriteItem[] }` |
| `/api/favorites` | POST | ✅ | `toggleFavoriteInputSchema` → `{ added: boolean }` |
| `/api/favorites/:partId` | DELETE | ✅ | — → `{ ok: true }` |

**Prisma:** `Favorite` + `Part`

Toggle-логика: если запись есть — удалить, иначе создать.

---

### Этап 5 — Orders (requires auth)

| Endpoint | Method | Auth | Contract |
|----------|--------|------|----------|
| `/api/orders` | GET | ✅ | — → `{ items: Order[] }` |
| `/api/orders` | POST | ✅ | `createOrderInputSchema` → `orderSchema` |
| `/api/orders/:id` | GET | ✅ | — → `orderSchema` |

**Prisma:** `Order` + `OrderItem` + `CartItem` + `Offer` + `Part`

Логика создания заказа:
1. Взять `CartItem[]` текущего пользователя
2. Для каждого — записать snapshot (name, sku, brand, price)
3. Создать `Order` + `OrderItem[]` в транзакции
4. Очистить корзину
5. Вернуть созданный заказ

---

## Auth middleware

Существующий auth из шаблона уже работает. Для защищённых routes:

```ts
// Извлечь userId из JWT access token
app.use('/api/cart/*', authMiddleware)
app.use('/api/favorites/*', authMiddleware)
app.use('/api/orders/*', authMiddleware)
```

Middleware читает `Authorization: Bearer <token>`, валидирует JWT, кладёт `userId` в контекст.

---

## Что требует Docker/PostgreSQL

Всё нижеперечисленное **нельзя запустить без БД**:

- `prisma:migrate` — применение миграции
- `prisma:seed` — заполнение тестовыми данными
- Любые реальные API routes (Prisma обращается к PostgreSQL при старте)
- Integration tests

**Можно без БД:**
- `prisma validate` ✅
- `prisma generate` ✅
- `tsc --noEmit` (typecheck) ✅
- Unit tests (без Prisma) ✅
- Написание кода routes/services (без запуска)

---

## Как подключать frontend позже

### Шаг 1 — установить TanStack Query клиент (уже есть в web)

### Шаг 2 — создать API client в `web/src/lib/api-client.ts`

```ts
import type { AppType } from '../../backend/src/app'
import { hc } from 'hono/client'

export const apiClient = hc<AppType>(import.meta.env.VITE_API_URL)
```

### Шаг 3 — заменять mock данные поэтапно

Приоритет замены:
1. `PopularCategories` → `GET /api/categories`
2. `CatalogPage` → `GET /api/products` с фильтрами
3. `ProductCard` "В корзину" → `POST /api/cart`
4. `CartDrawer` → `GET /api/cart`
5. `SearchForm` VIN → `POST /api/vin/decode`
6. `ProductCard` избранное → `POST /api/favorites`

### Шаг 4 — убрать localStorage cart/favorites

После подключения API:
- `CartProvider` → TanStack Query + `/api/cart`
- `LocalUiProvider` favorites → TanStack Query + `/api/favorites`

---

## Модули, которые будут mock до конца MVP

| Модуль | Причина |
|--------|---------|
| Реальные поставщики (Exist/Emex/Autodoc) | Требуют платные API-ключи |
| YooKassa платежи | Требует верификацию юрлица |
| Email уведомления | Требует SMTP/сервис |
| Разборки (`/salvage`) | Отдельная бизнес-логика |

---

## Файловая структура после реализации

```
backend/src/
  app.ts                   ← +mount products/vin/cart/favorites/orders routes
  products/
    routes.ts
    service.ts
  vin/
    decoder.ts             ← перенести из web/src/lib/vin/mockVinDecoder.ts
    routes.ts
    service.ts
  cart/
    routes.ts
    service.ts
  favorites/
    routes.ts
    service.ts
  orders/
    routes.ts
    service.ts
```
