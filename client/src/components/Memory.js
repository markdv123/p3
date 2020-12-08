import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem } from '@material-ui/core'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'

const Memory = (props) => {
    const [mode, setMode] = useState(3)

    let content = ''
    switch (mode) {
        case 1:
            content = (
                <div>
                    <h3>Click on the Map to create a memory</h3>
                    <h4>My Memories:</h4>
                    <List>
                        {props.memories.map((memory) => (
                            <ListItem>{memory.name}</ListItem>
                        ))}
                    </List>
                </div>
            )
            break
        case 2:
            content = (
                <ViewMemory />
            )
            break
        case 3:
            content = (
                <CreateMemory 
                    authenticated={props.authenticated}
                    currentUser={props.currentUser}/>
            )
            break
        case 4:
            content = (
                <EditMemory />
            )
            break
    }
    return (
        <div>{content}</div>
    )
}

export default withRouter(Memory)