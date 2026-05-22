import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { AUDI_MODEL_NAMES, YEARS } from '@/data/audiModels'
import { decodeAudiVin, type VinDecodeResult } from '@/lib/vin/mockVinDecoder'

type Tab = 'query' | 'vin' | 'article'

export function SearchForm() {
  const [tab, setTab] = useState<Tab>('query')
  const [query, setQuery] = useState('')
  const [vin, setVin] = useState('')
  const [article, setArticle] = useState('')
  const [vinResult, setVinResult] = useState<VinDecodeResult | null>(null)
  const navigate = useNavigate()

  const handleDecode = () => {
    setVinResult(decodeAudiVin(vin))
  }

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
              <input className="ap-input" type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Например: тормозные колодки, масло, фильтр..." />
              <button className="ap-btn ap-btn-primary" onClick={() => console.log('search:', query)}>НАЙТИ</button>
            </div>
          </div>
          <div className="ap-search-row">
            <div>
              <label>Модель Audi</label>
              <select className="ap-select">
                <option value="">Выберите модель</option>
                {AUDI_MODEL_NAMES.map(m => <option key={m} value={m}>Audi {m}</option>)}
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
        <div>
          <div className="ap-search-input-group">
            <label>VIN номер (17 символов)</label>
            <div className="ap-search-input-row">
              <input
                className="ap-input ap-mono"
                type="text"
                value={vin}
                onChange={e => { setVin(e.target.value.toUpperCase()); setVinResult(null) }}
                placeholder="WAUZZZ8K9BA123456"
                maxLength={17}
              />
              <button className="ap-btn ap-btn-primary" onClick={handleDecode}>ДЕКОДИРОВАТЬ</button>
            </div>
          </div>

          {vinResult && !vinResult.ok && (
            <div className="ap-vin-result ap-vin-result-error">
              ❌ {vinResult.error}
            </div>
          )}

          {vinResult?.ok && (
            <div className="ap-vin-result">
              <div className="ap-vin-number ap-mono">{vinResult.data.vin}</div>
              <div className="ap-vin-result-grid">
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Производитель</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.manufacturer}</div>
                </div>
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Модель</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.model}</div>
                </div>
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Год выпуска</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.year}</div>
                </div>
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Кузов</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.bodyType}</div>
                </div>
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Поколение</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.generation}</div>
                </div>
                <div className="ap-vin-result-item">
                  <div className="ap-text-muted" style={{ fontSize: '0.75rem' }}>Завод</div>
                  <div style={{ fontWeight: 500 }}>{vinResult.data.plant}</div>
                </div>
              </div>
              {vinResult.data.engines.length > 0 && (
                <div className="ap-vin-tags">
                  {vinResult.data.engines.map(e => (
                    <span key={e} className="ap-vin-tag">{e}</span>
                  ))}
                </div>
              )}
              <button
                className="ap-btn ap-btn-primary"
                style={{ marginTop: '1rem', width: '100%' }}
                onClick={() => void navigate({ to: '/catalog' })}
              >
                Найти запчасти для этого автомобиля
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'article' && (
        <div className="ap-search-input-group">
          <label>Артикул запчасти</label>
          <div className="ap-search-input-row">
            <input className="ap-input" type="text" value={article} onChange={e => setArticle(e.target.value)} placeholder="Например: 8K0698151, P85075, W712/35" />
            <button className="ap-btn ap-btn-primary" onClick={() => console.log('article:', article)}>НАЙТИ</button>
          </div>
        </div>
      )}
    </div>
  )
}
