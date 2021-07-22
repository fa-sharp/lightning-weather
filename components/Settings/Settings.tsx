import React from 'react'
import { ChangeUserOption, UserOptions, WeatherUnits } from '../../data/DataTypes'
import styles from './Settings.module.scss';

interface Props {
    options: UserOptions
    changeOption: ChangeUserOption
}

const Settings = ({options, changeOption}: Props) => {

    /** true/checked => use imperial units, false/unchecked => metric system */
    const currentUnits = (options.units === WeatherUnits.IMPERIAL);
    const changeUnits = (checked: boolean) => changeOption("units", checked ? WeatherUnits.IMPERIAL : WeatherUnits.METRIC);

    const currentColor = options.withColor;
    const changeColor = (withColor: boolean) => changeOption("withColor", withColor);

    return (
        <div>
            <label htmlFor={styles.units}>Units: </label>
            <input type="checkbox" name="Units" id={styles.units}
                checked={currentUnits} onChange={(e) => changeUnits(e.target.checked)} />
            
            <label htmlFor={styles.withColors}>Colors: </label>
            <input type="checkbox" name="Colors" id={styles.withColors}
                checked={currentColor} onChange={(e) => changeColor(e.target.checked)} />
        </div>
    )
}

export default Settings
