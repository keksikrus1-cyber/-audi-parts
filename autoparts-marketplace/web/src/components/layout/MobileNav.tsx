import { Link, useRouterState } from '@tanstack/react-router'

const NAV_LINKS = [
  { label: 'Главная',  to: '/' },
  { label: 'Каталог',  to: '/catalog' },
  { label: 'Модели',   to: '/models' },
  { label: 'Разборки', to: '/salvage' },
  { label: 'Для СТО',  to: '/sto' },
] as const

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const { location } = useRouterState()

  return (
    <>
      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 240 }}
          onClick={onClose}
        />
      )}
      <div className={`ap-mobile-nav${open ? ' open' : ''}`}>
        <div className="ap-mobile-nav-header">
          <span className="ap-logo-text">Audi<span>Parts</span></span>
          <button onClick={onClose} style={{ fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={location.pathname === to ? 'active' : ''}
            onClick={onClose}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
