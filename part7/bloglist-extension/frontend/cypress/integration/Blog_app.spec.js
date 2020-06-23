describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      const body = {
        title: "Test Blog",
        author: "Test Blog Author",
        url: "Test Blog Url",
      }
      const body1 = {
        title: "Test Blog 1",
        author: "Test Blog Author 1",
        url: "Test Blog Url 1",
      }
      const body2 = {
        title: "Test Blog 2",
        author: "Test Blog Author 2",
        url: "Test Blog Url 2",
      }
      const body3 = {
        title: "Test Blog 3",
        author: "Test Blog Author 3",
        url: "Test Blog Url 3",
      }
      cy.createBlog(body)
      cy.createBlog(body1)
      cy.createBlog(body2)
      cy.createBlog(body3)
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Some Title')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('Some Url')
      cy.contains('create').click()

      cy.contains('Some Title Some Author')
    })
    it('Liking a blog', function() {
      cy.contains('Test Blog Test Blog Author').contains('view').click()
      cy.contains('Test Blog Test Blog Author').parent().contains('Like').click()
      cy.contains('likes: 1')
    })
    it('correct user can delete blog', function() {
      cy.contains('Test Blog Test Blog Author').contains('view').click()
      cy.contains('Test Blog Test Blog Author').parent().find('#deleteButton')
    })
    it('lists are in correct sorted order', function() {
      cy.get('#Blog')
        .then((blogs) => {
          cy.wrap(blogs).should('equal', blogs.sort((a, b) => b.likes - a.likes))
        })
    })
  })
})
