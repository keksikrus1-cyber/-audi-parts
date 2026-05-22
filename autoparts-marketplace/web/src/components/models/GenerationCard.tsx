import type { AudiGeneration, AudiModel } from '@/data/audiModels'
import type { SelectedGen } from './SelectedModelBanner'

interface GenerationCardProps {
  model: AudiModel
  gen: AudiGeneration
  selected: boolean
  onSelect: (s: SelectedGen) => void
}

export function GenerationCard({ model, gen, selected, onSelect }: GenerationCardProps) {
  return (
    <div
      className={`ap-generation-card${selected ? ' selected' : ''}`}
      onClick={() => onSelect({ model, gen })}
    >
      <div className="ap-gen-code">{gen.code}</div>
      <div className="ap-gen-info">
        <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{model.id} {gen.code}</h4>
        <div className="ap-text-secondary" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{gen.years}</div>
        <div className="ap-gen-tags">
          {[...gen.body, ...gen.engines].map(t => (
            <span key={t} className="ap-gen-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="ap-gen-parts">
        <div className="ap-mono" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{gen.parts}</div>
        <div className="ap-text-muted" style={{ fontSize: '0.7rem' }}>запчастей</div>
        <button
          className="ap-gen-select-btn"
          onClick={e => { e.stopPropagation(); onSelect({ model, gen }) }}
        >
          Выбрать
        </button>
      </div>
    </div>
  )
}
