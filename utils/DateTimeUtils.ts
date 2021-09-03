
const shortDayFormatter = new Intl.DateTimeFormat('default', {weekday: 'short', timeZone: 'UTC'});
const longDayFormatter = new Intl.DateTimeFormat('default', {weekday: 'long', timeZone: 'UTC'});
const hourFormatter = new Intl.DateTimeFormat('default', {hour: 'numeric', timeZone: 'UTC'});
const timeFormatter = new Intl.DateTimeFormat('default', {hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});
const dayTimeFormatter = new Intl.DateTimeFormat('default', {weekday: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'UTC'});

/** Returns the day of the week as a simple number */
export const getLocalDay = (time: number, timeOffset: number) => new Date((time*1000) + (timeOffset*1000)).getUTCDay();

/** Gets the formatted local day in short form (e.g. 'Mon', 'Tue'..), given the UTC time and time offset from OpenWeatherAPI */
export const getFormattedLocalDay = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedDay = shortDayFormatter.format(localTime);
    return formattedDay;
}

/** Gets the formatted local day in long form (e.g. 'Monday'), given the UTC time and time offset from OpenWeatherAPI */
export const getFormattedLocalDayLong = (time: number, timeOffset: number) => {
    const localTime = new Date((time*1000) + (timeOffset*1000));
    const formattedDay = longDayFormatter.format(localTime);
    return formattedDay;
}

/** Returns the hour as a simple number */
export const getLocalHour = (time: number, timeOffset: number) => new Date((time*1000) + (timeOffset*1000)).getUTCHours();


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

/** Gets the current local time (short day, hours & minutes) in a timezone, given the time offset from OpenWeatherAPI */
export const getFormattedCurrentLocalTime = (timeOffset: number) => {
    const localTime = new Date(Date.now() + (timeOffset*1000));
    const formattedTime = dayTimeFormatter.format(localTime);
    return formattedTime;
}

export const getCurrentLocalHour = (timeOffset: number) => new Date(Date.now() + (timeOffset*1000)).getUTCHours();

/** Returns the formatted time (hours and minutes) in the given time offset */
export const getFormattedLocalTime = (time: number, timeOffset: number) => {
    const formattedTime = timeFormatter.format((time*1000)+(timeOffset*1000));
    return formattedTime;
}