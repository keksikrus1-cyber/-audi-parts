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
        <h4 className="ap-gen-title">{model.id} {gen.code}</h4>
        <div className="ap-gen-years">{gen.years}</div>
        <div className="ap-gen-tags">
          {[...gen.body, ...gen.engines].map(t => (
            <span key={t} className="ap-gen-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="ap-gen-parts">
        <div className="ap-gen-count">{gen.parts}</div>
        <div className="ap-gen-count-label">запчастей</div>
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
