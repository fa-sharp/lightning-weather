import React from 'react'
import styles from './Header.module.scss'

interface HeaderProps {
    
}

const Header = (props: HeaderProps) => {
    return (
        <div className={styles.header}>
            <a href="http://google.com" target="_blank" rel="noopener noreferrer">Sample Link</a>
            <a href="http://google.com" target="_blank" rel="noopener noreferrer">Sample Link</a>
        </div>
    )
}

export default Header
