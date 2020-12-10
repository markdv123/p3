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
   Icon
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup, Autocomplete} from '@material-ui/lab'

import { __UpdateMemory } from '../services/MemoryService'
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

const EditMemory = (props) => {
   const editClasses = useEditStyles()
   const theme = useTheme()
   const [name, setName] = useState(props.mem.name)
   const [date, setDate] = useState(props.mem.date)
   const [description, setDesc] = useState(props.mem.description)
   const [isPublic, setPublic] = useState(props.mem.public)
   const [tags, setTags] = useState(props.mem.tags)
   const [allTags, setAllTags] = useState([])
   const [tagValue, setTagValue] = useState(null)

   const getTheTags = async () => {
      try {
         const everyTag = await __GetAllTags()
         setAllTags(everyTag)
      } catch (error) {
         throw error
      }
   }

   useEffect(() => {
      getTheTags()
   }, [props.mem])

   const handleName = ({ target }) => setName(target.value)
   const handleDesc = ({ target }) => setDesc(target.value)
   const handlePublic = (e, newVal) => setPublic(newVal)
   const handleDate = ({ target }) => setDate(target.value)
   const clearDate = () => setDate('')

   const handleSubmit = async () => {
      try {
         await __UpdateMemory(props.mem.id, {
            name: name,
            date: date,
            description: description,
            public: isPublic,
            tags: tags,
         })
         props.history.push('/profile')
      } catch (error) {
         throw error
      }
   }


   const handleTagChange = ( e, values) => {
      const newTags = values.map ( e => {
         const findTag = allTags.find( tag => tag.name === e )
         if ( findTag ) 
            return findTag
         return { id: -1, name: e }
      })
      console.log ( newTags )
      setTags ( newTags )
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
                  style={{ width: '100px', justifyContent: 'center' }}
                  variant="contained"
                  color="primary"
                  className={editClasses.button}
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
               defaultValue={tags.map(e => e.name)}
               style={{ width: 300 }}
               freeSolo
               onChange={handleTagChange}
            />
         </Grid>
         <Grid container justify="center" alignItems="center">
            <Button
               variant="contained"
               color="primary"
               className={editClasses.button}
               endIcon={<Icon>arrow_forward_ios</Icon>}
               onClick={handleSubmit}
               style={{ margin: '5px' }}
            >
               Submit
            </Button>
            <Button
               variant="contained"
               color="primary"
               className={editClasses.button}
               endIcon={<Icon>arrow_back_ios</Icon>}
               onClick={props.resetMode}
               style={{ margin: '5px' }}
            >
               Cancel
            </Button>
         </Grid>
      </div>
   )
}

export default withRouter(EditMemory)
