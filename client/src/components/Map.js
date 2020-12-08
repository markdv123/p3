import React, { useState, useEffect, useRef } from 'react'
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
   const [mapHandle, setMapHandle] = useState(null)
   const [showMem, setShowMem] = useState(null)
   const [publicView, setPublicView] = useState(false)
   const [zoomDefault, setZoomDefault] = useState(13)
      

   const styles = {
      width: '90%',
      height: 'calc(80vh - 80px)',
      position: 'relative',
      padding: '10px',
      margin: '0 auto',
      top: 'auto',
      bottom: 'auto',
   }


   useEffect(() => {
      if ( props.publicView ) {
         setPublicView(true)
         setShowMem( { location: { long: -100, lat: 40 } } )
         setZoomDefault( 3 )
         gotoMemory( { location: { long: -90, lat: 30 } } )
         return
      }
      // we want to start at the loc of the last memory, unless props.gotoMemory is !== -1, in which case we go to that memoryId
      let startMem = null
      if (props.gotoMemory >= 0) {
         startMem = props.memories.find((e) => (e.id === props.gotoMemory)) 
      } else if (props.memories.length) {
         startMem = props.memories[props.memories.length - 1] 
      }
      setShowMem ( startMem )  
      if ( startMem )
         gotoMemory ( startMem )
   }, [props.memories, props.gotoMemory])


   const gotoMemory = (memory) => {
      if (mapHandle)
         mapHandle.flyTo({
            center: [memory.location.long, memory.location.lat],
            speed: 1.5,
            curve: 1.3,
            zoom: [zoomDefault],
         })
   }

   const viewMemory = (e, m) => {
      if ( publicView) return

      const thisFeature = e.target.queryRenderedFeatures(e.point)[0]
      // call the callback from profiles to view a memory, just give it the thisFeature.properties.featureId
      props.viewMemory(thisFeature.properties.featureId)
   }

   const enterExit = () => {
      if ( publicView ) {
         // do a popup on hover?
      }
      setHover(!hoverFlag)
   }

   const createMemory = () => {
      if ( publicView ) return

      setPopup(false)
      // call the callback from profiles to create memories with popupLoc as the location
      props.createMemory({ lng: popupLoc.lng, lat: popupLoc.lat })
   }

   const handleMapClick = (map, event) => {
      if ( publicView ) return

      // if we're hovering, this event needs to be handled by ViewMemory, not me.
      if (hoverFlag) return
      if (hasPopup) {
         setPopup(false)
         return
      }
      setPopupLoc(event.lngLat)
      setPopup(true)
   }

   // get the handle for the map so we can flyTo the right memory.
   const checkMap = (map, event) => {
      if (mapHandle) return
      else {
         setMapHandle( map )
         if (showMem)
            gotoMemory(showMem)
      }
   }

   return (
      <div id="map">
         <MapView
            style="mapbox://styles/mapbox/dark-v10"
            containerStyle={styles}
            onClick={handleMapClick}
            onRender={checkMap}
         >
            <Layer
               type="symbol"
               id="marker"
               layout={{ 'icon-image': 'marker-15' }}
            >
               {props.memories.map((e) => (
                  <Feature
                     key={e.id}
                     coordinates={[e.location.long, e.location.lat]}
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
