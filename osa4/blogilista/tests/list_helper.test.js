const listHelper = require('../utils/list_helper')
const testHelper = require('../tests/test_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testHelper.emptyBlog)
    expect(result).toBe(0)
  })

  test('list with only one blog equals to that blog', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.blogs)
    expect(result).toBe(36)
  })
})

describe('find the favourite blog', () => {
  test('of empty list returns zero', () => {
    const result = listHelper.favouriteBlog(testHelper.emptyBlog)
    expect(result).toBe(0)
  })

  test('list with only one blog equals to that blog', () => {
    const result = listHelper.favouriteBlog(testHelper.listWithOneBlog)
    expect(result).toEqual(testHelper.listWithOneBlog[0])
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favouriteBlog(testHelper.blogs)
    expect(result).toEqual(testHelper.blogs[2])
  })
})

describe('find author with the most blogs', () => {
  const authorWithOneBlog = {
    author: 'Edsger W. Dijkstra',
    blogs: 1,
  }

  const topAuthor = {
    author: 'Robert C. Martin',
    blogs: 3,
  }

  test('of empty list returns zero', () => {
    const result = listHelper.mostBlogs(testHelper.emptyBlog)
    expect(result).toBe(0)
  })

  test('list with only one blog equals to that blog', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
    expect(result).toEqual(authorWithOneBlog)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(testHelper.blogs)
    expect(result).toEqual(topAuthor)
  })
})

describe('find author with the most likes', () => {
  const likesWithOneBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }

  const topLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  }

  test('of empty list returns zero', () => {
    const result = listHelper.mostLikes(testHelper.emptyBlog)
    expect(result).toBe(0)
  })

  test('list with only one blog equals to that blog', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog)
    expect(result).toEqual(likesWithOneBlog)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(testHelper.blogs)
    expect(result).toEqual(topLikes)
  })
})
