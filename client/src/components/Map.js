import React, {useState, useEffect, useRef} from 'react';
import mapboxgl from 'mapbox-gl'
import Nav from './Nav'

function Map(props) {
    const mapContainer = useRef(null)
    
    const styles = {
        width: "80vw",
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
            })

        map.on('click', function(e){
            const newMarker = new mapboxgl.Marker()
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .addTo(map)
                .setPopup(new mapboxgl.Popup({closeButton: false}).setHTML(
                    `<p>Make a memory here?</p><button id="newYes">Yes</button><button id="newNo">No</button>`
                ))
                .togglePopup()
            console.log(e.lngLat)
            const yesButton = document.querySelector('#newYes')
            yesButton.addEventListener('click', ()=> {
                console.log('YES')
            })
            const noButton = document.querySelector('#newNo') 
            noButton.addEventListener('click', ()=> {
                console.log('no')
                newMarker.remove()
            })
        })        
    }, [])


    return (
        <div>
            <Nav />
            <div ref={el => mapContainer.current = el} style={styles}/>
        </div>
    )
}

export default Map
