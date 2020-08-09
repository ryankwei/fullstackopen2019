import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
      authorOf {
        genres
        published
        title
      }
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      genres
      published
      title
      author {
        name
        born
        bookCount
      }
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($author: String!, $published: Int!, $title: String!, $genres: [String!]!) {
    addBook (
      title: $title,
      author: $author,
      published: $published,
      genres: $genres,
    ) {
      author {
        name
        born
        bookCount
      }
      published
      title
      genres
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query getBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      author {
        name
        born
        bookCount
      }
      published
      title
      genres
      id
    }
  }
`

export const UPDATE_BORN = gql`
  mutation updateBorn($name: String!, $born: Int!) {
    editAuthor (
      name: $name,
      setBornTo: $born
    ) {
      name
      born
      bookCount
      authorOf {
        genres
        published
        title
      }
      id
    }
  }
`
