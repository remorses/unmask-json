
import c = require('colors')

export const zip = (arr1, arr2) => {
  let result
  if (arr1.length !== arr2.length) throw new Error('arrays length must be equeal')
  return arr1.map((key, i) => {
    return { key, value: arr2[i] }
  })
}

export const smallFirst = (a, b) => {
  if (typeof a == null) return -1
  if (typeof a == 'string') return -1
  if (typeof a == 'number') return -1
  if (typeof a == 'boolean') return -1
  return 0
}


export const logErr = (e) => console.log(c.red(e))

export const keyColor = x => c.green(x)
