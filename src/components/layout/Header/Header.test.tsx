import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Header } from './Header'

describe('Header', () => {
  it('envia a busca com espaços externos removidos', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<Header onSearch={onSearch} />)
    const input = screen.getByRole('searchbox', { name: 'Buscar produtos' })
    await user.type(input, '  notebook gamer  ')
    await user.keyboard('{Enter}')
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('notebook gamer')
  })

  it('ignora termos vazios e mantém a busca editável sem callback', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    const { rerender } = render(<Header onSearch={onSearch} />)
    const input = screen.getByRole('searchbox', { name: 'Buscar produtos' })
    await user.type(input, '   ')
    await user.keyboard('{Enter}')
    expect(onSearch).not.toHaveBeenCalled()
    rerender(<Header />)
    const unavailableButton = screen.getByRole('button', { name: 'Buscar produtos' })
    expect(unavailableButton).toHaveAttribute('aria-disabled', 'true')
    await user.click(unavailableButton)
    expect(window.location.hash).toBe('')
  })

  it('preserva destinos reais e associa labels de instâncias distintas', () => {
    render(
      <>
        <Header navigation={{ offers: '/ofertas' }} />
        <Header navigation={{ offers: '/ofertas-2' }} />
      </>,
    )
    expect(screen.getAllByRole('link', { name: 'Ofertas do dia' }).map((link) => link.getAttribute('href'))).toEqual(['/ofertas', '/ofertas-2'])
    const inputs = screen.getAllByRole('searchbox', { name: 'Buscar produtos' })
    expect(inputs[0]).toHaveAttribute('id')
    expect(inputs[0]?.id).not.toBe(inputs[1]?.id)
    expect(screen.getAllByRole('navigation', { name: 'Navegação principal' })).toHaveLength(2)
  })
})
