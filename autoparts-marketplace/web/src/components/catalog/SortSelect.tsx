type SortValue = 'price-asc' | 'price-desc' | 'delivery' | 'popular'

interface SortSelectProps {
  value: SortValue
  onChange: (v: SortValue) => void
}

const OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'price-asc',  label: 'Дешевле' },
  { value: 'price-desc', label: 'Дороже' },
  { value: 'delivery',   label: 'Быстрее доставка' },
  { value: 'popular',    label: 'Популярность' },
]

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="ap-select"
      style={{ minWidth: '160px', width: 'auto' }}
      value={value}
      onChange={e => onChange(e.target.value as SortValue)}
    >
      {OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

export type { SortValue }
