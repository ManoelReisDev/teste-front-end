import { Footer } from '../../components/layout/Footer/Footer'
import { Header } from '../../components/layout/Header/Header'
import { BrandList } from './BrandList/BrandList'
import { HeroBanner } from './HeroBanner/HeroBanner'
import styles from './Home.module.scss'

export function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroBanner />
        <BrandList />
      </main>
      <Footer />
    </div>
  )
}
