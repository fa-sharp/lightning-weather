import { FormGroup, Grid, makeStyles, Switch } from '@material-ui/core';
import React from 'react'
import { ChangeUserOption, UserOptions, WeatherUnits } from '../../data/DataTypes'
import styles from './Settings.module.scss';

interface Props {
    options: UserOptions
    changeOption: ChangeUserOption
    showing: boolean
}

const useStyles = makeStyles({
    switchBase: {
        color: "var(--blue-medium)",
        '&$checked': {
            color: "var(--blue-medium)",
        },
        '&$checked + $track': {
            backgroundColor: "var(--blue-medium)",
        }
    },
    checked: {},
    track: {backgroundColor: "var(--blue-light)"}
});


const Settings = ({options, changeOption, showing}: Props) => {

    /** true/checked => use imperial units, false/unchecked => metric system */
    const currentUnits = (options.units === WeatherUnits.IMPERIAL);
    const changeUnits = (checked: boolean) => changeOption("units", checked ? WeatherUnits.IMPERIAL : WeatherUnits.METRIC);

    const toggleColor = (enabled: boolean) => changeOption("withColor", enabled);
    const toggleDetectLocation = (enabled: boolean) => changeOption("detectLocation", enabled);

    const muiClasses = useStyles();

    return (
        <div className={`${styles.settings} ${showing ? styles.showing : ""}`}>
            <FormGroup style={{alignItems: "flex-start", gap: 3 }}>
                <Grid component="label" container alignItems="center" spacing={0}>
                    <Grid item><b>Units: </b>Metric</Grid>
                    <Grid item>
                        <Switch checked={currentUnits} name="unitsOption" size="small"
                            onChange={(e) => changeUnits(e.target.checked)}
                            classes={{switchBase: muiClasses.switchBase, checked: muiClasses.checked, track: muiClasses.track}} ></Switch>
                    </Grid>
                    <Grid item>Imperial</Grid>
                </Grid>
                <Grid component="label" container alignItems="center" spacing={0}>
                    <Grid item><b>Location: </b>Off</Grid>
                    <Grid item>
                    <Switch checked={options.detectLocation} name="detectLocation" size="small"
                        onChange={(e) => toggleDetectLocation(e.target.checked)} /></Grid>
                    <Grid item>On</Grid>
                </Grid>
                <Grid component="label" container alignItems="center" spacing={0}>
                    <Grid item><b>Colors: </b>Less</Grid>
                    <Grid item>
                    <Switch checked={options.withColor} name="colorOption" size="small"
                        onChange={(e) => toggleColor(e.target.checked)} /></Grid>
                    <Grid item>More</Grid>
                </Grid>
            </FormGroup>
        </div>
    )
}

export default Settings
