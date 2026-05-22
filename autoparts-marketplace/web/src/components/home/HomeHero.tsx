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
        <p className="ap-text-secondary" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Агрегатор запчастей для всех моделей Audi. Сравниваем цены от Exist.ru, Emex.ru, Autodoc и Avtoall в одном месте.
        </p>
        <div className="ap-hero-stats">
          {STATS.map(s => (
            <div key={s.label} className="ap-stat-card">
              <div className="ap-mono" style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--ap-accent)' }}>{s.value}</div>
              <div className="ap-text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}
