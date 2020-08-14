import React from 'react'

const BlogForm = ({
  user,
  addBlog,
  title,
  author,
  url,
  handleBlogChange,
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
        Title:
        <input name="Title" value={title} onChange={handleBlogChange} />
      </p>
      <p>
        Author:
        <input name="Author" value={author} onChange={handleBlogChange} />
      </p>
      <p>
        URL: <input name="URL" value={url} onChange={handleBlogChange} />
      </p>
      <button type="submit">save</button>
    </form>
  </>
)

export default BlogForm
