import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import {
   makeStyles,
   FormControl,
   Chip,
   useTheme,
   Button,
   Grid,
   TextField,
   Icon,
   Card,
   CardContent,
} from '@material-ui/core'
import Dropzone, { useDropzone } from 'react-dropzone'
import { ToggleButton, ToggleButtonGroup, Autocomplete } from '@material-ui/lab'

import {
   __UpdateMemory,
   __CreateMemory,
   __AddImage,
} from '../services/MemoryService'
import { __GetAllTags } from '../services/TagService'

const useEditStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '230px',
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 300,
   },
   formControl2: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
   },
   chips: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   chip: {
      margin: 2,
   },
   noLabel: {
      marginTop: theme.spacing(3),
   },
   button: {
      backgroundColor: '#9a9a9a',
      color: 'white',
      margin: '10px',
   },
   buttonLong: {
      backgroundColor: '#9a9a9a',
      color: 'white',
      margin: '10px auto',
      display: 'flex',
      justifyContent: 'center',
      width: '80%',
   },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
}

function getStyles(tag, tags, theme) {
   return {
      fontWeight:
         tags.indexOf(tag) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   }
}

const thumbsContainer = {
   display: 'flex',
   flexDirection: 'row',
   flexWrap: 'wrap',
   marginTop: 16,
   justifyContent: 'center',
}

const thumb = {
   display: 'inline-flex',
   borderRadius: 2,
   border: '1px solid #eaeaea',
   marginBottom: 8,
   marginRight: 8,
   width: 100,
   height: 100,
   padding: 4,
   boxSizing: 'border-box',
}

const thumbInner = {
   display: 'flex',
   justifyContent: 'center',
   minWidth: 0,
   overflow: 'hidden',
}

const img = {
   display: 'block',
   width: 'auto',
   height: '100%',
}

const EditMemory = ({ memory, currentUser, ...props }) => {
   const editClasses = useEditStyles()

   const theme = useTheme()
   const [name, setName] = useState(memory.name)
   const [date, setDate] = useState(memory.date)
   const [description, setDesc] = useState(memory.description)
   const [isPublic, setPublic] = useState(memory.public)
   const [tags, setTags] = useState(memory.tags)
   const [allTags, setAllTags] = useState([])
   const [files, setFiles] = useState([])

   const getTheTags = async () => {
      try {
         if (!allTags.length) {
            const everyTag = await __GetAllTags()
            setAllTags(everyTag)
         }
      } catch (error) {
         throw error
      }
   }

   useEffect(() => {
      getTheTags()
   }, [memory, files])

   const handleName = ({ target }) => setName(target.value)
   const handleDesc = ({ target }) => setDesc(target.value)
   const handlePublic = (e, newVal) => setPublic(newVal)
   const handleDate = ({ target }) => setDate(target.value)
   const clearDate = () => setDate('')

   const handleSubmit = async () => {
      try {
         if (memory.id === -1) {
            // this is a create
            const newMemory = await __CreateMemory(currentUser.id, {
               name: name,
               date: date,
               description: description,
               public: isPublic,
               tags: tags,
               location: memory.location,
            })
            if (files.length) {
               const formData = new FormData()
               files.forEach((file) => {
                  formData.append('images', file)
               })
               await __AddImage(newMemory.id, formData)
            }
         } else {
            await __UpdateMemory(memory.id, {
               name: name,
               date: date,
               description: description,
               public: isPublic,
               tags: tags,
            })
            if (files.length) {
               const formData = new FormData()
               files.forEach((file) => {
                  formData.append('images', file)
               })
               await __AddImage(memory.id, formData)
            }
         }
         // Make sure to revoke the data uris to avoid memory leaks
         files.forEach((file) => URL.revokeObjectURL(file.preview))

         props.history.push('/profile')
      } catch (error) {
         throw error
      }
   }

   const removeFile = (e) => {
      const newFiles = [...files]
      newFiles.splice(parseInt(e.target.name.split('_')[1]), 1)
      setFiles(newFiles)
   }

   const thumbs = files.map((file, i) => (
      <div style={thumb} key={file.name}>
         <div style={thumbInner}>
            <img
               src={file.preview}
               style={img}
               onClick={removeFile}
               name={`thumb_${i}`}
            />
         </div>
      </div>
   ))

   const handleTagChange = (e, values) => {
      const newTags = values.map((e) => {
         const findTag = allTags.find((tag) => tag.name === e)
         if (findTag) return findTag
         return { id: -1, name: e }
      })
      setTags(newTags)
   }

   return (
      <div>
         <Grid container justify="center" alignItems="center">
            <TextField
               name="name"
               value={name}
               onChange={handleName}
               placeholder="Name"
               className={editClasses.textField}
            />
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl
               className={editClasses.formcontrol}
               noValidate
               autoComplete="off"
            >
               <TextField
                  id="datetime-local"
                  type="date"
                  value={date ? date.split('T')[0] : null}
                  onChange={handleDate}
                  className={editClasses.textField}
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
               <Button
                  size="small"
                  variant="contained"
                  className={editClasses.buttonLong}
                  endIcon={<Icon>backspace</Icon>}
                  onClick={clearDate}
               >
                  Clear
               </Button>
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl
               className={editClasses.formcontrol}
               noValidate
               autoComplete="off"
            >
               <TextField
                  style={{ width: '450px' }}
                  multiline
                  variant="outlined"
                  id="outlined-textarea"
                  className={editClasses.textField}
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleDesc}
               />
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl className={editClasses.formControl}>
               <ToggleButtonGroup
                  value={isPublic}
                  exclusive
                  onChange={handlePublic}
                  aria-label="Privacy"
               >
                  <ToggleButton value={true} aria-label="Public">
                     Public
                  </ToggleButton>
                  <ToggleButton value={false} aria-label="Private">
                     Private
                  </ToggleButton>
               </ToggleButtonGroup>
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl className={editClasses.formControl2}>
               <Dropzone
                  onDrop={(acceptedFiles) => {
                     if (files.length < 3) {
                        setFiles([
                           ...files,
                           ...acceptedFiles.map((file) =>
                              Object.assign(file, {
                                 preview: URL.createObjectURL(file),
                              })
                           ),
                        ])
                     }
                  }}
               >
                  {({ getRootProps, getInputProps }) => (
                     <Card>
                        <CardContent>
                           <div
                              {...getRootProps()}
                              style={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 margin: '0px 10%',
                              }}
                           >
                              <input {...getInputProps()} />
                              <h4 style={{ textAlign: 'center' }}>
                                 Drag 'n' drop some files here, or click to
                                 select files. Only 3 files can be uploaded at a
                                 time.
                              </h4>
                           </div>
                           <aside style={thumbsContainer}>{thumbs}</aside>
                        </CardContent>
                     </Card>
                  )}
               </Dropzone>
            </FormControl>
         </Grid>

         <Grid container justify="center" alignItems="center">
            <Autocomplete
               multiple
               id="tag-list"
               options={allTags.map((e) => e.name)}
               renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                     <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                     />
                  ))
               }
               renderInput={(params) => (
                  <TextField
                     {...params}
                     variant="standard"
                     label="Select Tags"
                     placeholder="Tags"
                  />
               )}
               defaultValue={tags.map((e) => e.name)}
               style={{ width: 300 }}
               freeSolo
               onChange={handleTagChange}
            />
         </Grid>
         <Grid container justify="center" alignItems="center">
            <Button
               variant="contained"
               className={editClasses.button}
               endIcon={<Icon>arrow_forward_ios</Icon>}
               onClick={handleSubmit}
            >
               Submit
            </Button>
            <Button
               variant="contained"
               className={editClasses.button}
               endIcon={<Icon>arrow_back_ios</Icon>}
               onClick={props.resetMode}
            >
               Cancel
            </Button>
         </Grid>
      </div>
   )
}

export default withRouter(EditMemory)
