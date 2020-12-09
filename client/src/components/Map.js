import React, { useState, useEffect } from 'react'
import ReactMapBoxGl, { Layer, Feature, Popup } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { makeStyles, FormControl, InputLabel, MenuItem, Select, Grid } from '@material-ui/core'
import { __GetAllTags } from '../services/TagService'

const mapStyles = [
   {
      name: 'Streets',
      url: 'mapbox://styles/markdv/ckihxfc0b0wje19kiqiehdsn9'
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
      url: 'mapbox://styles/markdv/ckihxtc20038u19r3k38x61ce'
   },
   {
      name: 'Midnight',
      url: 'mapbox://styles/markdv/ckihxujca2agd19oij6g7y48n'
   },
   {
      name: 'Bubblegum',
      url: 'mapbox://styles/markdv/ckihxvr9i2a4119sa12a7y2xk'
   },
   {
      name: 'Sky',
      url: 'mapbox://styles/markdv/ckihxwue410xo19szzmaxchz0'
   },
   {
      name: 'Golden',
      url: 'mapbox://styles/markdv/ckihxy1zf10yt19szc7f8icz7'
   },
   {
      name: 'Light',
      url: 'mapbox://styles/markdv/ckihxz9um16hv19nwrph95mcn'
   }
]

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}))

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
   const [style, setStyle] = useState(mapStyles[0].url)
   const classes = (useStyles)

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

   const handleStyle = ({ target }) => {
      setStyle(target.value)
   }

   return (
      <div id="map">
         <Grid container justify="start" alignItems="center">
            <p>Map Style:</p>
            <FormControl className={classes.formControl} style={{margin: '5px'}}>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={style}
                  onChange={handleStyle}
               >
                  {mapStyles.map((style) => (
                     <MenuItem value={style.url}>{style.name}</MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Grid>
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
