import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem, Button, Icon, makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'
import { __DeleteMemory } from '../services/MemoryService'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }))

const Memory = (props) => {
    const classes = useStyles()
    const pages = props.memories.length/10
    const [mode, setMode] = useState('')
    const [pageNum, setPageNum] = useState(1)
    // const [page, setPage] = useState('')

    useEffect(()=> {
        setMode(props.mode)
    }, [props.viewMem])
    
    const handlePage = (event, page) => {
        setPageNum(page)
    }

    const createList = () => {
        let list = []
        for(let i = 0 + ((pageNum - 1) * 10); i < (pageNum * 10); i++){
            if(props.memories[i]){
                list.push((<ListItem button onClick={()=> {props.setGotoMem(props.memories[i].id)}}>{props.memories[i].name}</ListItem>))
            }
        }
        return list
    }

    let content = ''
    switch (mode) {
        case "list":
            content = (
                <div>
                    <h3>Click on the Map to create a memory</h3>
                    <h4>My Memories:</h4>
                    <List>
                        {props.memories.length ? createList() : null}
                    </List>
                    <Pagination onChange={(event, page)=> handlePage(event, page)} defaultPage={1} count={Math.ceil(pages)} variant="outlined" shape="rounded"/>
                </div>
            )
            break
        case "view":
            if(props.memories.find(e => e.id === props.viewMem)){
                content = (
                    <div>
                        <ViewMemory resetMode={props.resetMode} mem={props.memories.find(e => e.id === props.viewMem)} />
                        <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={() => { setMode('edit') }} endIcon={<Icon>edit</Icon>}>Edit Memory</Button>
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