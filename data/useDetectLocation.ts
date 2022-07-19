import { useEffect, useState } from "react";


const useDetectLocation = ({ enabled }: { enabled: boolean }) => {

    const [geoLocation, setGeoLocation] = useState<null | { 
        lat: number, lon: number 
    }>(null);

    useEffect(() => {
        if (!enabled || !navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((geoData) => {
            setGeoLocation({
                lat: geoData.coords.latitude,
                lon: geoData.coords.longitude
            })
        })
    }, [enabled])

    return { geoLocation };
}


export default useDetectLocation;