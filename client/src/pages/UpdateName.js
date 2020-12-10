import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon, Grid } from '@material-ui/core'

import { __UpdateName } from '../services/UserService'
import TextInput from '../components/TextInput'
import Nav from '../components/Nav'


function UpdateName(props) {
   const [name, updateName] = useState('')

   useEffect(() => {
      console.log(props)
   }, [])

   const handleName = ({ target }) => {
      updateName(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const update = await __UpdateName(props.currentUser.email, name)
         console.log(props.currentUser.name)
         props.toggleAuthenticated(true, update.user)
         props.history.push('/profile')
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <div className="signup flex-col center">
         <Nav />
         <Grid container justify="center" style={{ margin: '20px' }}>
            <FormControl className="flex-col" onSubmit={handleSubmit}>
               <TextInput
                  placeholder="New Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
               />

               <br />
               <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>person</Icon>}
               >
                  Submit
               </Button>
            </FormControl>
         </Grid>
      </div>
   )
}
export default withRouter(UpdateName)
