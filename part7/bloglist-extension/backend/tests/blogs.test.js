const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const testBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "5e82dd9c019beca8b0cae469"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "5e82dd9c019beca8b0cae46a"
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "5e82dd9d019beca8b0cae46b"
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "5e82dd9d019beca8b0cae46c"
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "5e82dd9d019beca8b0cae46c"
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "5e82dd9d019beca8b0cae46b"
  }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of testBlogs) {
      const blogObj = new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
      })
      await blogObj.save()
    }
})

test('proper blog length list length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length == 6)
})

test('ids are unique', async () => {
  const response = await api.get('/api/blogs')

  console.table(response.body)
  console.log(response.body)
  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('post request and likes set to 0', async () => {
  const response = await api.get('/api/blogs')
  const length = response.body.length

  const newBlog = {
    title: "FullStackOpen",
    author: "Univ of Helsinki",
    url: "https://fullstackopen.com/en",
    user: "5e82dd9d019beca8b0cae46b"
  }
  const login = await api.post('/login').send({ username: "Abramov", password: "aaaa" })
  console.log(login)
  const res = await api.post('/api/blogs').send(newBlog).set('Authorization', 'bearer ' + login.body.token)
  const response2 = await api.get('/api/blogs')

  const newLength = response2.body.length

  expect(newLength === length + 1)
  expect(res.body.likes === 0)

})

test('bad request verification', async () => {
  const missingTitle = {
    author: "Univ of Helsinki",
    url: "https://fullstackopen.com/en",
    likes: 15,
    user: "5e82dd9d019beca8b0cae46b"
  }

  const missingURL = {
    title: "FSO",
    author: "Univ of Helsinki",
    likes: 15,
    user: "5e82dd9d019beca8b0cae46b"
  }
  const login = await api.post('/login').send({ username: "Abramov", password: "aaaa" })

  await api.post('/api/blogs').send(missingTitle).set('Authorization', 'bearer ' + login.body.token).expect(400)
  await api.post('/api/blogs').send(missingURL).set('Authorization', 'bearer ' + login.body.token).expect(400)
})
afterAll(() => {
  mongoose.connection.close()
})
