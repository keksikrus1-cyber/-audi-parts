import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

function loadSet(key: string): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(key) ?? '[]')) } catch { return new Set() }
}
function saveSet(key: string, s: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...s]))
}

interface LocalUiCtx {
  favorites: Set<string>
  toggleFavorite: (id: string) => void
  compareIds: string[]
  toggleCompare: (id: string) => void
  clearCompare: () => void
  compareModalOpen: boolean
  setCompareModalOpen: (v: boolean) => void
}

const Ctx = createContext<LocalUiCtx | null>(null)

export function LocalUiProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(() => loadSet('ap-favorites'))
  const [compareIds, setCompareIds] = useState<string[]>(() => [...loadSet('ap-compare')])
  const [compareModalOpen, setCompareModalOpen] = useState(false)

  useEffect(() => { saveSet('ap-favorites', favorites) }, [favorites])
  useEffect(() => { saveSet('ap-compare', new Set(compareIds)) }, [compareIds])

  const toggleFavorite = (id: string) =>
    setFavorites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const toggleCompare = (id: string) =>
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )

  const clearCompare = () => { setCompareIds([]); setCompareModalOpen(false) }

  return (
    <Ctx.Provider value={{ favorites, toggleFavorite, compareIds, toggleCompare, clearCompare, compareModalOpen, setCompareModalOpen }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLocalUi() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLocalUi must be used inside LocalUiProvider')
  return ctx
}
