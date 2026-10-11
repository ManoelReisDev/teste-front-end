import { useState } from 'react'

import beverages from '../../../assets/images/categories/bebidas.webp'
import fitness from '../../../assets/images/categories/esportes.webp'
import fashion from '../../../assets/images/categories/moda.webp'
import health from '../../../assets/images/categories/saude.webp'
import supermarket from '../../../assets/images/categories/supermercado.webp'
import technology from '../../../assets/images/categories/tecnologia.webp'
import tools from '../../../assets/images/categories/ferramentas.webp'
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
                <img alt="" className={styles.icon} src={icon} />
              </span>
              <span className={styles.label}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
