import { Footer } from '../../components/layout/Footer/Footer'
import { Header } from '../../components/layout/Header/Header'
import styles from './Home.module.scss'

export function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1>Teste Front-end Econverse</h1>
      </main>
      <Footer />
    </div>
  )
}
