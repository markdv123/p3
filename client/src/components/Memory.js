import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { List, ListItem, Button, Icon } from '@material-ui/core'
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'
import { __DeleteMemory } from '../services/MemoryService'

const Memory = (props) => {
   const pageCount = Math.ceil(props.memories.length / 10)
   const [mode, setMode] = useState('')
   const [pageNum, setPageNum] = useState(1)
   const [confirmIsOpen, setConfirmIsOpen] = useState(false)

   useEffect(() => {
      setMode(props.mode)
   }, [props.viewMem, props.newLoc])

   const handlePage = (event, page) => {
      setPageNum(page)
   }

   const createList = () => {
      let list = []
      const startMem = (pageNum - 1) * 10
      const endMem = (props.memories.length - startMem) < 10 ? props.memories.length : startMem + 10
      // end was (pageNum * 10)
      for (let i = startMem; i < endMem; i++) {
         if (props.memories[i]) {
            list.push(
               <ListItem
                  button
                  onClick={() => {
                     props.setGotoMem(props.memories[i].id)
                  }}
                  key={props.memories[i].id}
               >
                  {props.memories[i].name}
               </ListItem>
            )
         }
      }
      return list
   }

   const handleConfirmOpen = () => {
      setConfirmIsOpen(true)
   }

   const handleConfirmClose = () => {
      setConfirmIsOpen(false)
   }

   const handleConfirmDelete = () => {
      setConfirmIsOpen(false)
      props.deleteMem(props.viewMem)
   }

   let content = ''
   switch (mode) {
      case 'list':
         content = (
            <div>
               <h3>Click on the Map to create a memory</h3>
               <h4>My Memories:</h4>
               <List>{props.memories.length ? createList() : null}</List>
               <Pagination
                  onChange={(event, page) => handlePage(event, page)}
                  defaultPage={1}
                  count={pageCount}
                  variant="outlined"
                  shape="rounded"
               />
            </div>
         )
         break
      case 'view':
         if (props.memories.find((e) => e.id === props.viewMem)) {
            content = (
               <div>
                  <ViewMemory
                     resetMode={props.resetMode}
                     mem={props.memories.find((e) => e.id === props.viewMem)}
                  />
                  <Button
                     style={{ margin: '5px' }}
                     variant="contained"
                     color="primary"
                     onClick={() => {
                        setMode('edit')
                     }}
                     endIcon={<Icon>edit</Icon>}
                  >
                     Edit Memory
                  </Button>
                  <Button
                     style={{ margin: '5px' }}
                     variant="contained"
                     color="primary"
                     onClick={handleConfirmOpen}
                     endIcon={<Icon>delete</Icon>}
                  >
                     Delete Memory
                  </Button>
                  <Dialog
                     open={confirmIsOpen}
                     onClose={handleConfirmClose}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description"
                  >
                     <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           Do you really want to delete this memory forever?
                        </DialogContentText>
                     </DialogContent>
                     <DialogActions>
                        <Button onClick={handleConfirmClose} color="primary">
                           No
                        </Button>
                        <Button
                           onClick={handleConfirmDelete}
                           color="primary"
                           autoFocus
                        >
                           Yes!
                        </Button>
                     </DialogActions>
                  </Dialog>
               </div>
            )
         } else {
            content = ''
            setMode('list')
         }
         break
      case 'create':
         content = (
            <CreateMemory
               resetMode={props.resetMode}
               newLoc={props.newLoc}
               authenticated={props.authenticated}
               currentUser={props.currentUser}
            />
         )
         break
      case 'edit':
         if (props.memories.find((e) => e.id === props.viewMem)) {
            content = (
               <EditMemory
                  resetMode={props.resetMode}
                  mem={props.memories.find((e) => e.id === props.viewMem)}
               />
            )
         } else {
            content = ''
            setMode('list')
         }
         break
   }
   return <div>{content}</div>
}

export default withRouter(Memory)
