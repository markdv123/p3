import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Container } from '@material-ui/core'
import Map from '../components/Map'
import Nav from '../components/Nav'
import Memory from '../components/Memory'
import {__GetMemories} from '../services/MemoryService'

function Profile(props) {
    const [memories, setMemories] = useState([])

    useEffect(()=> {
        getMems()
    }, [])

    const getMems = async () => {
        try {
            const res = await __GetMemories(props.currentUser.id)
            setMemories(res)
        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            <Nav
                authenticated={props.authenticated}
                currentUser={props.currentUser} />
            <Container style={{ display: 'flex' }}>
                <Grid xs={12} sm={6}>
                    <div className='map center'>
                        <h1>Hello</h1>
                        <Map {...props}
                            memories={memories}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={6}>
                    <Memory 
                        memories={memories}
                        authenticated={props.authenticated}
                        currentUser={props.currentUser}/>
                </Grid>
            </Container>

        </div>
    )
}
export default withRouter(Profile)