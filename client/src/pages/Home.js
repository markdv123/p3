import React from 'react';
import Nav from '../components/Nav'
import { Button, Icon, Grid } from '@material-ui/core'

const Home = (props) => {
    return (
        <div >
            <Nav
                authenticated={props.authenticated}
                {...props}
                currentUser={props.currentUser} />
            <div style={{ textAlign: "center" }}>
                <h1>Welcome to Gaiary</h1>
                <h2>Your Diary of the Earth</h2>
                <p style={{ maxWidth: "820px", margin: "0 auto" }}>Gaiary is a wonderful new app designed to help users visually keep track of precious memories on a global map! In your profile page, a personal interactive map will appear. Click on it to create a new memory pin. Over time, you can see your map fill up with all of the chosen memories from your life!</p>
                <Grid container justify="center" style={{ margin: '5px' }}>
                    <Grid container justify="center" style={{ margin: '5px' }}>
                        <Button href='/register' variant="contained" color="primary" endIcon={<Icon>person_add</Icon>}>
                            Get Started
                        </Button>
                    </Grid>
                    <Grid container justify="center" style={{ margin: '5px' }}>
                        <Button href="/login" variant="contained" color="primary" endIcon={<Icon>person</Icon>}>
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home