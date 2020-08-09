import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
const Recommend = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const userRes = useQuery(ME)

  useEffect(() => {
    if(!userRes.loading) {
      getBooks({ variables: { genre: userRes.data.me.favoriteGenre }})
    }
  }, [userRes, getBooks])

  useEffect(() => {
    if(result.called && result.networkStatus > 6 && result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  // useEffect(() => {
  //   console.log("This is books", books)
  // }, [books])

  if( userRes.loading ) {
    return (
      <div>loading...</div>
    )
  }

  if (!props.show) {
    return null
  }

  const bookRow = (book) => (
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  return (
    <div>
      <h2>books</h2>
      books in your favorite genre <b>{userRes.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            bookRow(book)
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
