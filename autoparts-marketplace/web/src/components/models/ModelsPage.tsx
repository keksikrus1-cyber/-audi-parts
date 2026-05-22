import { useState, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AUDI_MODELS, type ModelType } from '@/data/audiModels'
import { ModelFilterChips } from './ModelFilterChips'
import { ModelAccordion } from './ModelAccordion'
import { SelectedModelBanner, type SelectedGen } from './SelectedModelBanner'

export function ModelsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ModelType | 'all'>('all')
  const [selected, setSelected] = useState<SelectedGen | null>(null)
  const navigate = useNavigate()

  const models = useMemo(() => {
    const q = search.toLowerCase()
    return AUDI_MODELS.filter(m => {
      const matchesFilter = filter === 'all' || m.types.includes(filter)
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })
  }, [search, filter])

  return (
    <div className="ap-models-page">
      <div className="ap-models-header">
        <div className="ap-models-search">
          <input
            className="ap-input"
            type="text"
            placeholder="Поиск модели..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '250px', maxWidth: '400px' }}
          />
          <ModelFilterChips active={filter} onChange={setFilter} />
        </div>

        <SelectedModelBanner
          selection={selected}
          onFindParts={() => { console.log('findParts', selected); void navigate({ to: '/catalog' }) }}
        />
      </div>

      <div className="ap-models-list">
        {models.map(m => (
          <ModelAccordion
            key={m.id}
            model={m}
            selectedGen={selected}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  )
}
