import type { AudiModel, AudiGeneration } from '@/data/audiModels'

interface SelectedGen { model: AudiModel; gen: AudiGeneration }

interface SelectedModelBannerProps {
  selection: SelectedGen | null
  onFindParts: () => void
}

export function SelectedModelBanner({ selection, onFindParts }: SelectedModelBannerProps) {
  if (!selection) return null
  const { model, gen } = selection
  return (
    <div className="ap-selected-model">
      <div>
        <h3 className="ap-heading-md" style={{ marginBottom: '0.5rem' }}>
          {model.name} {gen.code} ({gen.years})
        </h3>
        <p style={{ opacity: 0.9, fontSize: '0.9rem' }}>
          {gen.body.join(' • ')} • {gen.parts} запчастей
        </p>
      </div>
      <button className="ap-btn ap-btn-primary" onClick={onFindParts}>
        Найти запчасти
      </button>
    </div>
  )
}

export type { SelectedGen }
