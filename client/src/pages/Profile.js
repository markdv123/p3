import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Container } from '@material-ui/core'
import Map from '../components/Map'
import Nav from '../components/Nav'
import Memory from '../components/Memory'
import { __GetMemories, __DeleteMemory } from '../services/MemoryService'

function Profile(props) {
   const [memories, setMemories] = useState([])
   const [gotoMemory, setGoto] = useState(-1)
   const [newLoc, setNewLoc] = useState( { lng: 0, lat: 0 })
   const [viewMem, setViewMem] = useState ( -1 )
   const [mode, setMode] = useState( 'list' )

   useEffect(() => {
      getMems()
      console.log ('in profile.useEffect', props.match.params)
   }, [props])


   const getMems = async () => {
      try {
         const res = await __GetMemories(props.currentUser.id)
         setMemories(res)
      } catch (error) {
         throw error
      }
   }

   const createMemory = (location) => {
      setNewLoc( { lng: location.lng, lat: location.lat })
      setMode ( 'create' )
   }

   const viewMemory = (memoryId) => {
      setViewMem ( memoryId )
      setMode ( 'view' )
   }

   const setGotoMem = (mem) => {
       setGoto(mem)
       setViewMem(mem)
       setMode('view')
   }

   const resetMode = () => {
      setMode('list')
  }

   const deleteMem = async (memoryId) => {
       try {
           await __DeleteMemory(memoryId)
           setMode('list')
           await getMems()
       } catch (error) {
           throw error
       }
   }


   return (
      <div>
         <Nav
            authenticated={props.authenticated}
            {...props}
            currentUser={props.currentUser}
         />
         <div style={{ display: 'flex', margin: '0px 30px' }} justify='space-around'>
            <Grid xs={12} sm={6} style={{marginRight: '15px'}} justify='space-around'>
               <div className="map center">
                  <Map
                     {...props}
                     memories={memories}
                     createMemory={createMemory}
                     viewMemory={viewMemory}
                     gotoMemory={gotoMemory}
                  />
               </div>
            </Grid>
            <Grid xs={12} sm={6} style={{marginLeft: '15px'}} justify='space-around'>
               <Memory
                  memories={memories}
                  authenticated={props.authenticated}
                  currentUser={props.currentUser}
                  mode={mode}
                  deleteMem={deleteMem}
                  viewMem={ mode === 'view' ? viewMem : '' }
                  newLoc={ mode === 'create' ? newLoc : '' }
                  setGotoMem={setGotoMem}
                  resetMode={resetMode}
               />
            </Grid>
         </div>
      </div>
   )
}
export default withRouter(Profile)
