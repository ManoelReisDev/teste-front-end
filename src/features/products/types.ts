export interface Product {
  id: string
  name: string
  description: string
  photo: string
  price: number
  listPrice: number
  installment: { count: number; value: number }
  freeShipping: boolean
}

interface ApiProduct {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

function isApiProduct(value: unknown): value is ApiProduct {
  if (!value || typeof value !== 'object') return false
  const product = value as Record<string, unknown>
  return (
    typeof product.productName === 'string' &&
    typeof product.descriptionShort === 'string' &&
    typeof product.photo === 'string' &&
    typeof product.price === 'number'
  )
}

export function toProduct(raw: ApiProduct, index: number): Product {
  return {
    id: `${raw.productName.toLowerCase().replace(/\W+/g, '-')}-${index}`,
    name: raw.productName,
    description: raw.descriptionShort,
    photo: raw.photo,
    price: raw.price,
    listPrice: Math.round(raw.price * 1.1),
    installment: { count: 2, value: Math.ceil(raw.price / 2) },
    freeShipping: true,
  }
}

export function parseProducts(value: unknown): Product[] {
  if (!value || typeof value !== 'object') throw new Error('A API retornou uma resposta inválida.')
  const response = value as { success?: unknown; products?: unknown }
  if (response.success !== true || !Array.isArray(response.products)) {
    throw new Error('A API retornou uma resposta inválida.')
  }
  return response.products.filter(isApiProduct).map(toProduct)
}
