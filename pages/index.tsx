import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import MultiCityDisplay from '../components/MultiCityDisplay/MultiCityDisplay'
import { MAX_SAVED_CITIES } from '../data/useLocalStorage'
import styles from '../styles/Home.module.scss'
import { useAppContext } from '../context/AppContext'

export default function Home() {

  const appContext = useAppContext();
  if (!appContext) return;

  const { savedCities, removeCity, options } = appContext;

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Lightning ⚡️ Weather
        </h1>

        {options && <MultiCityDisplay cities={savedCities} units={options.units} 
          withColor={options.withColor} removeCity={removeCity} />}

        {(savedCities.length < MAX_SAVED_CITIES) &&
          <Link href="/search">
            <a className={styles.addCityLink} aria-label="Add City" title="Add City">
              <span className="material-icons md-48 gray-hover">add_circle</span>
            </a>
          </Link>}
      </main>
    </Layout>
  )
}
