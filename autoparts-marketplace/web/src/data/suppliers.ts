export interface Supplier {
  id: string
  name: string
  shortCode: string
  rating: number
}

export const SUPPLIERS: Supplier[] = [
  { id: 'exist',   name: 'Exist.ru',   shortCode: 'EX', rating: 4.2 },
  { id: 'emex',    name: 'Emex.ru',    shortCode: 'EM', rating: 4.8 },
  { id: 'autodoc', name: 'Autodoc',    shortCode: 'AU', rating: 3.4 },
  { id: 'avtoall', name: 'Avtoall.ru', shortCode: 'AV', rating: 3.1 },
]
