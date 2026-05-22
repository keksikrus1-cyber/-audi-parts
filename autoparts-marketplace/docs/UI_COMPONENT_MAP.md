# UI Component Map

Карта React-компонентов на основе HTML-макета `docs/design/audi-parts-reference.html`.

Каждый компонент должен точно воспроизводить соответствующий блок из макета.

## Layout

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `Header` | `web/src/components/Header.tsx` | `.header` | не начат |
| `ThemeToggle` | `web/src/components/ThemeToggle.tsx` | `.theme-toggle` | не начат |
| `MobileNav` | `web/src/components/MobileNav.tsx` | `.mobile-nav` | не начат |
| `Footer` | `web/src/components/Footer.tsx` | `.footer` | не начат |

## Главная страница

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `HomeHero` | `web/src/components/HomeHero.tsx` | `.hero` | не начат |
| `SearchTabs` | `web/src/components/SearchTabs.tsx` | `.search-tabs` | не начат |
| `VinSearch` | `web/src/components/VinSearch.tsx` | `#tab-vin` | не начат |
| `ArticleSearch` | `web/src/components/ArticleSearch.tsx` | `#tab-article` | не начат |
| `CategoryGrid` | `web/src/components/CategoryGrid.tsx` | `.categories-grid` | не начат |
| `PriceComparisonTable` | `web/src/components/PriceComparisonTable.tsx` | `.comparison-table` | не начат |

## Каталог

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `CatalogPage` | `web/src/pages/CatalogPage.tsx` | `#page-catalog` | не начат |
| `CatalogFilters` | `web/src/components/CatalogFilters.tsx` | `.filters-sidebar` | не начат |
| `ProductCard` | `web/src/components/ProductCard.tsx` | `.product-card` | не начат |
| `ProductsGrid` | `web/src/components/ProductsGrid.tsx` | `.products-grid` | не начат |

## Модели

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `ModelsPage` | `web/src/pages/ModelsPage.tsx` | `#page-models` | не начат |
| `ModelAccordion` | `web/src/components/ModelAccordion.tsx` | `.model-item` | не начат |
| `GenerationCard` | `web/src/components/GenerationCard.tsx` | `.generation-card` | не начат |
| `SelectedModelBanner` | `web/src/components/SelectedModelBanner.tsx` | `.selected-model` | не начат |

## Корзина и избранное

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `CartDrawer` | `web/src/components/CartDrawer.tsx` | `.cart-panel` | не начат |
| `Favorites` | `web/src/components/Favorites.tsx` | иконка в `.header-actions` | не начат |

## Модальные окна и уведомления

| Компонент | Путь | HTML-блок | Статус |
|-----------|------|-----------|--------|
| `CompareModal` | `web/src/components/CompareModal.tsx` | `.modal` (сравнение) | не начат |
| `PriceAlertModal` | `web/src/components/PriceAlertModal.tsx` | `.modal` (уведомление о цене) | не начат |
| `Toast` | `web/src/components/Toast.tsx` | `.toast-container` | не начат |

## Правила

- Статусы: `не начат` → `в работе` → `готов`
- При создании компонента — обновить статус в этом файле
- Каждый компонент сверять с HTML-макетом визуально перед отметкой `готов`
- Не создавать компоненты, которых нет в этой карте, без обновления карты
