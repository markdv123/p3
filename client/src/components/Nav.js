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
import '../styles/Nav.css'


const Nav = (props) => {
    const [anchorEl, setAnchorEl] = useState('')

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return props.authenticated && props.currentUser ? (
        <div >
            <AppBar  style={{backgroundColor: '#9a9a9a'}} position="absolute">
                <Toolbar>
                    <IconButton 
                        onClick={() => props.history.push('/')}
                        edge="start"
                        aria-label="menu"
                        style={{color:'white'}}
                    >
                        <Icon >public</Icon>
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Gaiary
                    </Typography>

                    <Typography className='hello_user' variant="h6" style={{ flexGrow: 0.7 }}>
                        Hello, {props.currentUser.name}
                    </Typography>

                    <Button
                        style={{color:'white'}}
                        onClick={() => props.history.push('/profile')}
                    >
                        Profile
                    </Button>
                    <Button
                       style={{color:'white'}}
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
                        href="/"
                        onClick={() => localStorage.clear()}
                        style={{color:'white'}}
                    >
                        Logout
               </Button>
                </Toolbar>
            </AppBar>
        </div>
    ) : (
            <div>
                <AppBar style={{backgroundColor: '#9a9a9a'}} position="absolute">
                    <Toolbar>
                        <IconButton
                            href="/"
                            edge="start"
                            aria-label="menu"
                            style={{color:'white'}}
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
