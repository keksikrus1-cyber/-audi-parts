# Backend Schema Plan

## Что добавлено в schema.prisma

### Новые enums

| Enum | Значения | Назначение |
|------|----------|-----------|
| `ProductType` | `ORIGINAL`, `ANALOG` | Тип запчасти |
| `StockStatus` | `IN_STOCK`, `ORDER_ONLY`, `OUT_OF_STOCK` | Статус наличия у поставщика |

Существующие enums (`Role`, `OrderStatus`, `PaymentStatus`) не изменены.

### Расширенные модели

**`Supplier`** — добавлены поля:
- `shortCode` — короткий код для отображения (EX, EM, AU, AV)
- `isActive` — флаг активности поставщика

**`Part`** — добавлены поля:
- `sku` — артикул в системе AudiParts
- `oem` — оригинальный номер производителя
- `type ProductType` — ORIGINAL / ANALOG
- `imageIcon` — emoji-иконка для mock UI
- `compatibility` — строка совместимости (A4 B8, A5 Q5)
- Индексы: `sku`, `oem`

**`Offer`** — добавлены поля:
- `stockStatus StockStatus` — статус наличия
- `externalSku` — артикул у поставщика
- `externalUrl` — ссылка на товар у поставщика
- Relation: `cartItems CartItem[]`

**`User`** — добавлены relations:
- `cartItems CartItem[]`
- `favorites Favorite[]`
- `vinRequests VinRequest[]`

### Новые модели

**`CartItem`**
```
id, userId, partId, offerId?, quantity, createdAt, updatedAt
```
- Уникальность: `(userId, partId, offerId)`
- Индекс: `userId`
- При удалении пользователя — Cascade; offer — SetNull

**`Favorite`**
```
id, userId, partId, createdAt
```
- Уникальность: `(userId, partId)` — нельзя добавить одно и то же дважды
- Индекс: `userId`

**`VinRequest`**
```
id, userId?, vin, model?, generation?, year?, body?, plant?, resultJson?, createdAt
```
- `userId` nullable — анонимные запросы разрешены
- `resultJson` — полный результат декодирования (Json)
- Индексы: `vin`, `(userId, createdAt)`

## Связи между моделями

```
User ──< AuthSession
User ──< Order ──< OrderItem ──> Offer
User ──< CartItem ──> Part, Offer?
User ──< Favorite ──> Part
User ──< VinRequest
User ──1 Supplier ──< Part ──< Offer
Category ──< Part
Part ──< Offer
Offer ──< OrderItem
Order ──1 Payment
WebhookLog (standalone)
```

## Что пока не реализовано

- Seed-файл с данными
- API routes (следующий этап)
- Реальные интеграции с поставщиками (Exist, Emex, Autodoc, Avtoall)
- YooKassa webhook обработка (модели Payment/WebhookLog уже есть)
- Кабинет поставщика
- Админка

## Seed план

При создании seed-файла (`backend/prisma/seed.ts`) перенести из frontend mock:

**Suppliers** (из `web/src/data/suppliers.ts`):
```
Exist.ru   shortCode=EX  rating=4.2
Emex.ru    shortCode=EM  rating=4.8
Autodoc    shortCode=AU  rating=3.4
Avtoall.ru shortCode=AV  rating=3.1
```
Каждый supplier требует User-записи (role=SUPPLIER).

**Categories** (из `web/src/data/categories.ts`):
```
тормоза, подвеска, фильтры, масла, электроника, кузов, двигатель, кпп
```

**Parts** (из `web/src/data/products.ts`):
```
Brembo P85075, Audi VAG 8K0698151F, MANN-FILTER W712/35,
Bilstein 22-153694, NGK IZFR6K-13, Lemförder 32801 01
```

**Offers** — по одному офферу на каждый Part от Exist.ru с ценами из mock.

## Следующие этапы после schema

1. **Seed** — создать `backend/prisma/seed.ts` с тестовыми данными
2. **API routes** — Hono routes для products, suppliers, cart, favorites, vin
3. **Auth** — уже реализована в шаблоне, нужно только проверить совместимость с новыми полями
4. **Frontend integration** — заменить mock data на реальные API calls через TanStack Query
5. **Contracts** — добавить Zod schemas в `packages/contracts` для новых сущностей

## Migration

Схема валидирована (`prisma validate` ✅) и клиент сгенерирован (`prisma generate` ✅).

Для применения миграции к локальной БД:
```bash
docker compose up -d postgres
bun run --cwd backend prisma:migrate
```

Миграция создаст таблицы: `cart_items`, `favorites`, `vin_requests`
и добавит колонки к: `suppliers`, `parts`, `offers`.
