import React, { useState, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, Chip, MenuItem, Input, useTheme, Button, Grid, TextField } from '@material-ui/core'
import TextInput from '../components/TextInput'
import Icon from '@material-ui/core/Icon'
import { withRouter } from 'react-router-dom'
import { __CreateMemory } from '../services/MemoryService'
import { __GetAllTags } from '../services/TagService'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
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

const CreateMemory = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const [userId, setUserId] = useState(props.currentUser.id)
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [isPublic, setPublic] = useState(null)
    const [tags, setTags] = useState([])
    const [allTags, setAllTags] = useState([])

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

    const handleName = ({ target }) => {
        setName(target.value)
    }

    const handleDesc = ({ target }) => {
        setDesc(target.value)
    }

    const handlePublic = ({ target }) => [
        setPublic(target.value)
    ]

    const handleTags = ({ target }) => [
        setTags(target.value)
    ]

    const handleSubmit = async () => {
        try {
            const res = await __CreateMemory(userId, {
                name: name,
                description: description,
                public: isPublic,
                location: {
                    long: props.newLoc.lng,
                    lat: props.newLoc.lat
                },
                tags: tags
            })
            console.log('res', res)
            props.history.push('/profile')
        } catch (error) {
            throw error
        }
    }

    return (
        <div style={{height: "80vh", display: "grid"}}>
                <Grid container justify="center" alignItems="center">
                    <FormControl className={classes.formcontrol} noValidate autoComplete="off">
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
                    <FormControl className={classes.formcontrol} noValidate autoComplete="off">
                        <TextField
                            style={{width: '450px'}}
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
                        <InputLabel id="demo-simple-select-label">Public or Private Memory</InputLabel>
                        <Select
                            name='isPublic'
                            value={isPublic}
                            onChange={handlePublic}>
                            <MenuItem value="false">Public</MenuItem>
                            <MenuItem value="true">Private</MenuItem>
                        </Select>
                    </FormControl>
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
                                        <Chip key={value} label={allTags.find(e => e.id === value).name} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {allTags.map((tag) => {
                                console.log(tag)
                                return (
                                    <MenuItem key={tag.id} value={tag.id} style={getStyles(tag, tags, theme)}>
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
                        endIcon={<Icon>send</Icon>}
                        onClick={handleSubmit}
                    >
                        Submit
                </Button>
                </Grid>
        </div>
    )
}

export default withRouter(CreateMemory)