import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

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

function useProductCarousel(itemCount: number) {
  const viewportRef = useRef<HTMLUListElement>(null)
  const [canPrevious, setCanPrevious] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateControls = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maxScroll = viewport.scrollWidth - viewport.clientWidth
    setCanPrevious(viewport.scrollLeft > 2)
    setCanNext(viewport.scrollLeft < maxScroll - 2)
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    updateControls()
    viewport.addEventListener('scroll', updateControls, { passive: true })
    const observer = new ResizeObserver(updateControls)
    observer.observe(viewport)
    return () => {
      viewport.removeEventListener('scroll', updateControls)
      observer.disconnect()
    }
  }, [itemCount, updateControls])

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const firstItem = viewport.firstElementChild
    const gap = Number.parseFloat(getComputedStyle(viewport).columnGap) || 0
    const itemWidth = firstItem instanceof HTMLElement ? firstItem.offsetWidth : viewport.clientWidth
    const visibleItems = Math.max(1, Math.floor((viewport.clientWidth + gap) / (itemWidth + gap)))
    viewport.scrollBy({
      left: direction * visibleItems * (itemWidth + gap),
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  return {
    viewportRef,
    canPrevious,
    canNext,
    previous: () => scrollByPage(-1),
    next: () => scrollByPage(1),
  }
}

function ProductCarousel({ products, onSelect }: { products: Product[]; onSelect: (product: Product) => void }) {
  const { viewportRef, canPrevious, canNext, previous, next } = useProductCarousel(products.length)
  return (
    <div aria-label="Produtos relacionados" className={styles.carousel} role="region">
      <button aria-label="Produtos anteriores" className={`${styles.arrow} ${styles.previous}`} disabled={!canPrevious} onClick={previous} type="button">
        <img alt="" src={chevron} />
      </button>
      <ul aria-label="Produtos relacionados" className={styles.products} ref={viewportRef}>
        {products.map((product) => <li key={product.id}><ProductCard onSelect={onSelect} product={product} /></li>)}
      </ul>
      <button aria-label="Próximos produtos" className={`${styles.arrow} ${styles.next}`} disabled={!canNext} onClick={next} type="button">
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
