import ApiClient from './ApiClient'

/*
    __GetAllTags() will return an array of Tags in the form
   [
      { 
      id: <tagId> , 
      name:  <tagName>
     }
   ]
 */
export const __GetAllTags = async () => {
   try {
      const res = await ApiClient.get('/tags')
      return res.data
   } catch (err) {
      throw err
   }
}
