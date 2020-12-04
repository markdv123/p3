import ApiClient from './ApiClient'

export const __LoginUser = async (email, password) => {
   try {
      const res = await ApiClient.post('/users/login', { email: email, password: password } )
      return res.data
   } catch (err) {
      throw err
   }
}

export const __RegisterUser = async ( name, email, password) => {
   try {
      const res = await ApiClient.post('/users/create', {
         name, email, password, tier
      })
      return res.data
   }
   catch (err) {
      throw err
   }
}

