/**
 * AudiParts seed — mock data from web/src/data/*
 *
 * Safe to run multiple times (upsert everywhere, no deleteMany).
 * Requires: docker compose up -d postgres && bun run --cwd backend prisma:migrate
 * Run with: bun run --cwd backend prisma:seed
 */

import { PrismaClient, ProductType, StockStatus } from '../src/generated/prisma'
import { hashSync } from 'crypto'

const prisma = new PrismaClient()

// ── helpers ──────────────────────────────────────────────────────────────────

function fakePasswordHash(email: string) {
  // Not a real password — seed accounts are for dev only
  return `seed_hash_${email}`
}

// ── data ─────────────────────────────────────────────────────────────────────

const SUPPLIER_USERS = [
  { email: 'seed-exist@auditparts.dev',   name: 'Exist.ru',   shortCode: 'EX', rating: 4.2 },
  { email: 'seed-emex@auditparts.dev',    name: 'Emex.ru',    shortCode: 'EM', rating: 4.8 },
  { email: 'seed-autodoc@auditparts.dev', name: 'Autodoc',    shortCode: 'AU', rating: 3.4 },
  { email: 'seed-avtoall@auditparts.dev', name: 'Avtoall.ru', shortCode: 'AV', rating: 3.1 },
]

const CATEGORIES = [
  { slug: 'brakes',      name: 'Тормоза' },
  { slug: 'suspension',  name: 'Подвеска' },
  { slug: 'filters',     name: 'Фильтры' },
  { slug: 'oils',        name: 'Масла' },
  { slug: 'electronics', name: 'Электроника' },
  { slug: 'body',        name: 'Кузов' },
  { slug: 'engine',      name: 'Двигатель' },
  { slug: 'gearbox',     name: 'КПП' },
]

const PARTS = [
  { sku: 'P85075',      brand: 'Brembo',      name: 'Тормозные колодки P85075',    type: ProductType.ANALOG,   categorySlug: 'brakes',     compat: 'A4 B8, A5 Q5',        icon: '🛑' },
  { sku: '8K0698151F',  brand: 'Audi VAG',    name: 'Тормозные колодки 8K0698151F', type: ProductType.ORIGINAL, categorySlug: 'brakes',     compat: 'A4 B8',               icon: '🛑' },
  { sku: 'W712/35',     brand: 'MANN-FILTER', name: 'Масляный фильтр W712/35',     type: ProductType.ANALOG,   categorySlug: 'filters',    compat: 'A3, A4, A6, Q5, Q7', icon: '🔧' },
  { sku: '22-153694',   brand: 'Bilstein',    name: 'Амортизатор 22-153694',       type: ProductType.ANALOG,   categorySlug: 'suspension', compat: 'A6 C7, A7',           icon: '🔩' },
  { sku: 'IZFR6K-13',   brand: 'NGK',         name: 'Свеча зажигания IZFR6K-13',  type: ProductType.ANALOG,   categorySlug: 'electronics', compat: 'A4, A5, Q5 2.0 TFSI', icon: '⚡' },
  { sku: '32801 01',    brand: 'Lemförder',   name: 'Рычаг подвески 32801 01',     type: ProductType.ANALOG,   categorySlug: 'suspension', compat: 'A4 B8, A5, Q5',       icon: '🔩' },
]

// Offers: price per supplier per part (from priceComparison + reasonable mock prices)
const OFFERS: { partSku: string; supplierCode: string; price: number; deliveryDays: number; stock: number; stockStatus: StockStatus }[] = [
  // Brembo P85075 — from priceComparison
  { partSku: 'P85075', supplierCode: 'EX', price: 3200,  deliveryDays: 1, stock: 15, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'P85075', supplierCode: 'EM', price: 3450,  deliveryDays: 2, stock: 8,  stockStatus: StockStatus.IN_STOCK },
  { partSku: 'P85075', supplierCode: 'AU', price: 3720,  deliveryDays: 3, stock: 5,  stockStatus: StockStatus.IN_STOCK },
  { partSku: 'P85075', supplierCode: 'AV', price: 4100,  deliveryDays: 4, stock: 0,  stockStatus: StockStatus.ORDER_ONLY },
  // Audi VAG 8K0698151F
  { partSku: '8K0698151F', supplierCode: 'EX', price: 7800,  deliveryDays: 2, stock: 3,  stockStatus: StockStatus.IN_STOCK },
  { partSku: '8K0698151F', supplierCode: 'EM', price: 8100,  deliveryDays: 3, stock: 2,  stockStatus: StockStatus.IN_STOCK },
  // MANN-FILTER W712/35
  { partSku: 'W712/35', supplierCode: 'EX', price: 680,   deliveryDays: 1, stock: 30, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'W712/35', supplierCode: 'EM', price: 720,   deliveryDays: 1, stock: 20, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'W712/35', supplierCode: 'AU', price: 695,   deliveryDays: 2, stock: 12, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'W712/35', supplierCode: 'AV', price: 750,   deliveryDays: 2, stock: 8,  stockStatus: StockStatus.IN_STOCK },
  // Bilstein 22-153694
  { partSku: '22-153694', supplierCode: 'EX', price: 12500, deliveryDays: 3, stock: 4,  stockStatus: StockStatus.IN_STOCK },
  { partSku: '22-153694', supplierCode: 'EM', price: 13200, deliveryDays: 4, stock: 2,  stockStatus: StockStatus.IN_STOCK },
  { partSku: '22-153694', supplierCode: 'AV', price: 14000, deliveryDays: 5, stock: 0,  stockStatus: StockStatus.ORDER_ONLY },
  // NGK IZFR6K-13
  { partSku: 'IZFR6K-13', supplierCode: 'EX', price: 890,   deliveryDays: 1, stock: 25, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'IZFR6K-13', supplierCode: 'EM', price: 920,   deliveryDays: 1, stock: 18, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'IZFR6K-13', supplierCode: 'AU', price: 870,   deliveryDays: 2, stock: 10, stockStatus: StockStatus.IN_STOCK },
  { partSku: 'IZFR6K-13', supplierCode: 'AV', price: 950,   deliveryDays: 2, stock: 6,  stockStatus: StockStatus.IN_STOCK },
  // Lemförder 32801 01
  { partSku: '32801 01', supplierCode: 'EX', price: 4300,  deliveryDays: 2, stock: 7,  stockStatus: StockStatus.IN_STOCK },
  { partSku: '32801 01', supplierCode: 'EM', price: 4550,  deliveryDays: 3, stock: 4,  stockStatus: StockStatus.IN_STOCK },
  { partSku: '32801 01', supplierCode: 'AV', price: 4800,  deliveryDays: 4, stock: 0,  stockStatus: StockStatus.ORDER_ONLY },
]

// ── seed ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Seeding AudiParts mock data...')

  // 1. Categories
  const categoryMap = new Map<string, string>()
  for (const cat of CATEGORIES) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    })
    categoryMap.set(cat.slug, record.id)
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`)

  // 2. Supplier users + suppliers
  const supplierMap = new Map<string, string>() // shortCode → supplierId
  for (const s of SUPPLIER_USERS) {
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        passwordHash: fakePasswordHash(s.email),
        displayName: s.name,
        role: 'SUPPLIER',
      },
    })
    const supplier = await prisma.supplier.upsert({
      where: { userId: user.id },
      update: { name: s.name, shortCode: s.shortCode, rating: s.rating, isVerified: true },
      create: {
        userId: user.id,
        name: s.name,
        shortCode: s.shortCode,
        rating: s.rating,
        isVerified: true,
        isActive: true,
      },
    })
    supplierMap.set(s.shortCode, supplier.id)
  }
  console.log(`  ✓ ${SUPPLIER_USERS.length} suppliers`)

  // 3. Parts (owned by Exist.ru supplier as primary)
  const existSupplierId = supplierMap.get('EX')!
  const partMap = new Map<string, string>() // sku → partId
  for (const p of PARTS) {
    const categoryId = categoryMap.get(p.categorySlug)
    const part = await prisma.part.upsert({
      where: { supplierId_partNumber: { supplierId: existSupplierId, partNumber: p.sku } },
      update: { name: p.name, brand: p.brand, sku: p.sku, type: p.type, compatibility: p.compat, imageIcon: p.icon },
      create: {
        supplierId: existSupplierId,
        categoryId,
        name: p.name,
        brand: p.brand,
        partNumber: p.sku,
        sku: p.sku,
        type: p.type,
        isOriginal: p.type === ProductType.ORIGINAL,
        compatibility: p.compat,
        imageIcon: p.icon,
      },
    })
    partMap.set(p.sku, part.id)
  }
  console.log(`  ✓ ${PARTS.length} parts`)

  // 4. Offers
  let offerCount = 0
  for (const o of OFFERS) {
    const partId = partMap.get(o.partSku)
    const supplierId = supplierMap.get(o.supplierCode)
    if (!partId || !supplierId) continue
    await prisma.offer.upsert({
      where: { partId_supplierId: { partId, supplierId } },
      update: { price: o.price, deliveryDays: o.deliveryDays, stock: o.stock, stockStatus: o.stockStatus },
      create: { partId, supplierId, price: o.price, deliveryDays: o.deliveryDays, stock: o.stock, stockStatus: o.stockStatus },
    })
    offerCount++
  }
  console.log(`  ✓ ${offerCount} offers`)

  console.log('Done.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
