import { useState } from 'react'
import { Footer } from '../../components/layout/Footer/Footer'
import { Header } from '../../components/layout/Header/Header'
import { BrandList } from '../../components/BrandList/BrandList'
import { CategoryList } from '../../components/CategoryList/CategoryList'
import { HeroBanner } from '../../components/HeroBanner/HeroBanner'
import { PartnerBanners } from '../../components/PartnerBanners/PartnerBanners'
import { ProductShelf } from '../../components/ProductShelf/ProductShelf'
import { ProductModal } from '../../components/ProductModal/ProductModal'
import { ProductStructuredData } from '../../components/seo/ProductStructuredData'
import type { Product } from '../../features/products/types'
import { useProducts } from '../../features/products/useProducts'
import styles from './Home.module.scss'

export function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { state, retry } = useProducts()
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroBanner />
        <CategoryList />
        <ProductShelf onRetry={retry} onSelect={setSelectedProduct} state={state} variant="tabs" />
        <PartnerBanners />
        <ProductShelf onRetry={retry} onSelect={setSelectedProduct} state={state} />
        <PartnerBanners title="Mais parceiros" />
        <BrandList />
        <ProductShelf onRetry={retry} onSelect={setSelectedProduct} state={state} />
        <ProductModal onClose={() => setSelectedProduct(null)} product={selectedProduct} />
      </main>
      {state.status === 'success' && <ProductStructuredData products={state.products} />}
      <Footer />
    </div>
  )
}
