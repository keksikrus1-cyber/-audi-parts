import { useState } from 'react'
import type { AudiModel } from '@/data/audiModels'
import { GenerationCard } from './GenerationCard'
import type { SelectedGen } from './SelectedModelBanner'

interface ModelAccordionProps {
  model: AudiModel
  selectedGen: SelectedGen | null
  onSelect: (s: SelectedGen) => void
}

export function ModelAccordion({ model, selectedGen, onSelect }: ModelAccordionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`ap-model-item${open ? ' open' : ''}`}>
      <div className="ap-model-header" onClick={() => setOpen(o => !o)}>
        <div className="ap-model-icon">🚗</div>
        <div className="ap-model-title">
          <h3 className="ap-heading-md">{model.name}</h3>
          <span className="ap-text-muted">{model.generations.length} поколений • {model.yearsRange}</span>
        </div>
        <div className="ap-model-stats">
          <div className="ap-mono" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--ap-accent)' }}>
            {model.totalParts}
          </div>
          <div className="ap-text-muted" style={{ fontSize: '0.7rem' }}>запчастей</div>
        </div>
        <div className="ap-model-arrow">▼</div>
      </div>

      {open && (
        <div className="ap-model-generations">
          <div className="ap-generations-grid">
            {model.generations.map(gen => (
              <GenerationCard
                key={gen.code}
                model={model}
                gen={gen}
                selected={selectedGen?.model.id === model.id && selectedGen?.gen.code === gen.code}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
