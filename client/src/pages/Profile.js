import React, {useState} from 'react'
import Map from '../components/Map'
import Nav from '../components/Nav'
import mapboxgl from 'mapbox-gl'


function Profile (props) {

    return(
        <div>
            <Nav/>
                <div className='map center'>
                    <h1>Hello</h1>
                    <Map />
                </div>
        </div>
    )
}
export default Profile