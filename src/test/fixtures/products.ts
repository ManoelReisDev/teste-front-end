import type { Product } from '../../features/products/types'

export const products: Product[] = [
  {
    id: 'phone-1',
    name: 'Celular Alpha',
    description: 'Descrição do celular Alpha.',
    photo: '/phone-alpha.webp',
    price: 19999,
    listPrice: 21999,
    installment: { count: 2, value: 10000 },
    freeShipping: true,
  },
  {
    id: 'tablet-2',
    name: 'Tablet Beta',
    description: 'Descrição do tablet Beta.',
    photo: '/tablet-beta.webp',
    price: 8999,
    listPrice: 9899,
    installment: { count: 2, value: 4500 },
    freeShipping: false,
  },
]
