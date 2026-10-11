import { useState } from 'react'

import beverages from '../../assets/images/categories/beverages.webp'
import fitness from '../../assets/images/categories/sports.webp'
import fashion from '../../assets/images/categories/fashion.webp'
import health from '../../assets/images/categories/health.webp'
import supermarket from '../../assets/images/categories/supermarket.webp'
import technology from '../../assets/images/categories/technology.webp'
import tools from '../../assets/images/categories/tools.webp'
import styles from './CategoryList.module.scss'
import { CategoryCard } from './CategoryCard/CategoryCard'

// A tupla mantém id, rótulo e asset alinhados, reduzindo o risco de uma categoria
// renderizar o ícone de outra ao substituir os dados estáticos.
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
  // O estado controla apenas a apresentação da categoria selecionada; a filtragem real
  // deve ser conectada ao domínio de produtos quando essa regra estiver disponível.
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
      {/* A lista agrupa controles relacionados e mantém a navegação semântica por teclado. */}
      <ul className={styles.list}>
        {categories.map(([id, label, icon]) => (
          <li className={styles.item} key={id}>
            <CategoryCard active={activeId === id} icon={icon} id={id} label={label} onSelect={setActiveId} />
          </li>
        ))}
      </ul>
    </section>
  )
}
