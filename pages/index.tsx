import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import addIcon from '../assets/addIcon.svg'
import Layout from '../components/Layout/Layout'
import MultiCityDisplay from '../components/MultiCityDisplay/MultiCityDisplay'
import useLocalStorage from '../data/useLocalStorage'
import { WeatherUnits } from '../data/DataTypes'
import styles from '../styles/Home.module.scss'

export default function Home() {

  const { savedCities, addCity, removeCity } = useLocalStorage();

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Lightning ⚡️ Weather
        </h1>

        {savedCities && <MultiCityDisplay cities={savedCities} units={WeatherUnits.IMPERIAL} removeCity={removeCity} />}

        <Link href="/search">
          <a className={styles.addCityLink} title="Add City">
            <Image src={addIcon} alt="Add City Icon"></Image>
          </a>
        </Link>
      </main>
    </Layout>
  )
}
