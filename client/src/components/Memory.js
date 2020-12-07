import React from 'react'
import { withRouter } from 'react-router-dom'
import {List, ListItem} from '@material-ui/core'

const Memory = (props) => {
    return (
        <div>
            <h3>Click on the Map to create a memory</h3>
            <h4>My Memories:</h4>
            <List>
                {props.memories.map((memory)=> (
                    <ListItem>{memory.name}</ListItem>
                ))}
            </List>
        </div>
    )
}

export default withRouter(Memory)