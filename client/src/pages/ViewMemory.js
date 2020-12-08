import React, { useState, useEffect } from 'react'
import { __GetAllTags } from '../services/TagService'

const ViewMemory = (props) => {
    const [allTags, setAllTags] = useState([])
    const [postTags, setPostTags] = useState([])

    useEffect(() => {
        getTheTags()
    }, [])

    // const getTheTags = async () => {
    //     try {
    //         const everyTag = await __GetAllTags()
    //         setAllTags(everyTag)
    //         setTags()
    //     } catch (error) {
    //         throw error
    //     }
    // }
    const getTheTags = async () => {
        try {
            const everyTag = await __GetAllTags()
            const theTags = everyTag.filter((tag) => props.mem.tags.find(e => e === tag.id))
            setPostTags(theTags)
        } catch (error) {
            throw error
        }
    }

    const convertDate = (d) => {
        return new Date(d).toLocaleString()
    }

    // const setTags = () => {
    //     const tags = props.mem.tags
    //     const thePostTags = []
    //     tags.map((tag) => {
    //         thePostTags.push(allTags.find(e => e.id === tag))
    //         console.log(allTags.find(e => e.id === tag))
    //     })
    //     console.log(thePostTags)
    //     setPostTags(thePostTags)
    //     console.log(postTags)
    // }

    return (
        <div>
            <h2>{props.mem.name}</h2>
            <h3>{convertDate(props.mem.date)}</h3>
            <p>{props.mem.description}</p>
            <p>Tags:</p>
            <ul>
                {postTags.length ? postTags.map((tag) => (<li key={tag.id}>{tag.name}</li>)) : null}
            </ul>
            {props.mem.public === true ? (<h4>This is a public memory.</h4>) : (<h4>This is a private memory.</h4>)}
        </div>
    )
}

export default ViewMemory