import { useState } from 'react'

type Tab = 'query' | 'vin' | 'article'

const MODELS = ['A1','A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','TT','RS6','e-tron']
const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i)

export function SearchForm() {
  const [tab, setTab] = useState<Tab>('query')
  const [query, setQuery] = useState('')
  const [vin, setVin] = useState('')
  const [article, setArticle] = useState('')

  return (
    <div className="ap-search-form">
      <div className="ap-search-tabs">
        {(['query', 'vin', 'article'] as Tab[]).map(t => (
          <button
            key={t}
            className={`ap-search-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'query' ? 'По запросу' : t === 'vin' ? 'По VIN' : 'Артикул'}
          </button>
        ))}
      </div>

      {tab === 'query' && (
        <div>
          <div className="ap-search-input-group">
            <label>Название запчасти</label>
            <div className="ap-search-input-row">
              <input
                className="ap-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Например: тормозные колодки, масло, фильтр..."
              />
              <button
                className="ap-btn ap-btn-primary"
                onClick={() => console.log('search:', query)}
              >НАЙТИ</button>
            </div>
          </div>
          <div className="ap-search-row">
            <div>
              <label>Модель Audi</label>
              <select className="ap-select">
                <option value="">Выберите модель</option>
                {MODELS.map(m => <option key={m} value={m}>Audi {m}</option>)}
              </select>
            </div>
            <div>
              <label>Год выпуска</label>
              <select className="ap-select">
                <option value="">Год</option>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {tab === 'vin' && (
        <div className="ap-search-input-group">
          <label>VIN номер (17 символов)</label>
          <div className="ap-search-input-row">
            <input
              className="ap-input ap-mono"
              type="text"
              value={vin}
              onChange={e => setVin(e.target.value.toUpperCase())}
              placeholder="WAUZZZ8K9BA123456"
              maxLength={17}
            />
            <button
              className="ap-btn ap-btn-primary"
              onClick={() => console.log('vin:', vin)}
            >ДЕКОДИРОВАТЬ</button>
          </div>
        </div>
      )}

      {tab === 'article' && (
        <div className="ap-search-input-group">
          <label>Артикул запчасти</label>
          <div className="ap-search-input-row">
            <input
              className="ap-input"
              type="text"
              value={article}
              onChange={e => setArticle(e.target.value)}
              placeholder="Например: 8K0698151, P85075, W712/35"
            />
            <button
              className="ap-btn ap-btn-primary"
              onClick={() => console.log('article:', article)}
            >НАЙТИ</button>
          </div>
        </div>
      )}
    </div>
  )
}
