const { identity } = require("lodash")
const Blog =require("../models/blogstyle")
const blogsRouter = require('express').Router()


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
  })
  
  blogsRouter.post('/', (request, response) => {

    
    let result=request.body

    if(!result.likes){
      result.likes=0
    }

    if(!result.url){
    
      
      return response.status(400).json({ error: 'url missing' })
      
    }
    if(!result.title){
      
      return response.status(400).json({ error: 'title missing' })
    }
    

    const blog = new Blog(request.body)

    
  
    blog.save().then((result) => {
      response.status(201).json(result)
    })
  })

  module.exports=blogsRouter