import { smallFirst, zip } from './helpers'
import c = require('colors')




export const unmask = (object, indents) => {

  if (object) {
    const keys = Object.keys(object).map(s => s.toString())
    const values = keys.map(key => object[key])
    const state = zip(keys, values)
      .filter(({ key }) => !!key)
      .reduce(reducer, {
        result: '',
        indents: indents,
        iterations: 0,
        total: keys.length
      })
    return (state.result)

  }
  return ""
  // keys.map(console.log)
}



const reducer = (state, { key, value }) => {

  // key = c.cyan(key)
  const tab = !global['raw'] ? c.gray('.\t') : '\t'

  const { result, indents, iterations, total } = state

  const indentation = tab.repeat(indents)


  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':

      if (iterations == 0 && iterations === total - 1)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + '\n' + indentation + '}\n',
          indents: indents,
          iterations: iterations + 1
        }

      if (iterations == 0)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + '\n' + tab.repeat(indents - 1) + '}\n',
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


      if (object && object["constructor"] == Array && typeof object[0] !== 'object') {
        key = key + '[' + object.length + ']'
        object = { '...': '' }
      }

      while (object && object["constructor"] == Array) {
        key = key + '[' + object.length + ']'
        object = object[0]
      }



      if (iterations == 0 && iterations === total - 1)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + ' ' + unmask(object, indents + 1) + indentation + '}\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (iterations === 0)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + ' ' + unmask(object, indents),
          indents: indents + 1,
          iterations: iterations + 1
        }


      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + ' ' + unmask(object, indents) + tab.repeat(indents - 1) + '}\n',
          indents: indents - 1,
          iterations: iterations + 1
        }

      return {
        ...state,
        result: result + indentation + key + ' ' + unmask(object, indents),
        iterations: iterations + 1
      }

    default:
      console.log("strange type", value)
      return state


  }
}
