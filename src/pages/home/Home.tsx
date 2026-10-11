import { Footer } from '../../components/layout/Footer/Footer'
import { Header } from '../../components/layout/Header/Header'
import { BrandList } from './BrandList/BrandList'
import { CategoryList } from './CategoryList/CategoryList'
import { HeroBanner } from './HeroBanner/HeroBanner'
import styles from './Home.module.scss'

export function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroBanner />
        <CategoryList />
        <BrandList />
      </main>
      <Footer />
    </div>
  )
}
