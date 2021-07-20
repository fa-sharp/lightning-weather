import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import MultiCityDisplay from '../components/MultiCityDisplay/MultiCityDisplay'
import useLocalStorage from '../data/useLocalStorage'
import styles from '../styles/Home.module.scss'

export default function Home() {

  const { savedCities, addCity, removeCity } = useLocalStorage();

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Lightning ⚡️ Weather
        </h1>

        <p className={styles.description}>
          Add cities from the <Link href="/search"><a>Search</a></Link> page!
        </p>

        {savedCities && <MultiCityDisplay cities={savedCities} units="imperial" removeCity={removeCity} />}

      </main>
    </Layout>
  )
}
