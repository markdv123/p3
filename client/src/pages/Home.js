import React, { useEffect, useState } from 'react'
import { Button, Icon, Grid } from '@material-ui/core'
import Nav from '../components/Nav'
import Map from '../components/Map'
import { __GetPublicMemories } from '../services/MemoryService'
import '../styles/Home.css'
const Home = (props) => {
   const [memories, setMemories] = useState([])

   useEffect(() => {
      getMemories()
   }, [])

   const getMemories = async () => {
      try {
         const res = await __GetPublicMemories()
         setMemories(res)
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
         <div style={{ textAlign: 'center' }}>
            <Grid container justify="center" style={{ margin: '5px' }}>
               <Grid item xs={6}>
                  <Map  className="map" {...props} memories={memories} publicView={true} />
               </Grid>
               <Grid item xs={6}>
                  <h1>Welcome to Gaiary</h1>
                  <h2>Your Diary of the Earth</h2>
                  <p className="description">
                     Gaiary is a wonderful new app designed to help users
                     visually keep track of precious memories on a global map!
                     In your profile page, a personal interactive map will
                     appear. Click on it to create a new memory pin. Over time,
                     you can see your map fill up with all of the chosen
                     memories from your life!
                  </p>
                  {!props.authenticated ? (
                     <div style={{margin: '10px'}}>
                        <Button
                           href="/register"
                           variant="contained"
                        
                           endIcon={<Icon>person_add</Icon>}
                           style={{ margin: '0px 20px', backgroundColor: '#9a9a9a', color:'white' }}
                        >
                           Get Started
                        </Button>
                        <Button
                           href="/login"
                           variant="contained"
                          
                           endIcon={<Icon>person</Icon>}
                           style={{ margin: '0px 20px', backgroundColor: '#9a9a9a', color:'white' }}
                        >
                           Sign In
                        </Button>
                     </div>
                  ) : null}
               </Grid>
            </Grid>
         </div>
      </div>
   )
}

export default Home
