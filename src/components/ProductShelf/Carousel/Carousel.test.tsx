import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Carousel } from './Carousel'

describe('Carousel', () => {
  it('expõe controles acessíveis e solicita rolagem para o próximo grupo', async () => {
    const user = userEvent.setup()
    const scrollBy = vi.spyOn(HTMLElement.prototype, 'scrollBy').mockImplementation(() => {})
    const { rerender } = render(<Carousel items={['a', 'b']} label="Produtos" getKey={(item) => item} renderItem={(item) => <span>{item}</span>} />)
    let viewport = screen.getByRole('list')
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollWidth: { configurable: true, value: 200 },
      scrollLeft: { configurable: true, value: 0 },
    })
    rerender(<Carousel items={['a', 'b']} label="Produtos" getKey={(item) => item} renderItem={(item) => <span>{item}</span>} />)
    viewport = screen.getByRole('list')
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollWidth: { configurable: true, value: 200 },
      scrollLeft: { configurable: true, value: 0 },
    })
    fireEvent.scroll(viewport)
    const next = screen.getByRole('button', { name: 'Próximos produtos' })
    await user.click(next)
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: expect.any(Number) }))
  })

  it('atualiza estados de início e fim a partir do scroll', () => {
    render(<Carousel items={['a']} label="Produtos" getKey={(item) => item} renderItem={(item) => <span>{item}</span>} />)
    const viewport = screen.getByRole('list')
    Object.defineProperties(viewport, {
      clientWidth: { configurable: true, value: 100 },
      scrollWidth: { configurable: true, value: 200 },
      scrollLeft: { configurable: true, value: 50, writable: true },
    })
    fireEvent.scroll(viewport)
    expect(screen.getByRole('button', { name: 'Produtos anteriores' })).not.toBeDisabled()
  })
})
