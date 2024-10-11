import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

// Make sure to set the mapbox token here
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

const DLMap = () => {
    const mapContainerRef = useRef(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current, // Reference to the map container
            style: 'mapbox://styles/mapbox/streets-v11', // Map style
            center: [-74.5, 40], // Initial map center [lng, lat]
            zoom: 9, // Initial zoom level
        })

        // Cleanup on unmount
        return () => map.remove()
    }, [])

    return (
        <div
            ref={mapContainerRef}
            className="w-full h-screen" // Tailwind CSS for full-width and height
        />
    )
}

export default DLMap
