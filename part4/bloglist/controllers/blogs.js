const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new : true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response, next) => {
  const randomUser = await User.find({})
  const randomUserId = randomUser[Math.floor(Math.random() * randomUser.length)].id
  const user = await User.findById(randomUserId)

  try {
    const blog = new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    response.status(400).end()
    next(exception)
  }
})

module.exports = blogsRouter