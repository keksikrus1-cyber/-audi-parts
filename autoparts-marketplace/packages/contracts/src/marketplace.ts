import { z } from 'zod'

// ── Enums ─────────────────────────────────────────────────────────────────────

export const productTypeSchema = z.enum(['ORIGINAL', 'ANALOG'])
export const stockStatusSchema = z.enum(['IN_STOCK', 'ORDER_ONLY', 'OUT_OF_STOCK'])
export const orderStatusSchema = z.enum(['PENDING', 'CONFIRMED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'])

// ── Supplier ──────────────────────────────────────────────────────────────────

export const supplierSchema = z.object({
  id:        z.string().uuid(),
  name:      z.string(),
  shortCode: z.string().nullable(),
  rating:    z.number(),
  isActive:  z.boolean(),
})

export type Supplier = z.infer<typeof supplierSchema>

// ── Product / Part ────────────────────────────────────────────────────────────

export const productSchema = z.object({
  id:            z.string().uuid(),
  partNumber:    z.string(),
  sku:           z.string().nullable(),
  oem:           z.string().nullable(),
  name:          z.string(),
  description:   z.string().nullable(),
  brand:         z.string(),
  category:      z.string().nullable(),
  type:          productTypeSchema,
  compatibility: z.string().nullable(),
  imageUrl:      z.string().url().nullable(),
  imageIcon:     z.string().nullable(),
  createdAt:     z.string().datetime(),
  updatedAt:     z.string().datetime(),
})

export type Product = z.infer<typeof productSchema>

// ── Offer ─────────────────────────────────────────────────────────────────────

export const offerSchema = z.object({
  id:          z.string().uuid(),
  partId:      z.string().uuid(),
  supplierId:  z.string().uuid(),
  price:       z.number().positive(),
  currency:    z.string().default('RUB'),
  stockStatus: stockStatusSchema,
  deliveryDays: z.number().int().min(1),
  externalSku: z.string().nullable(),
  supplier:    supplierSchema.optional(),
})

export type Offer = z.infer<typeof offerSchema>

// ── Product with offers ───────────────────────────────────────────────────────

export const productWithOffersSchema = productSchema.extend({
  offers: z.array(offerSchema),
})

export type ProductWithOffers = z.infer<typeof productWithOffersSchema>

// ── Search ────────────────────────────────────────────────────────────────────

export const productSearchSchema = z.object({
  query:    z.string().optional(),
  model:    z.string().optional(),
  year:     z.coerce.number().int().min(1990).max(2030).optional(),
  brand:    z.string().optional(),
  category: z.string().optional(),
  type:     productTypeSchema.optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  delivery: z.coerce.number().int().min(1).optional(),
  sort:     z.enum(['price-asc', 'price-desc', 'delivery', 'popular']).default('price-asc'),
  page:     z.coerce.number().int().min(1).default(1),
  limit:    z.coerce.number().int().min(1).max(100).default(20),
})

export type ProductSearch = z.infer<typeof productSearchSchema>

export const productListResponseSchema = z.object({
  items: z.array(productWithOffersSchema),
  total: z.number().int(),
  page:  z.number().int(),
  limit: z.number().int(),
})

export type ProductListResponse = z.infer<typeof productListResponseSchema>
