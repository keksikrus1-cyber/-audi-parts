import { z } from 'zod'
import { productSchema, offerSchema } from './marketplace'

// ── Cart ──────────────────────────────────────────────────────────────────────

export const cartItemSchema = z.object({
  id:       z.string().uuid(),
  partId:   z.string().uuid(),
  offerId:  z.string().uuid().nullable(),
  quantity: z.number().int().min(1),
  product:  productSchema.optional(),
  offer:    offerSchema.optional(),
})

export const addToCartInputSchema = z.object({
  partId:   z.string().uuid(),
  offerId:  z.string().uuid().optional(),
  quantity: z.number().int().min(1).default(1),
})

export const updateCartItemInputSchema = z.object({
  quantity: z.number().int().min(0),
})

export const cartSummarySchema = z.object({
  items:          z.array(cartItemSchema),
  subtotal:       z.number(),
  deliveryAmount: z.number(),
  total:          z.number(),
  currency:       z.string().default('RUB'),
})

export type CartItem = z.infer<typeof cartItemSchema>
export type AddToCartInput = z.infer<typeof addToCartInputSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemInputSchema>
export type CartSummary = z.infer<typeof cartSummarySchema>

// ── Favorites ─────────────────────────────────────────────────────────────────

export const favoriteItemSchema = z.object({
  id:        z.string().uuid(),
  partId:    z.string().uuid(),
  createdAt: z.string().datetime(),
  product:   productSchema.optional(),
})

export const toggleFavoriteInputSchema = z.object({
  partId: z.string().uuid(),
})

export type FavoriteItem = z.infer<typeof favoriteItemSchema>
export type ToggleFavoriteInput = z.infer<typeof toggleFavoriteInputSchema>
