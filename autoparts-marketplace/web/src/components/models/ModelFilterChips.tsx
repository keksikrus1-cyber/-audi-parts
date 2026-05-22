import type { ModelType } from '@/data/audiModels'

const CHIPS: { value: ModelType | 'all'; label: string }[] = [
  { value: 'all',       label: 'Все' },
  { value: 'sedan',     label: 'Седаны' },
  { value: 'crossover', label: 'Кроссоверы' },
  { value: 'sport',     label: 'Спорт' },
  { value: 'electric',  label: 'Электро' },
]

interface ModelFilterChipsProps {
  active: ModelType | 'all'
  onChange: (v: ModelType | 'all') => void
}

export function ModelFilterChips({ active, onChange }: ModelFilterChipsProps) {
  return (
    <div className="ap-filter-chips">
      {CHIPS.map(c => (
        <button
          key={c.value}
          className={`ap-filter-chip${active === c.value ? ' active' : ''}`}
          onClick={() => onChange(c.value)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
