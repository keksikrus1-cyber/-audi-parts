const STATS = [
  { value: '2.4M+', label: 'Артикулов' },
  { value: '24',    label: 'Поставщика' },
  { value: 'от 1 дня', label: 'Доставка' },
  { value: '47',    label: 'Поколений Audi' },
]

export function HomeHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="ap-hero">
      <div className="ap-hero-content">
        <h1 className="ap-heading-xl" style={{ marginBottom: '1.5rem' }}>
          Найдите лучшую цену на{' '}
          <span style={{ color: 'var(--ap-accent)' }}>любую запчасть</span> Audi
        </h1>
        <p className="ap-hero-description">
          Агрегатор запчастей для всех моделей Audi. Сравниваем цены от Exist.ru, Emex.ru, Autodoc и Avtoall в одном месте.
        </p>
        <div className="ap-hero-stats">
          {STATS.map(s => (
            <div key={s.label} className="ap-stat-card">
              <div className="ap-stat-value">{s.value}</div>
              <div className="ap-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
