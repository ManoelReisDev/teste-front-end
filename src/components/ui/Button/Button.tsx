import type { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.scss'

export type ButtonVariant = 'accent' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  unavailable?: boolean
}

export function Button({
  'aria-disabled': ariaDisabled,
  className,
  disabled = false,
  onClick,
  onKeyDown,
  type = 'button',
  unavailable = false,
  variant = 'accent',
  ...props
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(' ')
  const isUnavailable = unavailable && !disabled

  return (
    <button
      {...props}
      aria-disabled={isUnavailable ? true : ariaDisabled}
      className={classNames}
      disabled={disabled}
      onClick={(event) => {
        // "unavailable" é diferente de disabled: mantém o controle focável e sinaliza
        // aria-disabled, mas impede uma ação que ainda não possui integração.
        if (isUnavailable) {
          event.preventDefault()
          return
        }

        onClick?.(event)
      }}
      onKeyDown={(event) => {
        if (isUnavailable && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          return
        }

        onKeyDown?.(event)
      }}
      type={type}
    />
  )
}
