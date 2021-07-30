import React from 'react'
import styles from './LoadingSpinner.module.scss'

interface Props {
    
}

export const LoadingSpinner = (props: Props) => {
    return (
        <div className={styles.spinner}>
            <div className={styles.spinny} />
        </div>
    )
}
