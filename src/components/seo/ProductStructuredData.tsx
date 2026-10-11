import type { Product } from '../../features/products/types'

type ProductsJsonLdProps = {
  products: Product[]
}

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
    name: 'Seleção de produtos Econverse',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: entries.length,
    itemListElement: entries,
  }
}

function safelySerialize(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export function ProductStructuredData({ products }: ProductsJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safelySerialize(createCatalogMarkup(products)) }}
    />
  )
}
