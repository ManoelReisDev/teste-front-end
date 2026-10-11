import styles from './PartnerBanners.module.scss'
import { PartnerCard } from './PartnerCard/PartnerCard'

const partners = ['partner-one', 'partner-two']

export function PartnerBanners({ title = 'Nossos parceiros' }: { title?: string }) {
  // Os cards compartilham a composição visual e variam apenas a chave do destino;
  // isso mantém a seção preparada para receber parceiros reais sem duplicar JSX.
  return (
    <section aria-label={title} className={styles.section}>
      <ul className={styles.list}>
        {partners.map((id) => (
          <li key={id}>
            <PartnerCard id={id} />
          </li>
        ))}
      </ul>
    </section>
  )
}
