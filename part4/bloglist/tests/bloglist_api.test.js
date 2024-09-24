const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('bloglist api:', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.initialUsers) {
      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    }

    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    }
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const blogs = await api.get('/api/blogs')

    assert("id" in blogs.body[0])
  })

  test('new blog post successfully saved', async () => {
    const newBlog = {
      title: "New Blog",
      author: "Dewey Alvin",
      url: "http://newblogwebsite.html",
      likes: 20
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body
    assert.strictEqual(returnedBlog.title, newBlog.title)
    assert.strictEqual(returnedBlog.author, newBlog.author)
    assert.strictEqual(returnedBlog.url, newBlog.url)
    assert.strictEqual(returnedBlog.likes, newBlog.likes)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length + 1)
  })

  test('if likes property is missing, default to value 0', async () => {
    const newBlog = {
      title: "New Blog",
      author: "Dewey Alvin",
      url: "http://newblogwebsite.html"
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedBlog = response.body
    assert.strictEqual(returnedBlog.likes, 0)
  })

  test('if title or url property is missing, status code 400', async () => {
    const newBlogOne = {
      author: "Dewey Alvin",
      url: "http://newblogwebsite.html",
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlogOne)
      .expect(400)

    const newBlogTwo = {
      title: "New Blog",
      author: "Dewey Alvin",
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlogTwo)
      .expect(400)

    const newBlogThree = {
      author: "Dewey Alvin",
      likes: 20
    }

    await api
      .post('/api/blogs')
      .send(newBlogThree)
      .expect(400)
  })

  test('deleting by specific id works', async () => {
    const initialResponse = await api.get('/api/blogs')
    const id = initialResponse.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length - 1)
  })

  test('updating by specific id works', async () => {
    const initialResponse = await api.get('/api/blogs')

    const currentBlog = initialResponse.body[0]
    const id = currentBlog.id

    const updatedBlog = {
      title: currentBlog.title,
      author: currentBlog.author,
      url: currentBlog.url,
      likes: 1000
    }

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 1000)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})