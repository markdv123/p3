import React, { useState, useEffect } from 'react'
import { makeStyles, FormControl, InputLabel, Select, Chip, MenuItem, Input, useTheme } from '@material-ui/core'
import TextInput from '../components/TextInput'
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
        minWidth: 120,
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

function getStyles(name, tags, theme) {
    return {
        fontWeight:
            tags.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

const CreateMemory = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const [location, setLocation] = useState({ long: 0, lat: 0 })
    const [isPublic, setPublic] = useState(null)
    const [tags, setTags] = useState([])
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        getTheTags()
        console.log(allTags)
    }, [])

    const getTheTags = async () => {
        try {
            const everyTag = await __GetAllTags()
            console.log(everyTag)
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

    return (
        <div>
            <FormControl className={classes.formcontrol} noValidate autoComplete="off">
                <TextInput
                    id="standard-basic"
                    className={classes.textField}
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={handleName}
                />
                <TextInput
                    className={classes.textField}
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={handleDesc}
                />
                <div>
                    <label>Public or Private Memory</label>
                    <select className="browser-default"
                        name='isPublic'
                        value={isPublic}
                        onChange={handlePublic}>
                        <option value="" disabled selected>Choose your option</option>
                        <option value="false">Public</option>
                        <option value="true">Private</option>
                    </select>
                </div>
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
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {allTags.map((tag, i) => (
                            <MenuItem key={i} value={tag.id} style={getStyles(tag.name, tags, theme)}>
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormControl>

        </div>
    )
}

export default CreateMemory