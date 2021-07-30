import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import Settings from '../Settings/Settings'
import { useAppContext } from '../../context/AppContext';

const Header = () => {

    const appContext = useAppContext();
    const [showSettings, setShowSettings] = useState(false);

    return (
        <nav className={styles.header}>
            <div className={styles.navLeft}>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/search">
                    <a>Search</a>
                </Link>
            </div>
            <div className={styles.navRight}>
                <button id={styles.settingsButton} onClick={() => setShowSettings(!showSettings)}>
                    <span className="material-icons">settings</span>
                </button>
            </div>
            {appContext && appContext.options &&
                <Settings options={appContext.options}
                    changeOption={appContext.changeOption}
                    showing={showSettings}
                />}
        </nav>
    )
}

export default Header
