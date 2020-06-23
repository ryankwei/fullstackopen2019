import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let updateBlog
  let removeBlog
  beforeEach(() => {
    const blog = {
      author: "Some Name",
      title: "Some Title",
      url: "Some url",
      user: {
        username: "Username",
        id: 1
      },
      id: 1,
      likes: 0
    }
    const user = {
      id: 1
    }

    updateBlog = jest.fn()
    removeBlog = jest.fn()
    component = render(
      <Blog blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />
    )
  })

  test('initially renders correct content', () => {
    expect(component.container).toHaveTextContent(
      'Some Name'
    )
    expect(component.container).toHaveTextContent(
      'Some Title'
    )
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('correct information is displayed after button press', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Some Name'
    )
    expect(component.container).toHaveTextContent(
      'Some Title'
    )
    expect(component.container).toHaveTextContent(
      'Some url'
    )
    expect(component.container).toHaveTextContent(
      'likes: 0'
    )
  })

  test('like button click', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
