export const addSpaces = (num: number) => {
  const spaceAfter = 3
  const rev = num.toString().split('').reverse()
  for (let i = Math.floor((rev.length - 1) / spaceAfter); i > 0; i--) {
    rev.splice(spaceAfter * i, 0, ' ')
  }
  return rev.reverse().join('')
}

export const addSpacesToFloat = (num: number) => {
  const arStr = num.toFixed(2).split('.')
  return [addSpaces(parseInt(arStr[0])), arStr[1]].join(',')
}
