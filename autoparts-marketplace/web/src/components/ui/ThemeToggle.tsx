import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem('ap-theme') as Theme) ?? 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('ap-theme', theme)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => { applyTheme(theme) }, [theme])

  return (
    <div className="ap-theme-toggle">
      <button
        className={theme === 'dark' ? 'active' : ''}
        onClick={() => setTheme('dark')}
        title="Тёмная"
      >🌙</button>
      <button
        className={theme === 'light' ? 'active' : ''}
        onClick={() => setTheme('light')}
        title="Светлая"
      >☀️</button>
    </div>
  )
}
