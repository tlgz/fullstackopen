
require('dotenv').config()

const Person = require('./models/person')
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())



app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))


  morgan.token('body', function (req) { return req.method === 'POST' ? JSON.stringify(req.body) : ' '})


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
    
  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })


app.get('/info', (request, response) => {
    const t= persons.length
    const d = new Date();
response.send(`<div>Phonebook has info for ${t} people </div> ${d}`)
  })

  const generateId = ()=>{
    return(getRandomInt(10000000))
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
    
   
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
      
    }
    
    /*if (persons.some(person=>person.name==body.name)) {
      return response.status(400).json({ 
        error: 'name in list' 
      })
      
    } */
  
    const person = new Person ({
      name: body.name,
      number: body.number,
      id: generateId(),
    })
  
    person.save().then(person=>response.json(person))
  })
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








