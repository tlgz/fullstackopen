const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})


test('notes have id not _id', async () => {
  const response=await api.get('/api/blogs')
    response.body.forEach(element => {
      expect(element.id).toBeDefined()
    })
    
    
})


after(async () => {
  await mongoose.connection.close()
})