
const dayFormatter = new Intl.DateTimeFormat('default', {weekday: 'short', timeZone: 'UTC'});
const hourFormatter = new Intl.DateTimeFormat('default', {hour: "numeric", timeZone: 'UTC'});
const timeFormatter = new Intl.DateTimeFormat('default', {weekday: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});

/** Gets the formatted local hour in a timezone, given the UTC time and time offset from OpenWeatherAPI */
export const getFormattedLocalDay = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedDay = dayFormatter.format(localTime);
    return formattedDay;
}

/** Returns the hour as a simple number */
export const getLocalHour = (time: number, timeOffset: number) => new Date((time*1000) + (timeOffset*1000)).getUTCHours();

/** Returns the day of the week as a simple number */
export const getLocalDay = (time: number, timeOffset: number) => new Date((time*1000) + (timeOffset*1000)).getUTCDay();

/**
 * Gets the formatted local hour in a timezone, given the UTC time and time offset from OpenWeatherAPI
 * @param time time in UTC in seconds 
 * @param timeOffset time offset indicating the timezone
 * @returns formatted hour
 */
export const getFormattedLocalHour = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedHour = hourFormatter.format(localTime);
    return formattedHour;
}

/** Gets the current local time in a timezone, given the time offset from OpenWeatherAPI */
export const getFormattedCurrentLocalTime = (timeOffset: number) => {
    const localTime = new Date(Date.now() + (timeOffset*1000));
    const formattedTime = timeFormatter.format(localTime);
    return formattedTime;
}

export const getCurrentLocalHour = (timeOffset: number) => new Date(Date.now() + (timeOffset*1000)).getUTCHours();