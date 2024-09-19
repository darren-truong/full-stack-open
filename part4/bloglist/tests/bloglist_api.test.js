const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('bloglist api:', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
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
  
    // Access the returned object
    const returnedBlog = response.body
  
    // You can now assert on the returned object if needed
    assert.strictEqual(returnedBlog.title, newBlog.title)
    assert.strictEqual(returnedBlog.author, newBlog.author)
    assert.strictEqual(returnedBlog.url, newBlog.url)
    assert.strictEqual(returnedBlog.likes, newBlog.likes)
  
    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length + 1)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})