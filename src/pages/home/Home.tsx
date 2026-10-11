import { useState } from 'react'
import { Footer } from '../../components/layout/Footer/Footer'
import { Header } from '../../components/layout/Header/Header'
import { BrandList } from './BrandList/BrandList'
import { CategoryList } from './CategoryList/CategoryList'
import { HeroBanner } from './HeroBanner/HeroBanner'
import { PartnerBanners } from './PartnerBanners/PartnerBanners'
import { ProductShelf } from './ProductShelf/ProductShelf'
import { ProductModal } from './ProductModal/ProductModal'
import type { Product } from '../../features/products/types'
import styles from './Home.module.scss'

export function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroBanner />
        <CategoryList />
        <ProductShelf onSelect={setSelectedProduct} withTabs />
        <PartnerBanners />
        <BrandList />
        <ProductModal onClose={() => setSelectedProduct(null)} product={selectedProduct} />
      </main>
      <Footer />
    </div>
  )
}
