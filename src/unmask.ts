import { smallFirst, zip } from './helpers'
import c = require('colors')

if (!global['raw']) c.enabled = true


export const unmask = (object, indents) => {

  if (object) {
    const keys = Object.keys(object).map(s => s.toString())
    const values = keys.map(key => object[key]).sort(smallFirst)
    const state = zip(keys, values)
      .reduce(reducer, {
        result: '',
        indents: indents,
        iterations: 0,
        total: keys.length
      })
    return (state.result)

  }
  return "_"
  // keys.map(console.log)
}



const reducer = (state, { key, value }) => {



  const tab = !global['raw'] ? c.gray('.\t') : '\t'

  const { result, indents, iterations, total } = state

  const indentation = tab.repeat(indents)

  const isFirst = iterations == 0
  const isLast = iterations === total - 1


  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':


      if (isFirst && isLast)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + '\n' + indentation + '}\n',
          indents: indents,
          iterations: iterations + 1
        }

      if (isFirst)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (isLast)
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
        object = { '...': '_' }
      }
      if (Object.keys(object).length === 0) {
        object = { '_': '_' }
      }

      while (object && object["constructor"] == Array && typeof object[0] === 'object') {
        key = key + '[' + object.length + ']'
        object = object.sort((a, b) => Object.keys(a).length < Object.keys(b).length ? -1 : 1)[0]
      }




      if (isFirst && isLast)
        return {
          ...state,
          result: result  + '{\n' + indentation + tab + key + ' ' + unmask(object, indents + 1) + indentation + '}\n',
          indents: indents ,
          iterations: iterations + 1
        }

      if (iterations === 0)
        return {
          ...state,
          result: result + '{\n' + indentation + tab + key + ' ' + unmask(object, indents + 1),
          indents: indents + 1,
          iterations: iterations + 1
        }


      if (iterations === total - 1)
        return {
          ...state,
          result: result  + indentation + key + ' ' + unmask(object, indents) + tab.repeat(indents - 1) + '}\n',
          indents: indents - 1,
          iterations: iterations + 1
        }



      return {
        ...state,
        result: result  + indentation + key + ' ' + unmask(object, indents ) ,
        iterations: iterations + 1
      }

    default:
      console.log("strange type", value)
      return { ...state, result: result + c.red(' strange value '), iterations: iterations + 1 }


  }
}
