
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()

  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) => set.map(p=>p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if(!includedIn(dataInStore.allBooks, newBook)) {

      client.writeQuery({
        query: ALL_BOOKS,
        data: { ...dataInStore, allBooks : dataInStore.allBooks.concat(newBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded
      window.alert(`New Book ${newBook.title} has been added`)
      updateCacheWith(newBook)
      setPage('books')
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={()=> setPage('login')}>login</button>}
        {token && <button onClick={()=> setPage('recommend')}>recommend</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={(data)=>{ setToken(data); setPage('authors') }}
      />

      <Recommend
        show={page === 'recommend'}
        token={token}
      />

    </div>
  )
}

export default App
