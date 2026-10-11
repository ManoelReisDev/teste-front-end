import type { InputHTMLAttributes } from 'react'

import styles from './Checkbox.module.scss'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className, ...props }: CheckboxProps) {
  // O tipo é fixado no componente para evitar inconsistência entre usos do controle.
  const classNames = [styles.checkbox, className].filter(Boolean).join(' ')

  return <input {...props} className={classNames} type="checkbox" />
}
