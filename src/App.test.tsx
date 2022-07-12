import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { store } from './app/store'
import Loan from './app/Loan'
import React from 'react'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Loan />
    </Provider>
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
