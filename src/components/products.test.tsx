import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CategoryCard } from './CategoryList/CategoryCard/CategoryCard'
import { CategoryList } from './CategoryList/CategoryList'
import { ProductModal } from './ProductModal/ProductModal'
import { ProductCard } from './ProductShelf/ProductCard/ProductCard'
import { ProductCardSkeleton } from './ProductShelf/ProductCard/ProductCardSkeleton'
import { ProductShelf } from './ProductShelf/ProductShelf'
import { ShelfTabs } from './ProductShelf/ShelfTabs/ShelfTabs'
import { products } from '../test/fixtures/products'

describe('componentes de produtos e navegação', () => {
  it('exibe ProductCard em BRL, frete e seleciona o produto', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ProductCard onSelect={onSelect} product={products[0]} />)
    expect(screen.getByText(/Por R\$ 199,99/)).toBeInTheDocument()
    expect(screen.getByText('Frete grátis')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Comprar Celular Alpha' }))
    expect(onSelect).toHaveBeenCalledWith(products[0])
  })

  it('oculta skeleton de tecnologias assistivas', () => {
    render(<ProductCardSkeleton />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(document.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('renderiza estados loading, erro, vazio e sucesso da vitrine', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    const onSelect = vi.fn()
    const { rerender } = render(<ProductShelf onRetry={onRetry} onSelect={onSelect} state={{ status: 'loading' }} />)
    expect(screen.getByRole('region', { name: /carregando/i })).toHaveAttribute('aria-busy', 'true')
    rerender(<ProductShelf onRetry={onRetry} onSelect={onSelect} state={{ status: 'error', message: 'Falha' }} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Falha')
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
    rerender(<ProductShelf onRetry={onRetry} onSelect={onSelect} state={{ status: 'success', products: [] }} />)
    expect(screen.getByRole('status')).toHaveTextContent('Nenhum produto')
    rerender(<ProductShelf onRetry={onRetry} onSelect={onSelect} state={{ status: 'success', products }} />)
    await user.click(screen.getByRole('button', { name: 'Comprar Celular Alpha' }))
    expect(onSelect).toHaveBeenCalledWith(products[0])
  })

  it('navega pelas ShelfTabs com setas e mantém o painel associado', async () => {
    const user = userEvent.setup()
    function ControlledTabs() {
      const [activeId, setActiveId] = useState('one')
      return <ShelfTabs activeId={activeId} idPrefix="shelf" onChange={setActiveId} tabs={[{ id: 'one', label: 'Um' }, { id: 'two', label: 'Dois' }]} />
    }
    render(<ControlledTabs />)
    const first = screen.getByRole('tab', { name: 'Um' })
    await user.click(first)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Dois' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Dois' })).toHaveAttribute('aria-controls', 'shelf-panel')
  })

  it('altera somente a seleção visual de CategoryCard e CategoryList', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<CategoryCard active={false} icon="/category.svg" id="tools" label="Ferramentas" onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Ferramentas' }))
    expect(onSelect).toHaveBeenCalledWith('tools')
    render(<CategoryList />)
    expect(screen.getByRole('button', { name: 'Tecnologia' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: 'Moda' }))
    expect(screen.getByRole('button', { name: 'Moda' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Tecnologia' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('controla quantidade do modal e fecha ao comprar', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ProductModal onClose={onClose} product={products[0]} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('status', { name: 'Quantidade: 1' })).toHaveTextContent('01')
    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }))
    expect(screen.getByRole('status', { name: 'Quantidade: 2' })).toHaveTextContent('02')
    await user.click(screen.getByRole('button', { name: 'Comprar' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
