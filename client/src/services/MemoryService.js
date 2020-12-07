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

      name: <memoryName>,
      description: <memoryDescription>,
      location: { 
         long: <longitude>, 
         lat: <latitude>
      }
      tags: [ <tagId>, <tagId>, ... ]

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
   __UpdateMemory ( memoryId, memory ) 
   where memory is 
   {      
      name: <memoryName>,
      description: <memoryDescription>,
      public: boolean,
      tags: [ <tagId>, <tagId>, ... ]
   }

   and returns the memory object
   
*/

export const __UpdateMemory = async ( memoryId, memory ) => {
   try { 
      const res = await ApiClient.put(`/memory/update/${memoryId}`, { memory })
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


export const __GetMemories = async ( userId ) => {
   try {
      const res = await ApiClient.get(`/memory/${userId}`)
      return res.data
   }
   catch (err) {
      throw err
   }
}