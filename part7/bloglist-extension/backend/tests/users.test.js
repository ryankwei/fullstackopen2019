const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const User = require('../models/user')
const testUsers = [
    { name: "Arto Hellas", username: "Hellas", password: "12321" },
    { name: "Ada Lovelace", username: "Lovelace", password: "password"},
    { name: "Dan Abramov", username: "Abramov", password: "aaaa"},
    { name: "Mary Poppendieck", username: "Poppendieck", password: "p@ssw0rd"}
]

beforeEach(async () => {
  await User.deleteMany({})

  for (let userof of testUsers) {
    const passwordHash = await bcrypt.hash(userof.password, 10)
    const userObj = new User({
      username: userof.username,
      name: userof.name,
      password: passwordHash,
    })
    await userObj.save()
  }
})

test('adding an invalid username', async () => {
  const newUser = testUsers[0]
  const userObj = new User({
    username: newUser.username,
    name: newUser.name,
    password: newUser.password,
  })
  const response = await api.post('/api/blogs').send(userObj).expect(400)
})

afterAll(() => {
  mongoose.connection.close();
})
