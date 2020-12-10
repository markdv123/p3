import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { FormControl, Button, Icon, Grid } from '@material-ui/core'

import { __UpdatePasword } from '../services/UserService'
import TextInput from '../components/TextInput'
import Nav from '../components/Nav'

function UpdatePassword(props) {
   const [oldPassword, updateOld] = useState('')
   const [newPassword, updateNew] = useState('')

   useEffect(() => {}, [])
   const handleOld = ({ target }) => {
      updateOld(target.value)
   }
   const handleNew = ({ target }) => {
      updateNew(target.value)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      try {
         console.log(props.currentUser)
         const update = await __UpdatePasword(
            props.currentUser.email,
            oldPassword,
            newPassword
         )
         console.log(update)
         props.history.push('/profile')
      } catch (error) {
         console.log(error)
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
                  placeholder="Enter Old Password"
                  type="password"
                  name="old password"
                  value={oldPassword}
                  onChange={handleOld}
               />
               <TextInput
                  placeholder="Enter New Password"
                  type="password"
                  name="new password"
                  value={newPassword}
                  onChange={handleNew}
               />
               <br />
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
export default withRouter(UpdatePassword)
