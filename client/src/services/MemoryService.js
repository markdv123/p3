import ApiClient from './ApiClient'

/* 
   __CreateMemory ( userId, memory )

   memory is of the form 
   {
      name: <memoryName>,
      description: <memoryDescription>,
      location: { 
         long: <longitude>, 
         lat: <latitude>
      }
      tags: [ <tagId>, <tagId>, ... ]
   }

   this will return an object
   {
      id: <newMemoryId>,
      msg: "Memory created"
   }
*/

export const __CreateMemory = async ( userId, memory ) => {
   try {
      const res = await ApiClient.post(`/memory/create/${userId}`, memory )
      return res.data

   } catch (err) {
      throw err
   }
}

/* 
   __UpdateMemory ( memoryId, name, description ) 

   and returns 
   { msg: "Memory updated" }
*/

export const __UpdateMemory = async ( memoryId, name, description ) => {
   try { 
      const res = await ApiClient.put(`/memory/update/${memoryId}`, { name, description })
      return res.data
   }
   catch (err) {
      throw err
   }
}


/* 
   __UpdateMemoryTags ( memoryId, tags )
      tags is an array of tagIds  (all tags, not just new/updated ones)

   and returns 
   { msg: "Memory Tags updated" }
*/
export const __UpdateMemoryTags = async ( memoryId, tags ) => {
   try { 
      const res = await ApiClient.put(`/memory/tags/${memoryId}`, { tags })
      return res.data
   }
   catch (err) {
      throw err
   }
}

/*
   __DeleteMemory ( memoryId )

   returns { msg: "Memory destroyed" }
*/

export const __DeleteMemory = async ( memoryId ) => {
   try {
      const res = await ApiClient.delete(`/memory/${memoryId}`)
      return res.data
   }
   catch (err) {
      throw err
   }
}