export interface DecodedAudiVin {
  vin: string
  manufacturer: string
  model: string
  year: number | string
  bodyType: string
  generation: string
  platform: string
  plant: string
  engines: string[]
}

export type VinDecodeResult =
  | { ok: true; data: DecodedAudiVin }
  | { ok: false; error: string }

const MODEL_MAP: Record<string, string> = {
  A: 'A4', B: 'A6', C: 'A3', D: 'A8', E: 'A5', F: 'A7',
  G: 'A1', H: 'Q5', J: 'Q7', K: 'TT', L: 'Q3', M: 'RS6',
  N: 'Q8', R: 'Q2', S: 'S3',
  '4': 'A4', '5': 'A5', '6': 'A6', '8': 'A8',
  Z: 'A6', W: 'A4', Y: 'A5', T: 'A6',
  P: 'A4 Allroad', X: 'Q5',
}

const YEAR_MAP: Record<string, number> = {
  A: 2010, B: 2011, C: 2012, D: 2013, E: 2014, F: 2015,
  G: 2016, H: 2017, J: 2018, K: 2019, L: 2020, M: 2021,
  N: 2022, P: 2023, R: 2024, S: 2025, T: 2026,
  V: 1997, W: 1998, X: 1999, Y: 2000,
  '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005,
  '6': 2006, '7': 2007, '8': 2008, '9': 2009,
}

const PLANT_MAP: Record<string, string> = {
  A: 'Ингольштадт, Германия', B: 'Ингольштадт, Германия',
  C: 'Ингольштадт, Германия', D: 'Ингольштадт, Германия',
  E: 'Ингольштадт, Германия', F: 'Неккарзульм, Германия',
  G: 'Неккарзульм, Германия', H: 'Неккарзульм, Германия',
  J: 'Братислава, Словакия',  K: 'Братислава, Словакия',
  L: 'Братислава, Словакия',  M: 'Братислава, Словакия',
  N: 'Неккарзульм, Германия', P: 'Братислава, Словакия',
  R: 'Audi Hungaria, Дьёр, Венгрия', S: 'Audi Hungaria, Дьёр',
  W: 'Ингольштадт, Германия', Y: 'Ингольштадт, Германия',
  '4': 'Audi FAW-Volkswagen, Китай', '5': 'Audi FAW-Volkswagen, Китай',
  '6': 'Audi SAIC, Китай',
}

export function validateVin(vin: string): string | null {
  if (vin.length !== 17) return `VIN должен содержать ровно 17 символов. Сейчас: ${vin.length}`
  if (/[IOQ]/.test(vin)) return 'VIN не может содержать буквы I, O, Q'
  const wmi = vin.slice(0, 3)
  if (!wmi.startsWith('WAU') && !wmi.startsWith('WA1') && !wmi.startsWith('TRU'))
    return `Этот VIN не принадлежит автомобилю Audi. WMI: ${wmi}`
  return null
}

export function decodeAudiVin(vin: string): VinDecodeResult {
  const v = vin.toUpperCase().trim()
  const err = validateVin(v)
  if (err) return { ok: false, error: err }

  const model = MODEL_MAP[v[4]] ?? `Модель не определена (${v[4]})`
  const year: number | string = YEAR_MAP[v[9]] ?? `Год не определён (${v[9]})`
  const yearNum = typeof year === 'number' ? year : 2014
  const plantChar = v[7]
  const isChinese = plantChar >= '4' && plantChar <= '9'

  let bodyType = 'Не определён'
  const engines: string[] = []

  if (model.includes('A6') || isChinese) {
    bodyType = yearNum >= 2018 ? 'Седан/Avant' : 'Седан'
    engines.push('3.0 TDI 204-272 л.с.', '2.0 TFSI 180-252 л.с.', '3.0 TFSI 290-333 л.с.')
    if (yearNum >= 2018) engines.push('55 TFSI e гибрид')
  } else if (model.includes('A4')) {
    bodyType = 'Седан/Avant'
    engines.push('2.0 TDI 150-190 л.с.', '2.0 TFSI 190-252 л.с.')
  } else if (model.includes('A3')) {
    bodyType = 'Хэтчбек/Седан'
    engines.push('1.0 TFSI 116 л.с.', '1.5 TFSI 150 л.с.', '2.0 TDI 150 л.с.')
  } else if (model.includes('A5')) {
    bodyType = 'Купе/Sportback'
    engines.push('2.0 TFSI 190-252 л.с.', '3.0 TFSI 290-333 л.с.')
  } else if (model.includes('Q5')) {
    bodyType = 'Кроссовер'
    engines.push('2.0 TDI 150-190 л.с.', '2.0 TFSI 230-252 л.с.')
  } else if (model.includes('Q7') || model.includes('Q8')) {
    bodyType = 'Кроссовер'
    engines.push('3.0 TDI 218-272 л.с.', '3.0 TFSI 333 л.с.')
  } else if (model.includes('A8')) {
    bodyType = 'Седан/Long'
    engines.push('3.0 TDI 250-286 л.с.', '4.0 TDI 320-435 л.с.')
  } else if (model.includes('TT')) {
    bodyType = 'Купе/Roadster'
    engines.push('1.8 TFSI 180 л.с.', '2.0 TFSI 230 л.с.')
  }

  let generation = '—'
  if (model.includes('A4')) {
    if (yearNum <= 2001) generation = 'B5 (1994-2001)'
    else if (yearNum <= 2006) generation = 'B6 (2000-2006)'
    else if (yearNum <= 2008) generation = 'B7 (2004-2008)'
    else if (yearNum <= 2016) generation = 'B8 (2007-2016)'
    else generation = 'B9 (2015-н.в.)'
  } else if (model.includes('A6') || isChinese) {
    if (yearNum <= 1997) generation = 'C4 (1994-1997)'
    else if (yearNum <= 2005) generation = 'C5 (1997-2005)'
    else if (yearNum <= 2011) generation = 'C6 (2004-2011)'
    else if (yearNum <= 2018) generation = 'C7 (2011-2018)'
    else generation = 'C8 (2018-н.в.)'
  } else if (model.includes('A3')) {
    if (yearNum <= 2003) generation = '8L (1996-2003)'
    else if (yearNum <= 2012) generation = '8P (2003-2012)'
    else if (yearNum <= 2020) generation = '8V (2012-2020)'
    else generation = '8Y (2020-н.в.)'
  } else if (model.includes('Q5')) {
    generation = yearNum <= 2017 ? '8R (2008-2017)' : 'FY (2017-н.в.)'
  } else if (model.includes('Q7')) {
    generation = yearNum <= 2015 ? '4L (2005-2015)' : '4M (2015-н.в.)'
  } else if (model.includes('A5')) {
    generation = yearNum <= 2016 ? '8T (2007-2016)' : 'F5 (2016-н.в.)'
  } else if (model.includes('A7')) {
    generation = yearNum <= 2018 ? '4G (2010-2018)' : '4K (2018-н.в.)'
  } else if (model.includes('A8')) {
    if (yearNum <= 2002) generation = 'D2 (1994-2002)'
    else if (yearNum <= 2010) generation = 'D3 (2002-2010)'
    else if (yearNum <= 2018) generation = 'D4 (2009-2018)'
    else generation = 'D5 (2017-н.в.)'
  }

  let platform = '—'
  if (['A4', 'A5'].some(m => model.includes(m)) && yearNum > 2007 && yearNum <= 2015) platform = 'MLB'
  else if (['A4', 'A5', 'A6', 'A7', 'A8', 'Q5', 'Q7', 'Q8'].some(m => model.includes(m)) && yearNum > 2015) platform = 'MLB Evo'
  else if (['A1', 'A3', 'Q2', 'Q3', 'TT'].some(m => model.includes(m))) platform = yearNum > 2018 ? 'MQB A0' : 'MQB'
  if (generation.includes('C7') || generation.includes('C8')) platform = 'MLB Evo'

  return {
    ok: true,
    data: {
      vin: v,
      manufacturer: 'Audi AG',
      model: isChinese ? 'A6' : model,
      year,
      bodyType,
      generation,
      platform,
      plant: PLANT_MAP[plantChar] ?? 'Завод не определён',
      engines,
    },
  }
}
