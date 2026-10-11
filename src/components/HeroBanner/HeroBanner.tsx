import { Link } from '../ui/Link/Link'
import styles from './HeroBanner.module.scss'

export function HeroBanner() {
  // A imagem principal é carregada com prioridade; o conteúdo textual permanece sobreposto ao banner.
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      <img
        alt=""
        className={styles.image}
        decoding="async"
        fetchPriority="high"
        height={390}
        sizes="100vw"
        src="/images/hero.webp"
        srcSet="/images/hero.webp 1440w, /images/hero@2x.webp 2880w"
        width={1440}
      />
      <div aria-hidden="true" className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title} id="hero-title">
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong className={styles.discount}>50% Off</strong> nos produtos
        </p>
        <Link className={styles.cta} href="#ofertas" variant="navigation">
          Ver produto
        </Link>
      </div>
    </section>
  )
}
