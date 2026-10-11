import { parseProducts } from './types'
import type { Product } from './types'

export const PRODUCTS_URL = import.meta.env.VITE_PRODUCTS_URL || '/api/products'

export class ProductsError extends Error {
  override name = 'ProductsError'
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  let response: Response

  try {
    response = await fetch(PRODUCTS_URL, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ProductsError('Não foi possível conectar ao serviço de produtos.')
  }

  if (!response.ok) {
    throw new ProductsError(`Falha ao carregar produtos (HTTP ${response.status}).`)
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new ProductsError('O serviço de produtos retornou uma resposta inválida.')
  }

  try {
    return parseProducts(data)
  } catch {
    throw new ProductsError('O serviço de produtos retornou uma resposta inválida.')
  }
}
