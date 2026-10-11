import { useCallback, useEffect, useState } from 'react'

import { parseProducts } from './types'
import type { Product } from './types'

export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] }

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/products', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error(`Falha ao carregar produtos (HTTP ${response.status}).`)
        return response.json() as Promise<unknown>
      })
      .then((data) => setState({ status: 'success', products: parseProducts(data) }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'Não foi possível carregar os produtos.',
        })
      })
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((current) => current + 1)
  }, [])

  return { state, retry }
}
