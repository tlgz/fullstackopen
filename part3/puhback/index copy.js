const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())



app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

let persons = [


  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
]

morgan.token('body', function (req) { return req.method === 'POST' ? JSON.stringify(req.body) : ' '})


function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

app.get('/api/persons', (request, response) => {
  response.json(persons)

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
  const d = new Date()
  response.send(`<div>Phonebook has info for ${t} people </div> ${d}`)
})

const generateId = () => {
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

  if (persons.some(person => person.name===body.name)) {
    return response.status(400).json({
      error: 'name in list'
    })

  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

