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

