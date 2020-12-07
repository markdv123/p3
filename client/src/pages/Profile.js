import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {Grid, Container} from '@material-ui/core'
import Map from '../components/Map'
import Nav from '../components/Nav'
import Memory from '../components/Memory'


function Profile (props) {

    return(
        <div>
            <Nav
                authenticated={props.authenticated}
                currentUser={props.currentUser}/>
            <Container style={{display: 'flex'}}>
                <Grid xs={12} sm={6}>
               <div className='map center'>
                    <h1>Hello</h1>
                    <Map {...props}/>
                </div> 
            </Grid>
            <Grid xs={12} sm={6}>
                <Memory />
            </Grid>
            </Container>
            
        </div>
    )
}
export default withRouter(Profile)