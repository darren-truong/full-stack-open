const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => sum + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((greatest, current) => {
    if (Object.keys(greatest).length === 0) {
      return {
        title: current.title,
        author: current.author,
        likes: current.likes
      }
    }
    if (current.likes > greatest.likes) {
      return {
        title: current.title,
        author: current.author,
        likes: current.likes
      }
    }
    return greatest
  }, {})
}

const mostBlogs = (blogs) => {
  authors = blogs.reduce((greatest, current) => {
    if (!greatest[current.author]) {
      greatest[current.author] = 1
      return greatest
    }
    greatest[current.author] += 1
    return greatest
  }, {})

  return Object.entries(authors).reduce((greatest, current) => {
    if (Object.keys(greatest).length === 0) {
      return {
        author: current[0],
        blogs: current[1]
      }
    }
    if (current[1] > greatest.blogs) {
      return {
        author: current[0],
        blogs: current[1]
      }
    }
    return greatest
  }, {})
}

const mostLikes = (blogs) => {
  authors = blogs.reduce((greatest, current) => {
    if (!greatest[current.author]) {
      greatest[current.author] = current.likes
      return greatest
    }
    greatest[current.author] += current.likes
    return greatest
  }, {})

  return Object.entries(authors).reduce((greatest, current) => {
    if (Object.keys(greatest).length === 0) {
      return {
        author: current[0],
        likes: current[1]
      }
    }
    if (current[1] > greatest.likes) {
      return {
        author: current[0],
        likes: current[1]
      }
    }
    return greatest
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}