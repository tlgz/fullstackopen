const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogstyle')
const User = require('../models/user')
const api = supertest(app)

const initialBlogs = [
  {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
          {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
]
const bcrypt = require('bcrypt')
beforeEach(async () => {
  await Blogs.deleteMany({})
  let BlogObject = new Blogs(initialBlogs[0])
  await BlogObject.save()
  BlogObject = new Blogs(initialBlogs[1])
  await BlogObject.save()
  await User.deleteMany({})
  
     const saltRounds = 10
     const password= "tlll"
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
              username: "test",
              name: "test",
              passwordHash
      })
      await user.save()
  
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})


test('notes have id not _id', async () => {
  const response=await api.get('/api/blogs')
    
  result= response.body.some(blog => blog.id !== undefined)
  assert.strictEqual(result, true)
    })
    
    


test('note posting works', async () => {
  
 const blog=
  { 
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
  
  const response=await api.post('/api/blogs')
  .send(blog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

   const responses = await api.get('/api/blogs')
   

  const contents = responses.body.map(e => e.title)
  assert(contents.includes('Go To Statement Considered Harmful'))
  
 

    

})

test('note with empty likes returns 0', async () => {
    
 const blog=
  { 
    title: 'Go To Statement Considered hurrrrt',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }

  const response=await api.post('/api/blogs')
  .send(blog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const responses = await api.get('/api/blogs')

  const contents = responses.body.filter(e => e.title=="Go To Statement Considered hurrrrt")

  
  assert.strictEqual(contents[0].likes,0)
})

test('no url or title returns 500', async () => {

  const blog=
  { 
    title: 'Go To Statement Considered hurrrrt',
    author: 'Edsger W. Dijkstra',
    
    likes: 5
  }
  const response=await api.post('/api/blogs')
  .send(blog)
  .expect(400)
  
  

  const blogs=
  { 
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
  const responses=await api.post('/api/blogs')
  .send(blogs)
  .expect(400)

})


test('test for single blog deletion', async () => {

   const result= await api.delete('/api/blogs/5a422b3a1b54a676234d17f9')
    .expect(204)

    

    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, 1)
})


test('put works', async () => {

  
  const updatedblog=
  { 

    likes: 5
  }

    await api.put('/api/blogs/5a422b3a1b54a676234d17f9').send(updatedblog)
    

    const response3 = await api.get('/api/blogs')
    

    const contents1 = response3.body.filter(e => e.id=="5a422b3a1b54a676234d17f9")

    assert.strictEqual(contents1[0].likes,5)


   
})





after(async () => {
  await mongoose.connection.close()
})