import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Footer } from './Footer'

describe('Footer', () => {
  it('renderiza o landmark, newsletter e destinos fornecidos', () => {
    render(<Footer destinations={{ about: '/sobre', instagram: 'https://instagram.com/econverse' }} />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Inscreva-se na nossa newsletter' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://instagram.com/econverse')
    expect(screen.getByRole('link', { name: 'Sobre Nós' })).toHaveAttribute('href', '/sobre')
    expect(screen.getByRole('link', { name: 'Econverse — Página inicial' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute('aria-disabled', 'true')
  })

  it('encaminha a submissão do formulário real', async () => {
    const onNewsletterSubmit = vi.fn().mockResolvedValue(undefined)
    render(<Footer onNewsletterSubmit={onNewsletterSubmit} />)
    const name = screen.getByPlaceholderText('Digite seu nome')
    const email = screen.getByPlaceholderText('Digite seu e-mail')
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito os termos e condições' })
    const user = userEvent.setup()
    await user.type(name, 'Maria')
    await user.type(email, 'maria@example.com')
    await user.click(checkbox)
    await user.click(screen.getByRole('button', { name: 'INSCREVER' }))
    expect(onNewsletterSubmit).toHaveBeenCalledWith({ name: 'Maria', email: 'maria@example.com', acceptedTerms: true })
  })
})
