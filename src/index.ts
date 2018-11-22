
const zip = (arr1, arr2) => {
  let result
  if (arr1.length !== arr2.length) throw new Error('arrays length must be equeal')
  return arr1.map((key, i) => {
    return { key, value: arr2[i] }
  })
}

export const unmask = (object, indents = 0): string => {

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
  console.log(iterations, state)



  const indentation = '\t'.repeat(indents)

  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':
      if (iterations == 0)
        return {
          ...state,
          result: result  + '{\n' + indentation + '\t' + key + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }

      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + '\n' + '\t'.repeat(indents - 1) + '}\n',
          indents: 0,
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
          result: result  + '{\n' + indentation + '\t' + key + ' ' + unmask(object, indents + 1) + '\n',
          indents: indents + 1,
          iterations: iterations + 1
        }


      if (iterations === total - 1)
        return {
          ...state,
          result: result + indentation + key + ' ' + unmask(object, indents + 1) + '\t'.repeat(indents - 1)+ '}\n',
          indents: 0,
          iterations: iterations + 1
        }

      return {
        ...state,
        result: result + indentation + key + ' ' + unmask(object, indents + 1) + '\n',
        indents: indents + 1,
        iterations: iterations + 1
      }


  }
}



console.log(unmask({

  name: "sdf",
  object: {
    name: 234,
    bool: true,

  }
}))
