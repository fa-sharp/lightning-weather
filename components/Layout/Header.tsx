import React from 'react'
import Link from 'next/link'
import styles from './Header.module.scss'

interface HeaderProps {
    
}

const routeToSearch = '/search';

const Header = (props: HeaderProps) => {
    return (
        <nav className={styles.header}>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href={routeToSearch}>
                <a>Search</a>
            </Link>
        </nav>
    )
}

export default Header
