import { describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Newsletter } from './Newsletter'

async function fillValidForm() {
  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText('Digite seu nome'), '  Ana Silva  ')
  await user.type(screen.getByPlaceholderText('Digite seu e-mail'), ' ana@example.com ')
  await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }))
  return user
}

describe('Newsletter', () => {
  it('mantém os campos usáveis e o envio indisponível sem callback', async () => {
    const user = userEvent.setup()
    render(<Newsletter />)
    await user.type(screen.getByPlaceholderText('Digite seu nome'), 'Ana')
    expect(screen.getByDisplayValue('Ana')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'INSCREVER' })).toHaveAttribute('aria-disabled', 'true')
    await user.click(screen.getByRole('button', { name: 'INSCREVER' }))
    expect(screen.queryByRole('status', { name: /enviando/i })).not.toBeInTheDocument()
  })

  it('valida consentimento, normaliza dados e encaminha a inscrição', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<Newsletter onSubmit={onSubmit} />)
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Digite seu nome'), '  Ana Silva  ')
    await user.type(screen.getByPlaceholderText('Digite seu e-mail'), ' ana@example.com ')
    await user.click(screen.getByRole('button', { name: 'INSCREVER' }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Aceite os termos')
    await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }))
    await user.click(screen.getByRole('button', { name: 'INSCREVER' }))
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Ana Silva', email: 'ana@example.com', acceptedTerms: true })
  })

  it('bloqueia duplicação durante callback pendente e anuncia rejeição', async () => {
    let resolve: () => void = () => {}
    const pending = new Promise<void>((done) => { resolve = done })
    const onSubmit = vi.fn().mockReturnValue(pending)
    render(<Newsletter onSubmit={onSubmit} />)
    const user = await fillValidForm()
    const button = screen.getByRole('button', { name: 'INSCREVER' })
    await user.click(button)
    await user.click(button)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(button).toBeDisabled()
    resolve()
    await pending

    cleanup()
    const failing = vi.fn().mockRejectedValue(new Error('offline'))
    render(<Newsletter onSubmit={failing} />)
    const user2 = await fillValidForm()
    await user2.click(screen.getByRole('button', { name: 'INSCREVER' }))
    expect(await screen.findByRole('status')).toHaveTextContent('Não foi possível concluir o envio')
    expect(screen.getByDisplayValue('Ana Silva')).toBeInTheDocument()
  })

  it('gera IDs independentes para duas instâncias', () => {
    render(<><Newsletter /><Newsletter /></>)
    const fields = screen.getAllByRole('textbox')
    expect(new Set(fields.map((field) => field.id)).size).toBe(fields.length)
  })
})
