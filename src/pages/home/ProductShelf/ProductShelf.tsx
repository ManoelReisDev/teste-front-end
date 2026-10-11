import { useId, useState } from 'react'

import { useProducts } from '../../../features/products/useProducts'
import type { Product } from '../../../features/products/types'
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
  const [start, setStart] = useState(0)
  const visible = 4
  const canNext = start + visible < products.length
  return (
    <div aria-label="Produtos relacionados" className={styles.carousel} role="region">
      <button aria-label="Produtos anteriores" className={`${styles.arrow} ${styles.previous}`} disabled={start === 0} onClick={() => setStart(Math.max(0, start - 1))} type="button">
        <img alt="" src={chevron} />
      </button>
      <ul className={styles.products}>
        {products.slice(start, start + visible).map((product) => <li key={product.id}><ProductCard onSelect={onSelect} product={product} /></li>)}
      </ul>
      <button aria-label="Próximos produtos" className={`${styles.arrow} ${styles.next}`} disabled={!canNext} onClick={() => setStart(start + 1)} type="button">
        <img alt="" className={styles.flipped} src={chevron} />
      </button>
    </div>
  )
}

export function ProductShelf({ withTabs = false, onSelect }: { withTabs?: boolean; onSelect: (product: Product) => void }) {
  const titleId = useId()
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { state, retry } = useProducts()
  return (
    <section aria-labelledby={titleId} className={styles.shelf}>
      <h2 id={titleId}>Produtos relacionados</h2>
      {withTabs ? (
        <div aria-label="Filtrar vitrine" className={styles.tabs} role="tablist">
          {tabs.map((tab) => <button aria-selected={activeTab === tab} className={activeTab === tab ? styles.activeTab : ''} key={tab} onClick={() => setActiveTab(tab)} role="tab" type="button">{tab}</button>)}
        </div>
      ) : <a className={styles.viewAll} href="#produtos">Ver todos</a>}
      {state.status === 'loading' && <p className={styles.feedback}>Carregando produtos...</p>}
      {state.status === 'error' && <div className={styles.feedback} role="alert"><p>{state.message}</p><button onClick={retry} type="button">Tentar novamente</button></div>}
      {state.status === 'success' && (state.products.length ? <ProductCarousel onSelect={onSelect} products={state.products} /> : <p className={styles.feedback}>Nenhum produto encontrado no momento.</p>)}
    </section>
  )
}
