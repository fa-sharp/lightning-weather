import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import addIcon from '../assets/addIcon.svg'
import Layout from '../components/Layout/Layout'
import MultiCityDisplay from '../components/MultiCityDisplay/MultiCityDisplay'
import useLocalStorage, { MAX_SAVED_CITIES } from '../data/useLocalStorage'
import { WeatherUnits } from '../data/DataTypes'
import styles from '../styles/Home.module.scss'
import Settings from '../components/Settings/Settings'

export default function Home() {

  const { savedCities, removeCity, options, changeOption } = useLocalStorage();

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
        
        {options && <Settings options={options} changeOption={changeOption} />}
      </main>
    </Layout>
  )
}
