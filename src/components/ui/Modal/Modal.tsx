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
    // O estado React é a fonte de verdade, mas a abertura precisa usar showModal para ativar
    // o foco, o backdrop e o fechamento por Escape fornecidos pelo elemento nativo.
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      aria-describedby={describedBy}
      aria-labelledby={titleId}
      className={styles.dialog}
      onCancel={(event) => {
        // Impede o fechamento automático para que o estado pai também seja atualizado.
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // Apenas o clique no backdrop fecha; cliques no conteúdo permanecem isolados.
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
