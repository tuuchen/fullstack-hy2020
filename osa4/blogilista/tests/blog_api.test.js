const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await User.deleteMany({})
})

describe('Creating new user', () => {
  test('fails with status code 400 if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'ro',
      name: 'Superuser',
      password: 'sekret',
    }

    const newUser = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with status code 400 if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'se',
    }

    const newUser = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
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
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const userWithPassword = {
    username: user.username,
    password: 'sekret',
  }

  const login = await api
    .post('/api/login')
    .send(userWithPassword)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    userId: savedUser.id,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + login.body.token)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  const likes = blogsAtEnd.map((n) => n.likes)
  expect(likes).toContain(0)
})

test('blog without title or url is not added', async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const userWithPassword = {
    username: user.username,
    password: 'sekret',
  }

  const login = await api
    .post('/api/login')
    .send(userWithPassword)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlog = {
    author: 'Edsger W. Dijkstra',
    userId: savedUser.id,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + login.body.token)
    .send(newBlog)
    .expect(400)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})

test('blog without token is not added', async () => {
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const newBlog = {
    author: 'Edsger W. Dijkstra',
    userId: savedUser.id,
  }

  await api.post('/api/blogs').send(newBlog).expect(401)
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
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const userWithPassword = {
    username: user.username,
    password: 'sekret',
  }

  const login = await api
    .post('/api/login')
    .send(userWithPassword)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogToDelete = {
    title: 'Vue is awesome',
    author: 'Tuukka Tihekari',
    url: 'https://madewithvuejs.com/',
    likes: 7,
  }

  const createNewBlog = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + login.body.token)
    .send(blogToDelete)

  const id = createNewBlog.body.id

  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', 'bearer ' + login.body.token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length)

  const title = blogsAtEnd.map((r) => r.title)
  expect(title).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
