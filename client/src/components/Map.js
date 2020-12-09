import React, { useState, useEffect } from 'react'
import ReactMapBoxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { __GetAllTags } from '../services/TagService'

const mapStyles = [
   {
      name: 'Streets',
      url: 'mapbox://styles/markdv/ckihsflpg6fv919p9p388gawa'
   },
   {
      name: 'Outdoors',
      url: 'mapbox://styles/markdv/ckihshgfc114p19nw7fic3zns'
   },
   {
      name: 'Satellite',
      url: 'mapbox://styles/markdv/ckihs41et24kh1bp7bd2y9w6r'
   },
   {
      name: 'Dark',
      url: 'mapbox://styles/markdv/ckihsv6426m6d19t0wkajeq0l'
   },
   {
      name: 'Midnight',
      url: 'mapbox://styles/markdv/ckihswznz6gc119p977yjes0i'
   },
   {
      name: 'Bubblegum',
      url: 'mapbox://styles/markdv/ckiagvwfa0o8u19qgxqkrjyr2'
   },
   {
      name: 'Sky',
      url: 'mapbox://styles/markdv/ckiht9iuj0w2g19o9uvtw46dt'
   },
   {
      name: 'Golden',
      url: 'mapbox://styles/markdv/ckihtc3t525q91bp7278ol5ps'
   },
   {
      name: 'Light',
      url: 'mapbox://styles/markdv/ckihto26512f719rg77ktky5s'
   }
]

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
   const [allTags, setAllTags] = useState([])
   const [style, setStyle] = useState(mapStyles[1].url)

   const styles = {
      width: '90%',
      height: 'calc(80vh - 80px)',
      position: 'relative',
      padding: '10px',
      margin: '0 auto',
      top: 'auto',
      bottom: 'auto',
   }

   const tagName = (tagId) => allTags.find((e) => e.id === tagId).name

   const tagString = (tags) => {
      let tmp = ''
      tags.forEach((e, i) =>
         i === 0 ? (tmp += tagName(e)) : (tmp += ` - ${tagName(e)}`)
      )
      return tmp
   }

   const getTags = async () => {
      try {
         const res = await __GetAllTags()
         setAllTags(res)
      } catch (err) {
         throw err
      }
   }

   // get the handle for the map so we can flyTo the right memory.
   const getMap = (map, event) => {
      setMapHandle(map)
      if (showMem) gotoMemory(showMem)
   }

   const defaultView = () => {
      if (mapHandle) {
         mapHandle.jumpTo({
            center: [-40, 20],
            zoom: 1,
         })
      }
   }

   useEffect(() => {
      if (props.publicView) {
         setPublicView(true)
         defaultView()
         getTags()
         return
      }
      // we want to start at the loc of the last memory, unless props.gotoMemory is !== -1, in which case we go to that memoryId
      let startMem = null
      if (props.gotoMemory >= 0) {
         startMem = props.memories.find((e) => e.id === props.gotoMemory)
         setShowMem(startMem)
         if (startMem) gotoMemory(startMem)
      } else {
         // if we're not supposed to go to a specific memory, then reset.
         defaultView()
      }
      
   }, [props.memories, props.gotoMemory, props.publicView, mapHandle])

   const gotoMemory = (memory) => {
      if (mapHandle)
         mapHandle.flyTo({
            center: [memory.location.long, memory.location.lat],
            speed: 1.5,
            curve: 1.3,
            zoom: [13],
         })
   }

   const viewMemory = (e, m) => {
      if (publicView) return

      const thisFeature = e.target.queryRenderedFeatures(e.point)[0]
      // call the callback from profiles to view a memory, just give it the thisFeature.properties.memoryId
      props.viewMemory(thisFeature.properties.memoryId)
   }

   const hover = (e, m) => {
      if (publicView) {
         // do a popup on hover
         if (!hoverFlag) {
            // we are just starting to hover
            const memoryId = e.feature.properties.memoryId
            const memory = props.memories.find((e) => e.id === memoryId)
            setShowMem(memory)

            setPopupLoc({ lng: memory.location.long, lat: memory.location.lat })
            setPopup(true)
         } else {
            setPopup(false)
         }
      }
      setHover(!hoverFlag)
   }

   const createMemory = () => {
      if (publicView) return

      setPopup(false)
      // call the callback from profiles to create memories with popupLoc as the location
      props.createMemory({ lng: popupLoc.lng, lat: popupLoc.lat })
   }

   const handleMapClick = (map, event) => {
      if (publicView) return

      // if we're hovering, this event needs to be handled by ViewMemory, not me.
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
            style={style}
            containerStyle={styles}
            onClick={handleMapClick}
            onStyleLoad={getMap}
         >
            <Layer
               type="symbol"
               id="marker"
               layout={{ 'icon-image': 'custom-marker-2' }}
            >
               {props.memories.map((e) => (
                  <Feature
                     key={e.id}
                     coordinates={[e.location.long, e.location.lat]}
                     onClick={viewMemory}
                     onMouseEnter={hover}
                     onMouseLeave={hover}
                     properties={{ memoryId: e.id }}
                  />
               ))}
            </Layer>
            {hasPopup ? (
               publicView ? (
                  <Popup
                     coordinates={[showMem.location.long, showMem.location.lat]}
                  >
                     <div>
                        <h3>{`${showMem.user}'s Memory!`}</h3>
                        <h4>{showMem.name}</h4>
                        <p>{showMem.description}</p>
                        <p>{tagString(showMem.tags)}</p>
                     </div>
                  </Popup>
               ) : (
                  <Popup coordinates={popupLoc}>
                     <div>
                        <div>Do you want to create a new Memory?</div>
                        <button onClick={createMemory}>Yes!</button>
                     </div>
                  </Popup>
               )
            ) : null}
         </MapView>
      </div>
   )
}

export default Map
