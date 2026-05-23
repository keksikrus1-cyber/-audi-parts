import { z } from 'zod'
import { orderStatusSchema } from './marketplace'

// ── Order ─────────────────────────────────────────────────────────────────────

export const orderItemSchema = z.object({
  id:            z.string().uuid(),
  partId:        z.string().uuid(),
  offerId:       z.string().uuid().nullable(),
  supplierId:    z.string().uuid().nullable(),
  nameSnapshot:  z.string(),
  skuSnapshot:   z.string(),
  brandSnapshot: z.string(),
  priceSnapshot: z.number(),
  quantity:      z.number().int().min(1),
})

export const orderSchema = z.object({
  id:             z.string().uuid(),
  status:         orderStatusSchema,
  subtotal:       z.number(),
  deliveryAmount: z.number(),
  total:          z.number(),
  currency:       z.string().default('RUB'),
  address:        z.string().nullable(),
  items:          z.array(orderItemSchema),
  createdAt:      z.string().datetime(),
  updatedAt:      z.string().datetime(),
})

export const createOrderInputSchema = z.object({
  address: z.string().min(10).optional(),
})

export type OrderItem = z.infer<typeof orderItemSchema>
export type Order = z.infer<typeof orderSchema>
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>
