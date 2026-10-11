import { useEffect, useRef, type ReactNode } from 'react'

import styles from './Modal.module.scss'

interface ModalProps {
  open: boolean
  titleId: string
  describedBy?: string
  closeLabel: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, titleId, describedBy, closeLabel, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      aria-describedby={describedBy}
      aria-labelledby={titleId}
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      ref={dialogRef}
    >
      <button aria-label={closeLabel} className={styles.close} onClick={onClose} type="button">
        ×
      </button>
      {children}
    </dialog>
  )
}
