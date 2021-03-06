import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon, Grid } from '@material-ui/core'
import { __UpdateName } from '../services/UserService'
import TextInput from '../components/TextInput'
import Nav from '../components/Nav'


function UpdateName(props) {
   const [name, updateName] = useState('')

   const handleName = ({ target }) => {
      updateName(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         const update = await __UpdateName(props.currentUser.email, name)
         props.toggleAuthenticated(true, update.user)
         props.history.push('/profile')
      } catch (error) {
         throw error
      }
   }
   return (
      <div className="signup flex-col center">
         <Nav 
            authenticated={props.authenticated}
            {...props}
            currentUser={props.currentUser}
        />
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
                  style={{backgroundColor: '#9a9a9a', color:'white'}}
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
