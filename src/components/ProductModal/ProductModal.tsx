import { useId, useState } from 'react'

import type { Product } from '../../features/products/types'
import { Modal } from '../ui/Modal/Modal'
import styles from './ProductModal.module.scss'

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function currency(value: number) {
  // Produtos usam centavos na API; a formatação centralizada evita exibir valores inconsistentes no modal.
  return currencyFormatter.format(value / 100)
}

export function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  // IDs gerados pelo React conectam título e descrição ao dialog sem depender de nomes globais únicos.
  const titleId = useId()
  const descriptionId = useId()
  // O modal permanece desmontado quando não há produto, evitando conteúdo invisível no documento
  // e impedindo que informações de um item anterior permaneçam acessíveis.
  if (!product) return null

  return (
    <Modal closeLabel="Fechar detalhes do produto" describedBy={descriptionId} onClose={onClose} open={Boolean(product)} titleId={titleId}>
      <ProductModalContent
        descriptionId={descriptionId}
        key={product.id}
        onBuy={onClose}
        product={product}
        titleId={titleId}
      />
    </Modal>
  )
}

interface ProductModalContentProps {
  product: Product
  titleId: string
  descriptionId: string
  onBuy: () => void
}

function ProductModalContent({ product, titleId, descriptionId, onBuy }: ProductModalContentProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className={styles.content}>
      <img alt={product.name} className={styles.image} decoding="async" height={228} src={product.photo} width={247} />
      <div className={styles.info}>
        <h2 className={styles.name} id={titleId}>{product.name}</h2>
        <strong className={styles.price}>{currency(product.price)}</strong>
        <p className={styles.description} id={descriptionId}>{product.description}</p>
        <div className={styles.actions}>
          {/* Os limites evitam quantidade zero e mantêm a entrada compatível com o formato visual de dois dígitos. */}
          <div aria-label="Quantidade" className={styles.quantity} role="group">
            <button aria-label="Diminuir quantidade" disabled={quantity === 1} onClick={() => setQuantity((value) => value - 1)} type="button">−</button>
            <output aria-label={`Quantidade: ${quantity}`}>{String(quantity).padStart(2, '0')}</output>
            <button aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => Math.min(99, value + 1))} type="button">+</button>
          </div>
          <button className={styles.buy} onClick={onBuy} type="button">Comprar</button>
        </div>
      </div>
    </div>
  )
}
