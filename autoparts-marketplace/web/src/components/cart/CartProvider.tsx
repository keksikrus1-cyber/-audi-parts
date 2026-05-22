import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { CartItem } from './cart-types'

const LS_KEY = 'ap-cart'

function load(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]') } catch { return [] }
}

interface CartCtx {
  items: CartItem[]
  open: boolean
  setOpen: (v: boolean) => void
  add: (item: Omit<CartItem, 'qty'>) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  total: number
  count: number
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)
  const [open, setOpen] = useState(false)

  useEffect(() => { localStorage.setItem(LS_KEY, JSON.stringify(items)) }, [items])

  const add = (item: Omit<CartItem, 'qty'>) =>
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      return existing
        ? prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...item, qty: 1 }]
    })

  const setQty = (id: string, qty: number) =>
    setItems(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i))

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return <Ctx.Provider value={{ items, open, setOpen, add, setQty, remove, total, count }}>{children}</Ctx.Provider>
}

export function useCart() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
