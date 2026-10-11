import type { AnchorHTMLAttributes, ReactNode } from 'react'

import styles from './Link.module.scss'

interface LinkBaseProps {
  variant?: 'navigation' | 'footer' | 'icon'
  children: ReactNode
  className?: string
}

export type LinkProps =
  | (LinkBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { unavailable?: false; href: string })
  | (LinkBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { unavailable: true; href?: never })

export function Link(props: LinkProps) {
  const {
    children,
    className,
    onClick,
    onKeyDown,
    unavailable = false,
    variant = 'navigation',
    ...anchorProps
  } = props
  const classNames = [styles.link, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  if (unavailable) {
    return (
      <a
        {...anchorProps}
        aria-disabled="true"
        className={classNames}
        onClick={(event) => {
          event.preventDefault()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            return
          }
          onKeyDown?.(event)
        }}
        role="link"
        tabIndex={0}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      {...anchorProps}
      className={classNames}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </a>
  )
}
