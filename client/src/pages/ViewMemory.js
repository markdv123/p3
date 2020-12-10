import React, { useState, useEffect } from 'react'
import { __GetAllTags } from '../services/TagService'

const Viewmemory = ( { memory } ) => {
   const [allTags, setAllTags] = useState([])
   const [postTags, setPostTags] = useState([])

   // const { memory } = props

   useEffect(() => {
      getTheTags()
   }, [memory])

   
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
         memory.tags.find((e) => e === tag.id)
      )
      setPostTags(theTags)
   }

   const convertDate = (d) => {
      return new Date(d).toLocaleString()
   }

   return (
      <div>
         <h2>{memory.name}</h2>

         <h3>{memory.date ? convertDate(memory.date) : null}</h3>
         <p>{memory.description}</p>
         <p>Tags:</p>
         <ul>
            {memory.tags.length
               ? memory.tags.map((tag) => <li key={tag.id}>{tag.name}</li>)
               : null}
         </ul>
         {memory.public === true ? (
            <h4>This is a public memory.</h4>
         ) : (
            <h4>This is a private memory.</h4>
         )}
      </div>
   )
}

export default Viewmemory
