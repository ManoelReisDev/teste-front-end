import type { CSSProperties } from 'react'

import styles from '../CategoryList.module.scss'

export interface CategoryCardProps {
  id: string
  label: string
  icon: string
  active: boolean
  onSelect: (id: string) => void
}

export function CategoryCard({ id, label, icon, active, onSelect }: CategoryCardProps) {
  return (
    <button
      aria-pressed={active}
      className={`${styles.card} ${active ? styles.active : ''}`}
      onClick={() => onSelect(id)}
      type="button"
    >
      <span className={styles.box}>
        <span
          aria-hidden="true"
          className={styles.icon}
          style={{ '--category-icon': `url(${icon})` } as CSSProperties}
        />
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
