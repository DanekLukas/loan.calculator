import { addSpaces, addSpacesToFloat } from './utils'

describe('Add spaces to number', () => {
  test('It should generate string with spaces in number', () => {
    const input = 100000

    const output = '100 000'.replace(/ /g, '\u00a0')

    expect(addSpaces(input)).toEqual(output)
  })
})

describe('Add spaces to float number', () => {
  test('It should generate string with spaces in float number', () => {
    const input = 20201.678

    const output = '20 201,68'.replace(/ /g, '\u00a0')

    expect(addSpacesToFloat(input)).toEqual(output)
  })
})
