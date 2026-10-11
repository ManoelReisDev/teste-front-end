import type { Product } from '../../../features/products/types'
import styles from './ProductCard.module.scss'

function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
}

export interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const selectProduct = () => onSelect(product)

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img
          alt={product.name}
          className={styles.productImage}
          decoding="async"
          height={228}
          loading="lazy"
          src={product.photo}
          width={247}
        />
        <h3 className={styles.name}>
          <button className={styles.nameButton} onClick={selectProduct} type="button">
            {product.name}
          </button>
        </h3>
      </div>
      <p className={styles.prices}>
        <span className={styles.listPrice}>De {currency(product.listPrice)}</span>
        <strong className={styles.price}>Por {currency(product.price)}</strong>
      </p>
      <p className={styles.installment}>
        ou {product.installment.count}x de {currency(product.installment.value)} sem juros
      </p>
      {product.freeShipping && <p className={styles.shipping}>Frete grátis</p>}
      <button
        aria-label={`Comprar ${product.name}`}
        className={styles.buy}
        onClick={selectProduct}
        type="button"
      >
        Comprar
      </button>
    </article>
  )
}
