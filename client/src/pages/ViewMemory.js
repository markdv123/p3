import React, { useState, useEffect } from 'react'
import { __GetAllTags } from '../services/TagService'

const ViewMemory = (props) => {
   const [allTags, setAllTags] = useState([])
   const [postTags, setPostTags] = useState([])

   useEffect(() => {
      getTheTags()
   }, [props.mem])

   
   const getTheTags = async () => {
      let everyTag
      if (!allTags.length) {
         try {
            everyTag = await __GetAllTags()
            setAllTags(everyTag)
         } catch (error) {
            throw error
         }
      }
      else 
         everyTag = allTags

      const theTags = everyTag.filter((tag) =>
         props.mem.tags.find((e) => e === tag.id)
      )
      setPostTags(theTags)
   }

   const convertDate = (d) => {
      return new Date(d).toLocaleString()
   }

   return (
      <div>
         <h2>{props.mem.name}</h2>

         <h3>{props.mem.date ? convertDate(props.mem.date) : null}</h3>
         <p>{props.mem.description}</p>
         <p>Tags:</p>
         <ul>
            {postTags.length
               ? postTags.map((tag) => <li key={tag.id}>{tag.name}</li>)
               : null}
         </ul>
         {props.mem.public === true ? (
            <h4>This is a public memory.</h4>
         ) : (
            <h4>This is a private memory.</h4>
         )}
      </div>
   )
}

export default ViewMemory
