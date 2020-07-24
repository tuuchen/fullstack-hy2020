const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/* const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */

blogsRouter.get('/', async (req, res) => {
  const allBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(allBlogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: user.name,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(200).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  })
  res.status(200).json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.user.toString() === decodedToken.id.toString()) {
    const response = await Blog.findByIdAndRemove(id)
    return res.status(204).json(response)
  }

  return res.status(401).json({
    error: 'Not authorized to delete!',
  })
})

module.exports = blogsRouter
