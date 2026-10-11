import type { InputHTMLAttributes } from 'react'

import styles from './Checkbox.module.scss'

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function Checkbox({ className, ...props }: CheckboxProps) {
  const classNames = [styles.checkbox, className].filter(Boolean).join(' ')

  return <input {...props} className={classNames} type="checkbox" />
}
