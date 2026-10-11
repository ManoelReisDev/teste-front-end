import type { LabelHTMLAttributes } from 'react'

import styles from './Label.module.scss'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  visuallyHidden?: boolean
  surface?: 'light' | 'dark'
}

export function Label({ className, surface = 'light', visuallyHidden = false, ...props }: LabelProps) {
  // A mesma label atende campos visíveis e labels ocultas visualmente para leitores de tela.
  const classNames = [styles.label, styles[surface], visuallyHidden && styles.visuallyHidden, className]
    .filter(Boolean)
    .join(' ')

  return <label {...props} className={classNames} />
}
