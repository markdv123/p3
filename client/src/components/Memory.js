import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem, Button, Icon, makeStyles, ListItemText } from '@material-ui/core'
import { FixedSizeList } from 'react-window'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'
import { __DeleteMemory } from '../services/MemoryService'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
}))

const Memory = (props) => {
    const [mode, setMode] = useState('')
    const classes = useStyles()

    useEffect(() => {
        setMode(props.mode)
    }, [props.mode])

    let content = ''
    switch (mode) {
        case "list":
            content = (
                <div>
                    <h3>Click on the Map to create a memory</h3>
                    <h4>My Memories:</h4>
                    {/* <div className={classes.root}>
                        <FixedSizeList height={400} width={300} itemSize={46}>
                            {props.memories.map((memory) => (
                                <ListItem button onClick={() => { props.setGotoMem(memory.id) }} style={} key={memory.id}>
                                    <ListItemText primary={memory.name} />
                                </ListItem>
                                // <ListItem button onClick={() => { props.setGotoMem(memory.id) }}>{memory.name}</ListItem>
                            ))}
                        </FixedSizeList>
                    </div> */}
                </div>
            )
            break
        case "view":
            if(props.memories.find(e => e.id === props.viewMem)){
            content = (
                <div>
                    <ViewMemory mem={props.memories.find(e => e.id === props.viewMem)} />
                    <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={() => { setMode("edit") }} endIcon={<Icon>edit</Icon>}>Edit Memory</Button>
                    <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={() => { props.deleteMem(props.viewMem) }} endIcon={<Icon>delete</Icon>}>Delete Memory</Button>
                </div>
            )}else{
                content = ''
                setMode('list')
            }
            break
        case "create":
            content = (
                <CreateMemory
                    newLoc={props.newLoc}
                    authenticated={props.authenticated}
                    currentUser={props.currentUser} />
            )
            break
        case "edit":
            content = (
                <EditMemory mem={props.memories.find(e => e.id === props.viewMem)} />
            )
            break
    }
    return (
        <div>{content}</div>
    )
}

export default withRouter(Memory)