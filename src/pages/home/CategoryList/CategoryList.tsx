import { useState, type CSSProperties } from 'react'

import beverages from '../../../assets/images/categories/beverages.webp'
import fitness from '../../../assets/images/categories/sports.webp'
import fashion from '../../../assets/images/categories/fashion.webp'
import health from '../../../assets/images/categories/health.webp'
import supermarket from '../../../assets/images/categories/supermarket.webp'
import technology from '../../../assets/images/categories/technology.webp'
import tools from '../../../assets/images/categories/tools.webp'
import styles from './CategoryList.module.scss'

const categories = [
  ['technology', 'Tecnologia', technology],
  ['supermarket', 'Supermercado', supermarket],
  ['beverages', 'Bebidas', beverages],
  ['tools', 'Ferramentas', tools],
  ['health', 'Saúde', health],
  ['fitness', 'Esportes e Fitness', fitness],
  ['fashion', 'Moda', fashion],
] as const

export function CategoryList() {
  const [activeId, setActiveId] = useState('technology')

  return (
    <section
      aria-labelledby="categories-title"
      className={styles.section}
      id="categorias"
    >
      <h2 className={styles.visuallyHidden} id="categories-title">
        Compre por categoria
      </h2>
      <ul className={styles.list}>
        {categories.map(([id, label, icon]) => (
          <li className={styles.item} key={id}>
            <button
              aria-pressed={activeId === id}
              className={`${styles.card} ${activeId === id ? styles.active : ''}`}
              onClick={() => setActiveId(id)}
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
          </li>
        ))}
      </ul>
    </section>
  )
}
