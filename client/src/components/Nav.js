import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button, Icon } from '@material-ui/core'

export default ({ authenticated, currentUser }) => {
    return authenticated && currentUser ? (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton href="/" edge="start" color="inherit" aria-label="menu">
                        <Icon>public</Icon>
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Gaiary
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
                        <IconButton href="/" edge="start" color="inherit" aria-label="menu" startIcon={<Icon>public</Icon>}>
                            <Icon>public</Icon>
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Gaiary
                    </Typography>
                        <Button color="inherit" href="/login" >Sign In</Button>
                        <Button color="inherit" href='/register'>Sign Up</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
}