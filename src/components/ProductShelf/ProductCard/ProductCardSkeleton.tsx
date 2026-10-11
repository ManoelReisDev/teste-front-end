import styles from './ProductCardSkeleton.module.scss'

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true" className={styles.card}>
      <span className={styles.image} />
      <span className={styles.line} />
      <span className={`${styles.line} ${styles.short}`} />
      <span className={`${styles.line} ${styles.price}`} />
      <span className={`${styles.line} ${styles.small}`} />
      <span className={styles.button} />
    </div>
  )
}
