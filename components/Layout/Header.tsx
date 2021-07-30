import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'
import settingsStyles from '../Settings/Settings.module.scss'
import Settings from '../Settings/Settings'
import { useAppContext } from '../../context/AppContext';

const Header = () => {

    const appContext = useAppContext();
    const [showSettings, setShowSettings] = useState(false);

    /** Listen for 'outside-menu' click events to automatically close the settings menu */
    const closeSettingsOnOutsideClick = (event: MouseEvent) => {
        const targetElement = event.target as HTMLElement;

        // If we can't find the Settings component or button in the target element's ancestors (i.e. user clicked outside the settings), close the menu
        if(!targetElement.closest(`.${settingsStyles.settings}, #settingsButton`))
            setShowSettings(false);
    }

    useEffect(() => {
        document.addEventListener('click', closeSettingsOnOutsideClick)
        return () => {
            document.removeEventListener('click', closeSettingsOnOutsideClick);
        }
    }, [])

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
                <button id="settingsButton" onClick={() => setShowSettings(!showSettings)}>
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
