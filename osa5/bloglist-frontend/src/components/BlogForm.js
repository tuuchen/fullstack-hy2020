import React from 'react'

const BlogForm = ({
  user,
  addBlog,
  title,
  author,
  url,
  handleBlogInputChange,
  handleLogout,
}) => (
  <>
    <h2>Create new blog</h2>
    <p>
      {user} logged in &nbsp;
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </p>
    <form onSubmit={addBlog}>
      <p>
        Title: <input name="Title" value={title} onChange={handleBlogInputChange} />
      </p>
      <p>
        Author: <input name="Author" value={author} onChange={handleBlogInputChange} />
      </p>
      <p>
        URL: <input name="URL" value={url} onChange={handleBlogInputChange} />
      </p>
      <button type="submit">save</button>
    </form>
  </>
)

export default BlogForm
