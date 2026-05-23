import { z } from 'zod'

// ── VIN ───────────────────────────────────────────────────────────────────────

export const vinDecodeInputSchema = z.object({
  vin: z.string().length(17).regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN не может содержать I, O, Q'),
})

export const decodedAudiVinSchema = z.object({
  vin:          z.string(),
  manufacturer: z.string(),
  model:        z.string(),
  year:         z.union([z.number().int(), z.string()]),
  bodyType:     z.string(),
  generation:   z.string(),
  platform:     z.string(),
  plant:        z.string(),
  engines:      z.array(z.string()),
})

export const vinDecodeResultSchema = z.discriminatedUnion('ok', [
  z.object({ ok: z.literal(true),  data:  decodedAudiVinSchema }),
  z.object({ ok: z.literal(false), error: z.string() }),
])

export type VinDecodeInput = z.infer<typeof vinDecodeInputSchema>
export type DecodedAudiVin = z.infer<typeof decodedAudiVinSchema>
export type VinDecodeResult = z.infer<typeof vinDecodeResultSchema>
