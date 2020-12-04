import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl'

function Map(props) {
    const mapContainer = useRef(null)
    
    const styles = {
        width: "100vw",
        height: "calc(100vh - 80px)",
        position: "absolute"
      }

    useEffect(()=> {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2R2IiwiYSI6ImNraWFubmhzbjAxb3IyeWsyODQ2cXBvbmUifQ.huPMP5ZK_GUqsbjHTgXRcw'
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [5, 34],
            zoom: 2
            });
    }, [])

    return (
        <div>
            <div ref={el => mapContainer.current = el} style={styles}/>
        </div>
    )
}

export default Map
