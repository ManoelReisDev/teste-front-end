import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Modal } from './Modal'

describe('Modal', () => {
  it('expõe título e solicita fechamento por botão, Escape e backdrop', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Modal closeLabel="Fechar" onClose={onClose} open titleId="title"><h2 id="title">Detalhes</h2><p>Conteúdo</p></Modal>)
    expect(screen.getByRole('dialog', { name: 'Detalhes' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Fechar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(onClose).toHaveBeenCalledTimes(2)
    fireEvent.click(screen.getByRole('dialog'))
    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('não fecha quando o clique ocorre no conteúdo', () => {
    const onClose = vi.fn()
    render(<Modal closeLabel="Fechar" onClose={onClose} open titleId="title"><h2 id="title">Detalhes</h2><p>Conteúdo</p></Modal>)
    fireEvent.click(screen.getByText('Conteúdo'))
    expect(onClose).not.toHaveBeenCalled()
  })
})
