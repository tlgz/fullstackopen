
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
    
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
    
})
.catch(error => {
  error => next(error)

})
  })

  app.put('/api/persons/:id', (request, response, next) => {
    
    const { name, number } = request.body
    Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
        person.name=name
        person.number=number

        return person.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
    })
    .catch(error => next(error))

})
    
  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })


/*app.get('/info', (request, response) => {
    const t= persons.length
    const d = new Date();
response.send(`<div>Phonebook has info for ${t} people </div> ${d}`)
  })*/

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


  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  
  app.use(unknownEndpoint)

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

  app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








