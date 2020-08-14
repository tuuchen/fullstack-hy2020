import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    url: '',
  })
  const [message, setMessage] = useState({
    body: null,
    class: null,
  })
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    getInitialBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getInitialBlogs = async () => {
    const initialBlogs = await blogService.getAll()
    setBlogs(initialBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const newCredentials = {
      ...credentials,
    }

    try {
      const user = await loginService.login(newCredentials)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setCredentials({
        username: '',
        password: '',
      })
      setMessage({
        body: `Logged in as ${user.username}!`,
        class: 'success',
      })
      setTimeout(() => {
        setMessage({
          body: null,
          class: null,
        })
      }, 3000)
    } catch (error) {
      setMessage({
        body: `Wrong credentials!`,
        class: 'error',
      })
      setTimeout(() => {
        setMessage({
          body: null,
          class: null,
        })
      }, 3000)
    }
  }

  const handleLoginChange = (e) => {
    e.preventDefault()

    e.target.name === 'Username'
      ? setCredentials({
          ...credentials,
          username: e.target.value,
        })
      : setCredentials({
          ...credentials,
          password: e.target.value,
        })
  }

  const handleBlogChange = (e) => {
    e.preventDefault()

    e.target.name === 'Title'
      ? setNewBlog({
          ...newBlog,
          title: e.target.value,
        })
      : setNewBlog({
          ...newBlog,
          url: e.target.value,
        })
  }

  const handleLogout = () => {
    if (!window.confirm('Logout?')) return

    console.log('Logout!')
    window.localStorage.removeItem('loggedBlogappUser')
    // window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (e) => {
    e.preventDefault()

    if (!newBlog.title || !newBlog.url) return

    const blogObject = {
      ...newBlog,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
        title: '',
        url: '',
      })
      setMessage({
        body: `New blog: '${newBlog.title}' added by ${newBlog.author}`,
        class: 'success',
      })
      setTimeout(() => {
        setMessage({
          body: null,
          class: null,
        })
      }, 3000)
    } catch (error) {
      setMessage({
        body: error.message,
        class: 'error',
      })
      setTimeout(() => {
        setMessage({
          body: null,
          class: null,
        })
      }, 3000)
    }

    /*** PROMISE ***/

    /* blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        // some code here
      })
      .catch((error) => {
        // some code here
      }) */
  }

  return (
    <div>
      <Notification className={message.class} message={message.body} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleLoginChange={handleLoginChange}
          username={credentials.username}
          password={credentials.password}
        />
      ) : (
        <>
          <BlogForm
            user={user.name}
            title={newBlog.title}
            url={newBlog.url}
            addBlog={addBlog}
            handleBlogChange={handleBlogChange}
            handleLogout={handleLogout}
          />
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  )
}

export default App
