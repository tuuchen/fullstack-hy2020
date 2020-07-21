const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // const sumOfLikes = blogs.reduce((a, b) => ({ value: a.likes + b.likes }))
  const reducer = (a, b) => a + b.likes
  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  var obj = {}
  for (var i = 0, j = blogs.length; i < j; i++) {
    if (obj[blogs[i].author]) {
      obj[blogs[i].author]++
    } else {
      obj[blogs[i].author] = 1
    }
  }

  const topAuthor = Object.keys(obj).reduce((a, b) => (a > b ? a : b))
  const amountOfBlogs = Object.values(obj).reduce((a, b) => (a > b ? a : b))

  author = {
    author: topAuthor,
    blogs: amountOfBlogs,
  }

  return author
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  var obj = {}
  for (var i = 0, j = blogs.length; i < j; i++) {
    if (obj[blogs[i].author]) {
      obj[blogs[i].author] += blogs[i].likes
    } else {
      obj[blogs[i].author] = blogs[i].likes
    }
  }

  const topAuthor = Object.keys(obj).reduce((a, b) => (a < b ? a : b))
  const amountOfLikes = Object.values(obj).reduce((a, b) => (a > b ? a : b))

  author = {
    author: topAuthor,
    likes: amountOfLikes,
  }

  return author
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
