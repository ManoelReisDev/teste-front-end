import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button/Button'
import { Checkbox } from './Checkbox/Checkbox'
import { Input } from './Input/Input'
import { Label } from './Label/Label'
import { Link } from './Link/Link'

describe('controles compartilhados', () => {
  it('preserva o tipo padrão e impede a ação de um Button indisponível', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick} unavailable>Salvar</Button>)
    const button = screen.getByRole('button', { name: 'Salvar' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    await user.click(button)
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    expect(onClick).not.toHaveBeenCalled()
  })

  it('permite ativação do Button disponível e mantém disabled nativo', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)
    const button = screen.getByRole('button', { name: 'Salvar' })
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)

    render(<Button disabled>Bloqueado</Button>)
    expect(screen.getByRole('button', { name: 'Bloqueado' })).toBeDisabled()
  })

  it('preserva atributos nativos e permite edição no Input', async () => {
    const user = userEvent.setup()
    render(<Input aria-invalid="true" name="email" required type="email" />)
    const input = screen.getByRole('textbox')
    await user.type(input, ' pessoa@example.com ')
    expect(input).toHaveValue('pessoa@example.com')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('associa Label ao campo sem criar foco independente', async () => {
    const user = userEvent.setup()
    render(<><Label htmlFor="name" visuallyHidden>Nome</Label><Input id="name" /></>)
    const input = screen.getByLabelText('Nome')
    await user.click(screen.getByText('Nome'))
    expect(input).toHaveFocus()
    expect(screen.getByText('Nome')).not.toHaveAttribute('tabindex')
  })

  it('alterna Checkbox por label e teclado', async () => {
    const user = userEvent.setup()
    render(<><Label htmlFor="terms">Aceito</Label><Checkbox id="terms" /></>)
    const checkbox = screen.getByRole('checkbox', { name: 'Aceito' })
    await user.click(screen.getByText('Aceito'))
    expect(checkbox).toBeChecked()
    await user.click(checkbox)
    await user.keyboard(' ')
    expect(checkbox).toBeChecked()
  })

  it('renderiza links ativos e indisponíveis com semântica distinta', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<><Link href="/conta" onClick={onClick}>Conta</Link><Link onClick={onClick} unavailable>Em breve</Link></>)
    const active = screen.getByRole('link', { name: 'Conta' })
    expect(active).toHaveAttribute('href', '/conta')
    await user.click(active)
    expect(onClick).toHaveBeenCalledTimes(1)
    const unavailable = screen.getByRole('link', { name: 'Em breve' })
    expect(unavailable).not.toHaveAttribute('href')
    expect(unavailable).toHaveAttribute('aria-disabled', 'true')
    await user.click(unavailable)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('mantém Checkbox controlado pelo consumidor', async () => {
    const user = userEvent.setup()
    function Controlled() {
      const [checked, setChecked] = useState(false)
      return <Checkbox aria-label="controlado" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
    }
    render(<Controlled />)
    const checkbox = screen.getByRole('checkbox', { name: 'controlado' })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    fireEvent.change(checkbox, { target: { checked: false } })
    expect(checkbox).not.toBeChecked()
  })
})
