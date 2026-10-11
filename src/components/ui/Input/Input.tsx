import type { InputHTMLAttributes } from 'react'

import styles from './Input.module.scss'

export type InputVariant = 'search' | 'default'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  variant?: InputVariant
  type?: 'text' | 'email' | 'search'
}

export function Input({
  className,
  type = 'text',
  variant = 'default',
  ...props
}: InputProps) {
  // A variante define somente a apresentação; os atributos nativos continuam sendo repassados.
  const classNames = [styles.input, styles[variant], className]
    .filter(Boolean)
    .join(' ')

  return <input {...props} className={classNames} type={type} />
}
