export type ModelType = 'sedan' | 'crossover' | 'sport' | 'electric'

export interface AudiGeneration {
  code: string
  years: string
  body: string[]
  engines: string[]
  parts: string
}

export interface AudiModel {
  id: string
  name: string
  types: ModelType[]
  yearsRange: string
  totalParts: string
  generations: AudiGeneration[]
}

export const AUDI_MODELS: AudiModel[] = [
  {
    id: 'A1', name: 'Audi A1', types: ['sport'], yearsRange: '2010–н.в.', totalParts: '18 400',
    generations: [
      { code: '8X', years: '2010–2018', body: ['3-дв хэтчбек', '5-дв Sportback'], engines: ['1.2 TFSI', '1.4 TFSI'], parts: '9.2K' },
      { code: 'GB', years: '2018–н.в.', body: ['5-дв Sportback'],                  engines: ['1.0 TFSI', '1.5 TFSI'], parts: '9.2K' },
    ],
  },
  {
    id: 'A3', name: 'Audi A3', types: ['sedan', 'sport'], yearsRange: '1996–н.в.', totalParts: '42 100',
    generations: [
      { code: '8L', years: '1996–2003', body: ['3-дв', '5-дв'],                          engines: ['1.6', '1.8'],              parts: '8.6K' },
      { code: '8P', years: '2003–2012', body: ['3-дв', 'Sportback', 'Cabrio'],            engines: ['2.0 FSI', '2.0 TFSI'],     parts: '12.4K' },
      { code: '8V', years: '2012–2020', body: ['3-дв', 'Sportback', 'Седан'],             engines: ['1.0 TFSI', '1.4 TFSI'],    parts: '13.8K' },
      { code: '8Y', years: '2020–н.в.', body: ['Sportback', 'Седан'],                     engines: ['1.0 TFSI', '1.5 TFSI'],    parts: '7.3K' },
    ],
  },
  {
    id: 'A4', name: 'Audi A4', types: ['sedan'], yearsRange: '1994–2023', totalParts: '68 500',
    generations: [
      { code: 'B5', years: '1994–2001', body: ['Седан', 'Avant'],                         engines: ['1.6', '1.8T'],             parts: '9.8K' },
      { code: 'B6', years: '2000–2006', body: ['Седан', 'Avant', 'Cabrio'],               engines: ['1.8T', '2.0 FSI'],         parts: '11.2K' },
      { code: 'B7', years: '2004–2008', body: ['Седан', 'Avant', 'Cabrio'],               engines: ['2.0 TFSI', '3.2 FSI'],     parts: '12.8K' },
      { code: 'B8', years: '2007–2016', body: ['Седан', 'Avant', 'Allroad'],              engines: ['1.8 TFSI', '2.0 TFSI'],    parts: '17.4K' },
      { code: 'B9', years: '2015–2023', body: ['Седан', 'Avant', 'Allroad'],              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '17.3K' },
    ],
  },
  {
    id: 'A5', name: 'Audi A5', types: ['sport'], yearsRange: '2007–н.в.', totalParts: '31 200',
    generations: [
      { code: '8T', years: '2007–2016', body: ['Купе', 'Sportback', 'Cabrio'],            engines: ['1.8 TFSI', '2.0 TFSI'],    parts: '14.6K' },
      { code: 'F5', years: '2016–н.в.', body: ['Купе', 'Sportback', 'Cabrio'],            engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '16.6K' },
    ],
  },
  {
    id: 'A6', name: 'Audi A6', types: ['sedan'], yearsRange: '1994–н.в.', totalParts: '74 300',
    generations: [
      { code: 'C4', years: '1994–1997', body: ['Седан', 'Avant'],                         engines: ['1.8', '2.0', '2.6'],       parts: '8.4K' },
      { code: 'C5', years: '1997–2005', body: ['Седан', 'Avant', 'Allroad'],              engines: ['1.8T', '2.4', '2.7T'],     parts: '14.2K' },
      { code: 'C6', years: '2004–2011', body: ['Седан', 'Avant', 'Allroad'],              engines: ['2.0 TFSI', '2.8 FSI'],     parts: '18.6K' },
      { code: 'C7', years: '2011–2018', body: ['Седан', 'Avant', 'Allroad'],              engines: ['1.8 TFSI', '2.0 TFSI'],    parts: '19.8K' },
      { code: 'C8', years: '2018–н.в.', body: ['Седан', 'Avant', 'Allroad'],              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '13.3K' },
    ],
  },
  {
    id: 'A7', name: 'Audi A7', types: ['sport'], yearsRange: '2010–н.в.', totalParts: '28 900',
    generations: [
      { code: '4G', years: '2010–2018', body: ['Sportback'],                              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '14.8K' },
      { code: '4K', years: '2018–н.в.', body: ['Sportback'],                              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '14.1K' },
    ],
  },
  {
    id: 'A8', name: 'Audi A8', types: ['sedan'], yearsRange: '1994–н.в.', totalParts: '22 100',
    generations: [
      { code: 'D2', years: '1994–2002', body: ['Седан', 'Long'],                          engines: ['2.8', '3.7', '4.2'],       parts: '5.2K' },
      { code: 'D3', years: '2002–2010', body: ['Седан', 'Long'],                          engines: ['3.0 TDI', '4.2 FSI'],      parts: '6.4K' },
      { code: 'D4', years: '2009–2017', body: ['Седан', 'Long'],                          engines: ['3.0 TFSI', '4.0 TFSI'],    parts: '5.8K' },
      { code: 'D5', years: '2017–н.в.', body: ['Седан', 'Long'],                          engines: ['3.0 TFSI', '4.0 TFSI'],    parts: '4.7K' },
    ],
  },
  {
    id: 'Q3', name: 'Audi Q3', types: ['crossover'], yearsRange: '2011–н.в.', totalParts: '24 600',
    generations: [
      { code: '8U', years: '2011–2018', body: ['Кроссовер'],                              engines: ['1.4 TFSI', '2.0 TFSI'],    parts: '12.3K' },
      { code: 'F3', years: '2018–н.в.', body: ['Кроссовер', 'Sportback'],                engines: ['1.5 TFSI', '2.0 TFSI'],    parts: '12.3K' },
    ],
  },
  {
    id: 'Q5', name: 'Audi Q5', types: ['crossover'], yearsRange: '2008–н.в.', totalParts: '38 400',
    generations: [
      { code: '8R', years: '2008–2017', body: ['Кроссовер'],                              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '18.6K' },
      { code: 'FY', years: '2017–н.в.', body: ['Кроссовер', 'Sportback'],                engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '19.8K' },
    ],
  },
  {
    id: 'Q7', name: 'Audi Q7', types: ['crossover'], yearsRange: '2005–н.в.', totalParts: '29 700',
    generations: [
      { code: '4L', years: '2005–2015', body: ['Кроссовер'],                              engines: ['3.0 TDI', '3.6 FSI'],      parts: '14.2K' },
      { code: '4M', years: '2015–н.в.', body: ['Кроссовер'],                              engines: ['2.0 TFSI', '3.0 TFSI'],    parts: '15.5K' },
    ],
  },
  {
    id: 'Q8', name: 'Audi Q8', types: ['crossover'], yearsRange: '2018–н.в.', totalParts: '14 200',
    generations: [
      { code: '4M', years: '2018–н.в.', body: ['Кроссовер'],                              engines: ['3.0 TFSI', '4.0 TFSI'],    parts: '14.2K' },
    ],
  },
  {
    id: 'TT', name: 'Audi TT', types: ['sport'], yearsRange: '1998–2023', totalParts: '19 800',
    generations: [
      { code: '8N', years: '1998–2006', body: ['Купе', 'Roadster'],                       engines: ['1.8T', '3.2 VR6'],         parts: '6.2K' },
      { code: '8J', years: '2006–2014', body: ['Купе', 'Roadster'],                       engines: ['1.8 TFSI', '2.0 TFSI'],    parts: '7.1K' },
      { code: '8S', years: '2014–2023', body: ['Купе', 'Roadster'],                       engines: ['1.8 TFSI', '2.0 TFSI'],    parts: '6.5K' },
    ],
  },
  {
    id: 'RS6', name: 'Audi RS6', types: ['sport'], yearsRange: '2002–н.в.', totalParts: '12 400',
    generations: [
      { code: 'C5', years: '2002–2004', body: ['Седан', 'Avant'],                         engines: ['4.2 biturbo'],             parts: '2.8K' },
      { code: 'C6', years: '2008–2010', body: ['Avant'],                                  engines: ['5.0 V10'],                 parts: '2.6K' },
      { code: 'C7', years: '2012–2018', body: ['Avant'],                                  engines: ['4.0 TFSI'],                parts: '3.4K' },
      { code: 'C8', years: '2019–н.в.', body: ['Avant'],                                  engines: ['4.0 TFSI'],                parts: '3.6K' },
    ],
  },
  {
    id: 'e-tron', name: 'Audi e-tron', types: ['electric', 'crossover'], yearsRange: '2018–н.в.', totalParts: '8 600',
    generations: [
      { code: 'GE', years: '2018–н.в.', body: ['Кроссовер', 'Sportback'],                engines: ['электро'],                 parts: '8.6K' },
    ],
  },
]

export const AUDI_MODEL_NAMES = AUDI_MODELS.map(m => m.id)
export const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i)
