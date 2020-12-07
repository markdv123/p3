import React from 'react';
import Nav from '../components/Nav'
import { Link } from 'react-router-dom'
import { Button, Icon } from '@material-ui/core'



const Home = (props) => {
    return (
        <div >
            <Nav
                authenticated={props.authenticated}
                currentUser={props.currentUser} />
            <div style={{ textAlign: "center" }}>
                <h1>Welcome to [title redacted]</h1>
                <p style={{ maxWidth: "820px", margin: "0 auto" }}>[title redacted] is a wonderful new app designed to help users visually keep track of precious memories on a global map! In your profile page, a personal, interactive map will appear. Click on it to create a new memory pin. Over time, you can see your map fill up with all of the chosen memories from your life!</p>
                <Button href='/register' variant="contained" color="primary" endIcon={<Icon>person_add</Icon>}>
                    Get Started
                </Button>
                <br />
                <br />
                <Button href="/login" variant="contained" color="primary" endIcon={<Icon>person</Icon>}>
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default Home