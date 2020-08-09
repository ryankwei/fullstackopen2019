import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'
const Books = (props) => {
//  const res = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const [genresList, setGenresList] = useState([])

  useEffect(()=> {
    const genre = selectedGenre === 'all genres' ? null : selectedGenre
    getBooks({ variables: { genre: genre }})
  }, [selectedGenre, getBooks])

  useEffect(() => {
    if(result.called && result.networkStatus > 6 && result.data && result.data.allBooks) {
      setBooks(result.data.allBooks)
      if(selectedGenre === 'all genres') {
        let genres = ['all genres']
        for ( let book of result.data.allBooks ) {
          for ( let genre of book.genres ) {
            if(!genres.includes(genre))
              genres = genres.concat(genre)
          }
        }
        setGenresList(genres)
      }
    }
  }, [result, selectedGenre])

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
      in genre <b>{selectedGenre}</b>
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
      {genresList.map(genre =>
        <button key={genre} onClick={()=>setSelectedGenre(genre)}>{genre}</button>
      )}
    </div>
  )
}

export default Books
