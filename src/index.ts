
const zip = (arr1, arr2) => {
  let result
  if (arr1.length !== arr2.length) throw new Error('arrays length must be equeal')
  return arr1.map((key, i) => {
    return { key, value: arr2[i] }
  })
}

const unmask = (object) => {
  const keys = Object.keys(object).map(s => s.toString())
  const values = keys.map(key => object[key])
  zip(keys, values).sort(smallFirst).reduce(reducer, "")
}

const smallFirst = (a, b) => {
  if (typeof a == null) return -1
  if (typeof a == 'string') return -1
  if (typeof a == 'number') return -1
  if (typeof a == 'boolean') return -1
  return 0
}



const reducer = ({ result, indents, iterations, total }, { key, value }) => {



  const rest = {
    iterations: iterations + 1,
    total,
    indents
  }


  if (indents == 0)
    return {
      ...rest,
      result: result + '{\n',
      indents: indents + 1
    }

  if (iterations === total)
    return {
      ...rest,
      result: result + '}',
      indents: 0
    }

  const indentation = (<string>'\t').repeat(indents)



  switch (typeof value) {
    case null:
    case 'number':
    case 'string':
    case 'boolean':
      return {
        ...rest,
        result: result + key + '\n',
        indents
      }
    case 'object':
      let object = value
      if (value.constructor == Array) object = value[0]

      const keys = Object.keys(object).map(s => s.toString())
      const values = keys.map(key => object[key])
      return zip(keys, values)
        .sort(smallFirst)
        .reduce(reducer, {
          iterations: 0,
          total: 0,
          result,
          indents
        })
  }
}







`
{
	users [{
		id
    name
    errors { path }
  }]
}
`
