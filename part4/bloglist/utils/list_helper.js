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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}