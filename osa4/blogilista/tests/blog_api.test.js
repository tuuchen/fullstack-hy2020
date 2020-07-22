const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('object _id is defined as id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('the first blogs author is Michael Chan', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe('Michael Chan')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.blogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map((r) => r.title)
  expect(title).toContain('React patterns')
})

test('if no likes are defined, likes will default to 0', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  const likes = blogsAtEnd.map((n) => n.likes)
  expect(likes).toContain(0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})

test('modify a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToModify = blogsAtStart[0]

  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }

  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const title = blogsAtEnd.map((n) => n.title)
  expect(title).toContain('Go To Statement Considered Harmful')
})

test('delete succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)

  const title = blogsAtEnd.map((r) => r.title)
  expect(title).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
