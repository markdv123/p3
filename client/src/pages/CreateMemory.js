import React, { useState, useEffect } from 'react'
import {
   makeStyles,
   FormControl,
   InputLabel,
   Select,
   Chip,
   MenuItem,
   Input,
   useTheme,
   Button,
   Grid,
   TextField,
   Card, CardContent
} from '@material-ui/core'
import Dropzone from 'react-dropzone'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import TextInput from '../components/TextInput'
import Icon from '@material-ui/core/Icon'
import { withRouter } from 'react-router-dom'
import { __AddImage, __CreateMemory } from '../services/MemoryService'
import { __GetAllTags } from '../services/TagService'

const useStyles = makeStyles((theme) => ({
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
      maxWidth: 450,
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

const CreateMemory = (props) => {
   const classes = useStyles()
   const theme = useTheme()
   const [name, setName] = useState('')
   const [date, setDate] = useState('')
   const [description, setDesc] = useState('')
   const [isPublic, setPublic] = useState(false)
   const [tags, setTags] = useState([])
   const [allTags, setAllTags] = useState([])
   const [files, setFiles] = useState([])

   useEffect(() => {
      getTheTags()
   }, [])

   const getTheTags = async () => {
      try {
         const everyTag = await __GetAllTags()
         setAllTags(everyTag)
      } catch (error) {
         throw error
      }
   }

   const handleName = ({ target }) => setName(target.value)
   const handleDesc = ({ target }) => setDesc(target.value)
   const handlePublic = (e, newVal) => setPublic(newVal)
   const handleTags = ({ target }) => setTags(target.value)
   const handleDate = ({ target }) => setDate(target.value)
   const clearDate = () => setDate('')

   const handleSubmit = async () => {
      try {
         const newMemory = await __CreateMemory(props.currentUser.id, {
            name: name,
            date: date,
            description: description,
            public: isPublic,
            location: {
               long: props.newLoc.lng,
               lat: props.newLoc.lat,
            },
            tags: tags,
         })
         if(files.length) {
            const formData = new FormData()
            files.forEach((file)=> {
               formData.append('images', file)
            })
            await __AddImage(newMemory.id, formData)
         }
         props.history.push('/profile')
      } catch (error) {
         throw error
      }
   }

   return (
      <div>
         <Grid container justify="center" alignItems="center">
            <FormControl
               className={classes.formcontrol}
               noValidate
               autoComplete="off"
            >
               <TextInput
                  id="standard-basic"
                  className={classes.textField}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleName}
               />
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl
               className={classes.formcontrol}
               noValidate
               autoComplete="off"
            >
               <TextField
                  id="datetime-local"
                  type="date"
                  value={date}
                  onChange={handleDate}
                  className={classes.textField}
                  InputLabelProps={{
                     shrink: true,
                  }}
               />
               <Button
                  size="small"
                  style={{ width: '100px', justifyContent: 'center' }}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>backspace</Icon>}
                  onClick={clearDate}
               >
                  Clear
               </Button>
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl
               className={classes.formcontrol}
               noValidate
               autoComplete="off"
            >
               <TextField
                  style={{ width: '450px' }}
                  multiline
                  variant="outlined"
                  id="outlined-textarea"
                  className={classes.textField}
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={handleDesc}
               />
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl className={classes.formControl}>
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
            <Dropzone onDrop={acceptedFiles => setFiles([...files, ...acceptedFiles])}>
               {({ getRootProps, getInputProps }) => (
                  <Card>
                     <CardContent>
                        <div {...getRootProps()}>
                           <input {...getInputProps()} />
                           <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </Dropzone>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <FormControl className={classes.formControl}>
               <InputLabel id="demo-mutiple-chip-label">Select Tags</InputLabel>
               <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={tags}
                  onChange={handleTags}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                     <div className={classes.chips}>
                        {selected.map((value) => (
                           <Chip
                              key={value}
                              label={allTags.find((e) => e.id === value).name}
                              className={classes.chip}
                           />
                        ))}
                     </div>
                  )}
                  MenuProps={MenuProps}
               >
                  {allTags.map((tag) => {
                     return (
                        <MenuItem
                           key={tag.id}
                           value={tag.id}
                           style={getStyles(tag, tags, theme)}
                        >
                           {tag.name}
                        </MenuItem>
                     )
                  })}
               </Select>
            </FormControl>
         </Grid>
         <Grid container justify="center" alignItems="center">
            <Button
               variant="contained"
               color="primary"
               className={classes.button}
               endIcon={<Icon>arrow_forward_ios</Icon>}
               onClick={handleSubmit}
               style={{ margin: '5px' }}
            >
               Submit
            </Button>
            <Button
               variant="contained"
               color="primary"
               className={classes.button}
               endIcon={<Icon>arrow_back_ios</Icon>}
               onClick={() => { props.resetMode() }}
               style={{ margin: '5px' }}
            >
               Cancel
            </Button>
         </Grid>
      </div>
   )
}

export default withRouter(CreateMemory)
