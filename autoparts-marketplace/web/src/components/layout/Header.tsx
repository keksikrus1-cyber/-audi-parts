import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useCart } from '@/components/cart/CartProvider'
import { MobileNav } from './MobileNav'

const NAV_LINKS = [
  { label: 'Главная',  to: '/' },
  { label: 'Каталог',  to: '/catalog' },
  { label: 'Модели',   to: '/models' },
  { label: 'Разборки', to: '/salvage' },
  { label: 'Для СТО',  to: '/sto' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { location } = useRouterState()
  const { count, setOpen } = useCart()

  return (
    <>
      <header className="ap-header">
        <div className="ap-header-inner">
          <Link to="/" className="ap-logo">
            <div className="ap-logo-rings">
              <div className="ap-ring" />
              <div className="ap-ring" />
              <div className="ap-ring" />
              <div className="ap-ring" />
            </div>
            <div className="ap-logo-text">Audi<span>Parts</span></div>
          </Link>

          <nav className="ap-nav-desktop">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className={`ap-nav-link${location.pathname === to ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="ap-header-actions">
            <ThemeToggle />
            <button className="ap-icon-btn" title="Уведомления">
              🔔<span className="ap-badge ap-badge-accent" style={{ position: 'absolute', top: '-4px', right: '-4px', minWidth: '18px', textAlign: 'center' }}>3</span>
            </button>
            <button className="ap-icon-btn" title="Избранное">♡</button>
            <button className="ap-icon-btn" title="Корзина" onClick={() => setOpen(true)}>
              🛒
              {count > 0 && (
                <span className="ap-badge ap-badge-accent" style={{ position: 'absolute', top: '-4px', right: '-4px', minWidth: '18px', textAlign: 'center' }}>
                  {count}
                </span>
              )}
            </button>
            <button className="ap-btn ap-btn-primary ap-btn-small">Войти</button>
            <button className="ap-hamburger" onClick={() => setMobileOpen(true)}>☰</button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
