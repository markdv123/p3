import React, { useState, useEffect } from 'react'
import ReactMapBoxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapView = ReactMapBoxGl({
   accessToken:
      'pk.eyJ1IjoibWFya2R2IiwiYSI6ImNraWFubmhzbjAxb3IyeWsyODQ2cXBvbmUifQ.huPMP5ZK_GUqsbjHTgXRcw',
})

function Map(props) {
   const [hoverFlag, setHover] = useState(false)
   const [hasPopup, setPopup] = useState(false)
   const [popupLoc, setPopupLoc] = useState([0, 0])

   const styles = {
      width: '90%',
      height: 'calc(80vh - 80px)',
      position: 'relative',
      padding: '10px',
      margin: '0 auto',
      top: 'auto',
      bottom: 'auto',
   }

   useEffect(() => {}, [])

   const viewMemory = (e, m) => {
      console.log ('m', m)
      const thisFeature = e.target.queryRenderedFeatures(e.point)[0]
      // console.log(thisFeature)
      // console.log('fId is', thisFeature.properties.featureId)
      // call the callback from profiles to view a memory, just give it the thisFeature.properties.featureId
      console.log ( `props.viewMemory(${thisFeature.properties.featureId})`)
   }

   const enterExit = () => {
      setHover(!hoverFlag)
   }

   const createMemory = () => {
      setPopup(false)
      // call the callback from profiles to create memories with popupLoc as the location
      console.log ( `props.createMemory(${popupLoc})`)
   }

   const handleMapClick = (map, event) => {
      if (hoverFlag) return

      if (hasPopup) {
         setPopup(false)
         return
      }
      setPopupLoc(event.lngLat)
      setPopup(true)
   }

   return (
      <div id="map">
         <MapView
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={styles}
            onClick={handleMapClick}
         >
            <Layer
               type="symbol"
               id="marker"
               layout={{ 'icon-image': 'marker-15' }}
            >
               {props.memories.map((e) => (
                  <Feature
                     key={e.id}
                     coordinates={[e.location.lng, e.location.lat]}
                     onClick={viewMemory}
                     onMouseEnter={enterExit}
                     onMouseLeave={enterExit}
                     properties={{ featureId: e.id }}
                  />
               ))}
            </Layer>
            {hasPopup ? (
               <Popup coordinates={popupLoc}>
                  <div>
                     <div>Do you want to create a new Memory?</div>
                     <button onClick={createMemory}>Yes!</button>
                  </div>
               </Popup>
            ) : null}
         </MapView>
      </div>
   )
}

export default Map
