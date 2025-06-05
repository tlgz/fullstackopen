const { identity } = require("lodash")
const Blog =require("../models/blogstyle")
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    
    response.json(result)
    
  })
  
  blogsRouter.post('/', async (request, response) => {

    
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

    
  
    const BlogSave = await blog.save()
    
    response.status(201).json(BlogSave)
    
  })

  module.exports=blogsRouter