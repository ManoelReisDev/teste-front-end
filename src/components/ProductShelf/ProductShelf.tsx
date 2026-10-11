import { useId, useState } from 'react'

import type { Product } from '../../features/products/types'
import type { ProductsState } from '../../features/products/useProducts'
import { Carousel } from './Carousel/Carousel'
import { ProductCard } from './ProductCard/ProductCard'
import { ProductCardSkeleton } from './ProductCard/ProductCardSkeleton'
import { ShelfTabs, type ShelfTab } from './ShelfTabs/ShelfTabs'
import styles from './ProductShelf.module.scss'

const shelfTabs: ShelfTab[] = [
  { id: 'cellphone', label: 'Celular' },
  { id: 'accessories', label: 'Acessórios' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'notebooks', label: 'Notebooks' },
  { id: 'televisions', label: 'TVs' },
]

const skeletons = Array.from({ length: 4 }, (_, index) => index)

export interface ProductShelfProps {
  title?: string
  variant?: 'tabs' | 'viewAll'
  state: ProductsState
  onRetry: () => void
  onSelect: (product: Product) => void
  viewAllHref?: string
}

export function ProductShelf({
  title = 'Produtos relacionados',
  variant = 'viewAll',
  state,
  onRetry,
  onSelect,
  viewAllHref = '#produtos',
}: ProductShelfProps) {
  const baseId = useId()
  const titleId = `${baseId}-title`
  const [activeTab, setActiveTab] = useState(shelfTabs[0]?.id ?? '')

  // A seção coordena estados e composição; cada parte visual possui responsabilidade própria.
  return (
    <section aria-labelledby={titleId} className={styles.shelf}>
      <h2 id={titleId}>{title}</h2>
      {variant === 'tabs' ? (
        <ShelfTabs activeId={activeTab} idPrefix={baseId} onChange={setActiveTab} tabs={shelfTabs} />
      ) : (
        <a className={styles.viewAll} href={viewAllHref}>Ver todos</a>
      )}
      <div
        aria-labelledby={variant === 'tabs' ? `${baseId}-tab-${activeTab}` : undefined}
        className={styles.panel}
        id={`${baseId}-panel`}
        role={variant === 'tabs' ? 'tabpanel' : undefined}
      >
        {state.status === 'loading' && (
          <Carousel
            busy
            getKey={(index) => `skeleton-${index}`}
            items={skeletons}
            label={`${title}: carregando`}
            renderItem={() => <ProductCardSkeleton />}
          />
        )}
        {state.status === 'error' && (
          <div className={styles.feedback} role="alert">
            <p>{state.message}</p>
            <button onClick={onRetry} type="button">Tentar novamente</button>
          </div>
        )}
        {state.status === 'success' && state.products.length === 0 && (
          <p className={styles.feedback} role="status">Nenhum produto encontrado no momento.</p>
        )}
        {state.status === 'success' && state.products.length > 0 && (
          <Carousel
            getKey={(product) => product.id}
            items={state.products}
            label={title}
            renderItem={(product) => <ProductCard onSelect={onSelect} product={product} />}
          />
        )}
      </div>
    </section>
  )
}
