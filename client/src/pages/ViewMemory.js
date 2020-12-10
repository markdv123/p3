import React from 'react'
import { __GetAllTags } from '../services/TagService'

const ViewMemory = ( { memory } ) => {

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

export default ViewMemory
