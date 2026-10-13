import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { BrandList } from './BrandList/BrandList'
import { HeroBanner } from './HeroBanner/HeroBanner'
import { PartnerBanners } from './PartnerBanners/PartnerBanners'
import { PartnerCard } from './PartnerBanners/PartnerCard/PartnerCard'
import { ProductStructuredData } from './structured-data/ProductStructuredData'
import { products } from '../test/fixtures/products'

describe('seções e dados estruturados', () => {
  it('mantém título e destino do HeroBanner', () => {
    render(<HeroBanner />)
    expect(screen.getByRole('heading', { name: 'Venha conhecer nossas promoções' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver produto' })).toHaveAttribute('href', '#ofertas')
    expect(document.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('expõe marcas com nomes acessíveis distintos', () => {
    render(<BrandList />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
    expect(new Set(links.map((link) => link.getAttribute('aria-label'))).size).toBe(5)
  })

  it('preserva títulos, descrição e destinos dos parceiros', () => {
    render(<><PartnerBanners title="Parceiros especiais" /><PartnerCard id="custom" /></>)
    expect(screen.getByRole('region', { name: 'Parceiros especiais' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Confira: Parceiros' }).at(-1)).toHaveAttribute('href', '#custom')
    expect(screen.getAllByRole('img', { name: /Loja parceira/ })).toHaveLength(3)
  })

  it('serializa ItemList e escapa conteúdo perigoso no JSON-LD', () => {
    const dangerous = { ...products[0], name: '</script><script>alert(1)</script>', description: 'A & B < C' }
    render(<ProductStructuredData products={[dangerous]} />)
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const markup = script?.textContent ?? ''
    expect(markup).toContain('\\u003c/script\\u003e')
    const parsed = JSON.parse(markup) as { numberOfItems: number; itemListElement: Array<{ item: { name: string; offers: { price: string } } }> }
    expect(parsed.numberOfItems).toBe(1)
    expect(parsed.itemListElement[0]?.item.name).toBe(dangerous.name)
    expect(parsed.itemListElement[0]?.item.offers.price).toBe('199.99')
  })
})
