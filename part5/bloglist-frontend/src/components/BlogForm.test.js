import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('handler receives right details', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const author = component.container.querySelector("#author")
    const title = component.container.querySelector("#title")
    const url = component.container.querySelector("#url")
    const form = component.container.querySelector("form")

    fireEvent.change(author, {
      target: { value: 'Some Author' }
    })
    fireEvent.change(title, {
      target: { value: 'Some Title' }
    })
    fireEvent.change(url, {
      target: { value: 'Some Url' }
    })
    fireEvent.submit(form)

    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Some Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Some Author')
    expect(createBlog.mock.calls[0][0].url).toBe('Some Url')
  })
})
