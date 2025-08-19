const { identity } = require("lodash")
const Blog =require("../models/blogstyle")
const blogsRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate("user")
    
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
    
    const user = request.user
    

    
     if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

    const blog = new Blog({
      url:request.body.url,
      title:request.body.title,
      author:request.body.author,
      user: user._id,
      likes:request.body.likes
    }
    

      
    
    )

    
  
    const BlogSave = await blog.save()
    user.blogs = user.blogs.concat(BlogSave._id)
    await user.save()
    
    response.status(201).json(BlogSave)
    
  })

blogsRouter.delete('/:id', async (request, response) => {

  

  try {

    const user = request.user
    const blog = await Blog.findById(request.params.id) 
    if(!blog){
      return response.status(400).json({error  : "blog not found"})
    }
    
    if (user.id.toString() === request.user.toString() ) {
      await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
    
    } 
    else{
      return response.status(401).json({ error: 'unauthorized' })
    } 
  } catch (exception) {
    return response.status(400).json({ error: exception.message})
     }

    


})

blogsRouter.put('/:id', async (request, response)=>{


  const blog= await Blog.findById(request.params.id)

      if (!blog) {
        console.log("not found")
        return response.status(404).end()
      }

      blog.likes=request.body.likes

     const updatedNote= await blog.save()

      
       response.json(updatedNote)

    })


  module.exports=blogsRouter