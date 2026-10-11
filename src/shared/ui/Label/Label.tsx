import type { LabelHTMLAttributes } from 'react'

import styles from './Label.module.scss'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  visuallyHidden?: boolean
}

export function Label({ className, visuallyHidden = false, ...props }: LabelProps) {
  const classNames = [styles.label, visuallyHidden && styles.visuallyHidden, className]
    .filter(Boolean)
    .join(' ')

  return <label {...props} className={classNames} />
}
