import { useId, useState } from 'react'

import type { Product } from '../../features/products/types'
import { Modal } from '../../shared/ui/Modal/Modal'
import styles from './ProductModal.module.scss'

function currency(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
}

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const titleId = useId()
  const descriptionId = useId()
  const [quantity, setQuantity] = useState(1)
  if (!product) return null

  return (
    <Modal closeLabel="Fechar detalhes do produto" describedBy={descriptionId} onClose={onClose} open={Boolean(product)} titleId={titleId}>
      <div className={styles.content}>
        <img alt={product.name} className={styles.image} height={228} src={product.photo} width={247} />
        <div className={styles.info}>
          <h2 className={styles.name} id={titleId}>{product.name}</h2>
          <strong className={styles.price}>{currency(product.price)}</strong>
          <p className={styles.description} id={descriptionId}>{product.description}</p>
          <div className={styles.actions}>
            <div aria-label="Quantidade" className={styles.quantity} role="group">
              <button aria-label="Diminuir quantidade" disabled={quantity === 1} onClick={() => setQuantity((value) => value - 1)} type="button">−</button>
              <output aria-label={`Quantidade: ${quantity}`}>{String(quantity).padStart(2, '0')}</output>
              <button aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => Math.min(99, value + 1))} type="button">+</button>
            </div>
            <button className={styles.buy} onClick={onClose} type="button">Comprar</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
