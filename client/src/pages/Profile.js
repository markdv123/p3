import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'
import Map from '../components/Map'
import Nav from '../components/Nav'
import mapboxgl from 'mapbox-gl'


function Profile (props) {
    console.log(props)

    return(
        <div>
            <Nav
                authenticated={props.authenticated}
                currentUser={props.currentUser}
                />
                <div className='map center'>
                    <h1>Hello</h1>
                    <Map {...props}/>
                </div>
        </div>
    )
}
export default withRouter(Profile)