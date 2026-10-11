import { Link } from '../../ui/Link/Link'
import styles from '../PartnerBanners.module.scss'

export interface PartnerCardProps {
  id: string
}

export function PartnerCard({ id }: PartnerCardProps) {
  return (
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
      {/* O overlay é decorativo e fica fora do conteúdo para preservar contraste sem alterar a imagem. */}
      <div aria-hidden="true" className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.title}>Parceiros</h2>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur</p>
        <Link aria-label="Confira: Parceiros" className={styles.cta} href={`#${id}`} variant="navigation">
          Confira
        </Link>
      </div>
    </article>
  )
}
