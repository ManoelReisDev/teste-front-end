import { Link } from '../../../shared/ui/Link/Link'
import styles from './PartnerBanners.module.scss'

const partners = ['partner-one', 'partner-two']

export function PartnerBanners({ title = 'Nossos parceiros' }: { title?: string }) {
  return (
    <section aria-label={title} className={styles.section}>
      <ul className={styles.list}>
        {partners.map((id) => (
          <li key={id}>
            <article className={styles.card}>
              <img
                alt="Loja parceira com computadores Apple expostos em mesas"
                className={styles.image}
                decoding="async"
                height={350}
                loading="lazy"
                sizes="(max-width: 600px) 100vw, 634px"
                src="/images/partner.webp"
                srcSet="/images/partner.webp 634w, /images/partner@2x.webp 1268w"
                width={634}
              />
              <div aria-hidden="true" className={styles.overlay} />
              <div className={styles.content}>
                <h2 className={styles.title}>Parceiros</h2>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur</p>
                <Link
                  aria-label="Confira: Parceiros"
                  className={styles.cta}
                  href={`#${id}`}
                  variant="navigation"
                >
                  Confira
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
