import React, { useState } from 'react'
import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Button,
   Icon,
   Menu,
   MenuItem,
} from '@material-ui/core'
import { withRouter } from 'react-router-dom'
 

const Nav = (props) => {
   const [anchorEl, setAnchorEl] = useState('')

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleClose = () => {
      setAnchorEl(null)
   }
   return props.authenticated && props.currentUser ? (
      <div>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  onClick={() => props.history.push('/')}
                  edge="start"
                  color="inherit"
                  aria-label="menu"
               >
                  <Icon>public</Icon>
               </IconButton>
               <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Gaiary
               </Typography>

               <Button
                  color="inherit"
                  onClick={() => props.history.push('/profile')}
               >
                     {props.currentUser.name}'s Profile
               </Button>
               <Button
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
               >
                  Settings
               </Button>
               <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
               >
                  <MenuItem
                     onClick={() => {
                        handleClose()
                        props.history.push('/updatename')
                     }}
                  >
                     Change Name
                  </MenuItem>
                  <MenuItem
                     onClick={() => {
                        handleClose()
                        props.history.push('/updatepassword')
                     }}
                  >
                     Change Password
                  </MenuItem>
               </Menu>
               <Button
                  color="inherit"
                  href="/"
                  onClick={() => localStorage.clear()}
               >
                  Logout
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   ) : (
      <div>
         <AppBar position="static">
            <Toolbar>
               <IconButton
                  href="/"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  startIcon={<Icon>public</Icon>}
               >
                  <Icon>public</Icon>
               </IconButton>
               <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Gaiary
               </Typography>
               <Button color="inherit" href="/login">
                  Sign In
               </Button>
               <Button color="inherit" href="/register">
                  Sign Up
               </Button>
            </Toolbar>
         </AppBar>
      </div>
   )
}
export default withRouter(Nav)
