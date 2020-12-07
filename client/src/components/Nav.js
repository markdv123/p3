import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { MenuIcon } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'





export default ({ authenticated, currentUser }) => {
    return authenticated && currentUser ? (
        // <nav>
        //     <div className="nav-wrapper">
        //         <Link to="/" className="brand-logo"><i className="material-icons" style={{"marginLeft": "10px"}}>public</i>Title</Link>
        //         <ul id='nav-mobile' className="right hide-on-med-and-down">
        //             <li><Link to="/profile">Profile</Link></li>
        //             <li><Link to="/" onClick={() => localStorage.clear()}>Signout</Link></li>
        //         </ul>
        //     </div>
        // </nav>
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" >
                        Title
                    </Typography>
                    <Button color="inherit" href='/profile' >Profile</Button>
                    <Button color="inherit" href='/' onClick={() => localStorage.clear()} >Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    ) : (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow : 1}}>
                        Title
                    </Typography>
                    <Button color="inherit"  href="/login" >Sign In</Button>
                    <Button color="inherit" href='/register'>Sign Up</Button>
                </Toolbar>
            </AppBar>
        </div>
        )
}