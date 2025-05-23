import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const update = (id, newObject) => {
    
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  const deletefrom=(personId)=>{
    console.log(personId)
    return axios.delete(`${baseUrl}/${personId}`)
  }

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletefrom:deletefrom
}