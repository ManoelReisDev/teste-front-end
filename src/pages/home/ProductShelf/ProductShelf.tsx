import { useId, useRef, useState, type KeyboardEvent } from 'react'

import type { Product } from '../../../features/products/types'
import type { ProductsState } from '../../../features/products/useProducts'
import chevron from '../../../assets/icons/chevron-left.svg'
import styles from './ProductShelf.module.scss'

const tabs = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  return (
    <article className={styles.card}>
      <img alt={product.name} className={styles.productImage} height={228} loading="lazy" src={product.photo} width={247} />
      <button className={styles.name} onClick={() => onSelect(product)} type="button">{product.name}</button>
      <s className={styles.listPrice}>{currency(product.listPrice)}</s>
      <strong className={styles.price}>{currency(product.price)}</strong>
      <span className={styles.installment}>ou {product.installment.count}x de {currency(product.installment.value)} sem juros</span>
      {product.freeShipping && <span className={styles.shipping}>Frete grátis</span>}
      <button aria-label={`Comprar ${product.name}`} className={styles.buy} onClick={() => onSelect(product)} type="button">Comprar</button>
    </article>
  )
}

function ProductCarousel({ products, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  const visible = 4
  const [page, setPage] = useState(0)
  const pages = Array.from({ length: Math.ceil(products.length / visible) }, (_, index) =>
    products.slice(index * visible, (index + 1) * visible),
  )
  const canPrevious = page > 0
  const canNext = page < pages.length - 1
  return (
    <div aria-label="Produtos relacionados" className={styles.carousel} role="region">
      <button aria-label="Produtos anteriores" className={`${styles.arrow} ${styles.previous}`} disabled={!canPrevious} onClick={() => setPage((current) => current - 1)} type="button">
        <img alt="" src={chevron} />
      </button>
      <div className={styles.productsViewport}>
        <div className={styles.productsTrack} style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((pageProducts, pageIndex) => (
            <ul className={styles.products} key={pageIndex}>
              {pageProducts.map((product) => <li key={product.id}><ProductCard onSelect={onSelect} product={product} /></li>)}
            </ul>
          ))}
        </div>
      </div>
      <button aria-label="Próximos produtos" className={`${styles.arrow} ${styles.next}`} disabled={!canNext} onClick={() => setPage((current) => current + 1)} type="button">
        <img alt="" className={styles.flipped} src={chevron} />
      </button>
    </div>
  )
}

export function ProductShelf({ state, onRetry, withTabs = false, onSelect }: { state: ProductsState; onRetry: () => void; withTabs?: boolean; onSelect: (product: Product) => void }) {
  const titleId = useId()
  const [activeTab, setActiveTab] = useState(tabs[0])
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  function focusTab(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length
    setActiveTab(tabs[nextIndex])
    tabRefs.current[nextIndex]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => focusTab(index - 1),
      ArrowRight: () => focusTab(index + 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    }
    const action = actions[event.key]
    if (!action) return
    event.preventDefault()
    action()
  }

  return (
    <section aria-labelledby={titleId} className={styles.shelf}>
      <h2 id={titleId}>Produtos relacionados</h2>
      {withTabs ? (
        <div aria-label="Filtrar vitrine" className={styles.tabs} role="tablist">
          {tabs.map((tab, index) => (
            <button
              aria-controls={`${titleId}-panel`}
              aria-selected={activeTab === tab}
              className={activeTab === tab ? styles.activeTab : ''}
              id={`${titleId}-tab-${index}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              role="tab"
              tabIndex={activeTab === tab ? 0 : -1}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      ) : <a className={styles.viewAll} href="#produtos">Ver todos</a>}
      {state.status === 'loading' && <p className={styles.feedback}>Carregando produtos...</p>}
      {state.status === 'error' && <div className={styles.feedback} role="alert"><p>{state.message}</p><button onClick={onRetry} type="button">Tentar novamente</button></div>}
      <div
        aria-labelledby={withTabs ? `${titleId}-tab-${tabs.indexOf(activeTab)}` : undefined}
        className={styles.panel}
        id={`${titleId}-panel`}
        role={withTabs ? 'tabpanel' : undefined}
      >
        {state.status === 'success' && (state.products.length ? <ProductCarousel onSelect={onSelect} products={state.products} /> : <p className={styles.feedback}>Nenhum produto encontrado no momento.</p>)}
      </div>
    </section>
  )
}
