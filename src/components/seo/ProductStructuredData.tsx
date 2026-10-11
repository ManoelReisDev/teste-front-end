import type { Product } from '../../features/products/types'

type ProductStructuredDataProps = {
  products: Product[]
}

// O ItemList descreve a vitrine da Home sem transformar a página em um Product individual;
// cada entrada ainda recebe os dados de oferta necessários para buscadores.
type CatalogEntry = {
  '@type': 'ListItem'
  position: number
  item: {
    '@type': 'Product'
    name: string
    description: string
    image: string
    offers: {
      '@type': 'Offer'
      priceCurrency: 'BRL'
      price: string
      availability: 'https://schema.org/InStock'
    }
  }
}

function createCatalogMarkup(products: Product[]) {
  // O preço da API é armazenado em centavos, enquanto Schema.org espera uma string decimal.
  const entries: CatalogEntry[] = products.map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.photo,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'BRL',
        price: (product.price / 100).toFixed(2),
        availability: 'https://schema.org/InStock',
      },
    },
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': '/#product-list',
    name: 'Seleção de produtos Econverse',
    url: '/',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: entries.length,
    itemListElement: entries,
  }
}

function safelySerialize(value: unknown) {
  // Escapa caracteres interpretados como HTML antes de inserir o JSON-LD no documento.
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export function ProductStructuredData({ products }: ProductStructuredDataProps) {
  // O bloco só é renderizado após a API carregar para evitar dados estruturados vazios ou fictícios.
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safelySerialize(createCatalogMarkup(products)) }}
    />
  )
}
