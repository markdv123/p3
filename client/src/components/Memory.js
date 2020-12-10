import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Chip, Grid } from '@material-ui/core'
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Pagination } from '@material-ui/lab'
import ViewMemory from '../pages/ViewMemory'
import CreateMemory from '../pages/CreateMemory'
import EditMemory from '../pages/EditMemory'

const useMemoryStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
         margin: theme.spacing(0.5),
      },
   },
}))

const Memory = (props) => {
   const memoryClasses = useMemoryStyles()
   const pageSize = 10
   const pageCount = Math.ceil(props.memories.length / pageSize)
   const [mode, setMode] = useState('')
   const [pageNum, setPageNum] = useState(1)
   const [confirmIsOpen, setConfirmIsOpen] = useState(false)

   useEffect(() => {
      setMode(props.mode)
      if ( props.viewMem ) {
         const index = props.memories.findIndex( e => e.id === props.viewMem )
         if ( index >= 0 ) {
            setPageNum( Math.ceil((index+1) / 10 ))
         }
      }
   }, [props])

   const handlePage = (event, page) => {
      setPageNum(page)
   }

   const memoryChips = () => {
      let list = []
      const startMem = (pageNum - 1) * pageSize
      const endMem =
         props.memories.length - startMem < pageSize
            ? props.memories.length
            : startMem + pageSize
      for (let i = startMem; i < endMem; i++) {
         if (props.memories[i]) {
            list.push(
               <Chip
                  label={props.memories[i].name}
                  onClick={() => {
                     props.setGotoMem(props.memories[i].id)
                  }}
                  variant="outlined"
                  color={props.memories[i].public ? 'tertiary' : 'primary'}
               />
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

   const resetToView = () => {
      setMode ( 'view' )
   }

   let content = ''
   switch (mode) {
      case 'view':
         if (props.memories.find((e) => e.id === props.viewMem)) {
            content = (
               <div>
                  <ViewMemory
                     memory={props.memories.find((e) => e.id === props.viewMem)}
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
                  resetMode={resetToView}
                  mem={props.memories.find((e) => e.id === props.viewMem)}
               />
            )
         } else {
            content = ''
            setMode('list')
         }
         break

      default:
   }
   return (
      <div>
         <Grid
            container
            direction="column"
            spacing={10}
            justify="center"
            alignItems="center"
         >
            <Grid item>
               <div className={memoryClasses.root}>
                  <h3>My Memories</h3>
               </div>
               <div className={memoryClasses.root}>
                  {props.memories.length ? memoryChips() : null}
               </div>

               <div>
                  <div className={memoryClasses.root}>
                     <Pagination
                        onChange={(event, page) => handlePage(event, page)}
                        defaultPage={1}
                        count={pageCount}
                        variant="outlined"
                        shape="rounded"
                     />
                  </div>
               </div>
            </Grid>
            <Grid item>
               {content}
            </Grid>
         </Grid>
      </div>
   )
}

export default withRouter(Memory)
