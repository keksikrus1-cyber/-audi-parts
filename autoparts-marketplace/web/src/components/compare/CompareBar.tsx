import { useLocalUi } from '@/components/local-ui/LocalUiProvider'

export function CompareBar() {
  const { compareIds, clearCompare, setCompareModalOpen } = useLocalUi()
  if (compareIds.length < 2) return null

  return (
    <div className="ap-compare-bar">
      <div className="ap-compare-bar-info">
        <span>Сравниваете <strong style={{ color: 'var(--ap-accent)' }}>{compareIds.length}</strong> товара</span>
      </div>
      <div className="ap-compare-bar-actions">
        <button className="ap-btn ap-btn-secondary ap-btn-small" onClick={clearCompare}>Очистить</button>
        <button className="ap-btn ap-btn-primary ap-btn-small" onClick={() => setCompareModalOpen(true)}>Сравнить</button>
      </div>
    </div>
  )
}
