import * as fs from 'fs'
import c = require('colors')
const zip = (arr1, arr2) => {
  let result
  if (arr1.length !== arr2.length) throw new Error('arrays length must be equeal')
  return arr1.map((key, i) => {
    return { key, value: arr2[i] }
  })
}

export const unmask = (object, indents = 0) => {

  const keys = Object.keys(object).map(s => s.toString())
  const values = keys.map(key => object[key])
  const state = zip(keys, values)
    .sort(smallFirst)
    .reduce(reducer, {
      result: '',
      indents: indents,
      iterations: 0,
      total: keys.length
    })
  return state.result
}

const smallFirst = (a, b) => {
  if (typeof a == null) return -1
  if (typeof a == 'string') return -1
  if (typeof a == 'number') return -1
  if (typeof a == 'boolean') return -1
  return 0
}



const reducer = (state, { key, value }) => {

  const { result, indents, iterations, total } = state

  const indentation = '\t'.repeat(indents)

  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':
      if (iterations == 0)
        return {
          ...state,
          result: result + '{\n' + indentation + '\t' + key + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + '\n' + '\t'.repeat(indents - 1) + '}\n',
          indents: indents - 1,
          iterations: iterations + 1
        }

      return {
        ...state,
        result: result + indentation + key + '\n',
        iterations: iterations + 1
      }
    case 'object':
      let object = value

      if (value.constructor == Array) object = value[0]

      if (iterations == 0)
        return {
          ...state,
          result: result + '{\n' + indentation + '\t' + key + ' ' + unmask(object, indents) + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }


      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + ' ' + unmask(object, indents) + '\t'.repeat(indents - 1) + '}\n',
          indents: indents - 1,
          iterations: iterations + 1
        }

      return {
        ...state,
        result: result + indentation + key + ' ' + unmask(object, indents) + '\n',
        iterations: iterations + 1
      }


  }
}

const unmaskJson = (json, indents) => {
  const object = JSON.parse(json)
  return unmask(object, indents)
}

export const error = (e: Error) => console.log(c.red(e.message))

export const unmaskFile = (file: string, indents = 0) => {
  const json = fs.readFileSync(file, 'utf8')
  return unmaskJson(json, indents)

}

export const unmaskStream = (stdin, indents = 0) => {
  let str = '';
  stdin.setEncoding('utf8');
  stdin.on('data', (chunk) => { str += chunk });
  stdin.on('end', unmaskJson(str, indents));
  stdin.resume();
}
