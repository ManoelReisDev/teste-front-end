import brandLogo from '../../assets/icons/brand-logo.svg'
import styles from './BrandList.module.scss'

// Os dados ficam separados da marcação para que a troca pelos dados da API não exija
// duplicar a estrutura visual de cada marca.
const brands = Array.from({ length: 5 }, (_, index) => ({
  id: `brand-${index + 1}`,
  label: `Econverse, marca ${index + 1}`,
}))

export function BrandList() {
  return (
    <section aria-labelledby="brands-title" className={styles.section}>
      <h2 className={styles.title} id="brands-title">
        Navegue por marcas
      </h2>

      <ul className={styles.list}>
        {brands.map(({ id, label }) => (
          <li className={styles.item} key={id}>
            {/* O texto acessível identifica o destino enquanto a imagem decorativa evita repetição para leitores de tela. */}
            <a aria-label={label} className={styles.link} href={`#${id}`}>
              <img alt="" height={35} loading="lazy" src={brandLogo} width={117} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
