import { useId } from 'react'
import type { ReactNode } from 'react'

import dividerIcon from '../../../assets/icons/footer-divider.svg'
import footerLogo from '../../../assets/logo/footer-logo.svg'
import { Link } from '../../../shared/ui/Link/Link'
import { Newsletter } from './Newsletter'
import type { NewsletterSubmitHandler } from './Newsletter'
import styles from './Footer.module.scss'

export type FooterDestination =
  | 'about'
  | 'movement'
  | 'careers'
  | 'support'
  | 'contact'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'returns'
  | 'instagram'
  | 'facebook'
  | 'linkedin'

export interface FooterProps {
  destinations?: Partial<Record<FooterDestination, string>>
  onNewsletterSubmit?: NewsletterSubmitHandler
}

interface OptionalLinkProps {
  accessibleName?: string
  children: ReactNode
  className?: string
  href?: string
  variant: 'footer' | 'icon'
}

function OptionalLink({
  accessibleName,
  children,
  className,
  href,
  variant,
}: OptionalLinkProps) {
  if (href) {
    return (
      <Link
        aria-label={accessibleName}
        className={className}
        href={href}
        variant={variant}
      >
        {children}
      </Link>
    )
  }

  return (
    <Link
      aria-label={accessibleName}
      className={className}
      unavailable
      variant={variant}
    >
      {children}
    </Link>
  )
}

const footerColumns: Array<{
  id: string
  title: string
  links: Array<{ destination: FooterDestination; label: string }>
  usesPoppins?: boolean
}> = [
  {
    id: 'institutional',
    title: 'Institucional',
    links: [
      { destination: 'about', label: 'Sobre Nós' },
      { destination: 'movement', label: 'Movimento' },
      { destination: 'careers', label: 'Trabalhe conosco' },
    ],
  },
  {
    id: 'help',
    title: 'Ajuda',
    links: [
      { destination: 'support', label: 'Suporte' },
      { destination: 'contact', label: 'Fale Conosco' },
      { destination: 'faq', label: 'Perguntas Frequentes' },
    ],
  },
  {
    id: 'legal',
    title: 'Termos',
    usesPoppins: true,
    links: [
      { destination: 'terms', label: 'Termos e Condições' },
      { destination: 'privacy', label: 'Política de Privacidade' },
      { destination: 'returns', label: 'Troca e Devolução' },
    ],
  },
]

const socialLinks: Array<{
  destination: FooterDestination
  iconClassName: string
  label: string
}> = [
  { destination: 'instagram', iconClassName: styles.instagramIcon, label: 'Instagram' },
  { destination: 'facebook', iconClassName: styles.facebookIcon, label: 'Facebook' },
  { destination: 'linkedin', iconClassName: styles.linkedinIcon, label: 'LinkedIn' },
]

export function Footer({ destinations, onNewsletterSubmit }: FooterProps) {
  const footerId = useId()

  return (
    <footer className={styles.footer}>
      <Newsletter onSubmit={onNewsletterSubmit} />

      <div className={styles.institutional}>
        <div className={styles.institutionalInner}>
          <div className={styles.brand}>
            <div className={styles.brandCopy}>
              <Link aria-label="Econverse — Página inicial" href="/" variant="icon">
                <img alt="" src={footerLogo} />
              </Link>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div aria-label="Redes sociais" className={styles.socials} role="group">
              {socialLinks.map(({ destination, iconClassName, label }) => (
                <OptionalLink
                  accessibleName={label}
                  className={styles.socialLink}
                  href={destinations?.[destination]}
                  key={destination}
                  variant="icon"
                >
                  <span aria-hidden="true" className={`${styles.socialIcon} ${iconClassName}`} />
                </OptionalLink>
              ))}
            </div>
          </div>

          <div aria-hidden="true" className={styles.divider}>
            <img className={styles.dividerImage} src={dividerIcon} />
          </div>

          <div className={styles.columns}>
            {footerColumns.map(({ id, links, title, usesPoppins }) => (
              <section
                aria-labelledby={`${footerId}-footer-${id}`}
                className={styles.column}
                key={id}
              >
                <h2 id={`${footerId}-footer-${id}`}>{title}</h2>
                <ul>
                  {links.map(({ destination, label }) => (
                    <li key={destination}>
                      <OptionalLink
                        className={usesPoppins ? styles.poppinsLink : undefined}
                        href={destinations?.[destination]}
                        variant="footer"
                      >
                        {label}
                      </OptionalLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  )
}
