import brandLogo from '../../assets/icons/brand-logo.svg'
import styles from './BrandList.module.scss'

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
            <a aria-label={label} className={styles.link} href={`#${id}`}>
              <img alt="" height={35} loading="lazy" src={brandLogo} width={117} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
