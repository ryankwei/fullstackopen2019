const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  response.json(blog.populate("user", { username: 1, name: 1 }).toJSON())
})
blogRouter.post('/', async (request, response) => {
  console.log(request.token)
  console.log(process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'invalid or missing token'})
  }
  if(!request.body.title || !request.body.author || !request.body.url) {
    return response.status(400).json( { error: 'content missing' } )
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result.populate("user", { username: 1, name: 1 }).toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'invalid or missing token'})
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if( blog.user.toString() === user._id.toString()) {
    await blog.remove()
    user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
    await user.save()
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: 'unauthorized delete '})
  }
})

blogRouter.put('/:id', async (request, response) => {
  if(!request.body.title || !request.body.author || !request.body.url) {
    return response.status(400).json( { error: 'content missing' } )
  }
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  const updatedObj = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate("user", { username: 1, name: 1 })
  response.json(updatedObj.toJSON())
})

module.exports = blogRouter
