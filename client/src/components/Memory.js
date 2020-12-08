import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem, Button, Icon } from '@material-ui/core'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'

const Memory = (props) => {
    const [mode, setMode] = useState("view")

    let content = ''
    switch (mode) {
        case "list":
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
        case "view":
            content = (
                <div>
                    <ViewMemory />
                    <Button style={{margin: '5px'}} variant="contained" color="primary" onClick={()=> {setMode("edit")}} endIcon={<Icon>edit</Icon>}>Edit Memory</Button>
                    <Button style={{margin: '5px'}} variant="contained" color="primary" onClick={()=> {console.log('delete button clicked')}} endIcon={<Icon>delete</Icon>}>Delete Memory</Button>
                </div>               
            )
            break
        case "create":
            content = (
                <CreateMemory 
                    authenticated={props.authenticated}
                    currentUser={props.currentUser}/>
            )
            break
        case "edit":
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