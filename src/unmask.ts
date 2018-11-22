import { smallFirst, zip } from './helpers'
import c = require('colors')


export const unmaskJson = (json, indents) => {
  const object = JSON.parse(json)
  return unmask(object, indents)
}


export const unmask = (object, indents = 0) => {

  const keys = Object.keys(object).map(s => s.toString())
  const values = keys.map(key => object[key])
  const state = zip(keys, values)
    .reduce(reducer, {
      result: '',
      indents: indents,
      iterations: 0,
      total: keys.length
    })
  // keys.map(console.log)
  return (state.result)
}



const reducer = (state, { key, value }) => {

  // key = c.bold(key)

  const { result, indents, iterations, total } = state

  const indentation = '\t'.repeat(indents)

  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':

      if (iterations == 0 && iterations === total - 1)
        return {
          ...state,
          result: result + '{\n' + indentation + '\t' + key + '\n' + indentation + '}\n',
          indents: indents,
          iterations: iterations + 1
        }

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


      if (iterations == 0 && iterations === total - 1)
        return {
          ...state,
          result: result + '{\n' + indentation + '\t' + key + ' ' + unmask(object, indents) + indentation + '}\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (iterations === 0)
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
