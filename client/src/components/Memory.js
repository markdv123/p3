import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem, Button, Icon } from '@material-ui/core'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'
import { __DeleteMemory } from '../services/MemoryService'

const Memory = (props) => {
    const [mode, setMode] = useState('')
    console.log('mem', props)

    useEffect(()=> {
        setMode(props.mode)
    })

    let content = ''
    switch (mode) {
        case "list":
            content = (
                <div>
                    <h3>Click on the Map to create a memory</h3>
                    <h4>My Memories:</h4>
                    <List>
                        {props.memories.map((memory) => (
                            <ListItem button onClick={()=> {props.setGotoMem(memory.id)}}>{memory.name}</ListItem>
                        ))}
                    </List>
                </div>
            )
            break
        case "view":
            content = (
                <div>
                    <ViewMemory mem={props.memories.find(e=> e.id === props.viewMem)}/>
                    <Button style={{margin: '5px'}} variant="contained" color="primary" onClick={()=> {setMode("edit")}} endIcon={<Icon>edit</Icon>}>Edit Memory</Button>
                    <Button style={{margin: '5px'}} variant="contained" color="primary" onClick={()=> {props.deleteMem(props.viewMem)}} endIcon={<Icon>delete</Icon>}>Delete Memory</Button>
                </div>               
            )
            break
        case "create":
            content = (
                <CreateMemory 
                    newLoc={props.newLoc}
                    authenticated={props.authenticated}
                    currentUser={props.currentUser}/>
            )
            break
        case "edit":
            content = (
                <EditMemory mem={props.memories.find(e=> e.id === props.viewMem)}/>
            )
            break
    }
    return (
        <div>{content}</div>
    )
}

export default withRouter(Memory)