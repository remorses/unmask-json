import * as fs from 'fs'
import { unmask } from './unmask'
import { logErr } from './helpers';
import { removeComments } from './helpers'

const unmaskFile = (file: string, indents = 0) => {
  if (file.split('.').reverse()[0] === 'json') {
    const json = fs.readFileSync(file, 'utf8')
    const object = JSON.parse(removeComments(json))
    return unmask(object, indents)
  }
  logErr('Unsupported file type ' + file.split('.').reverse()[0])
  process.exit(1)

}

const unmaskStream = (json, indents = 0) => {
  try{
    const object = JSON.parse(removeComments(json))
    return unmask(object, indents)
  }
  catch{
    return 'unable to parse'
  }

}


export { unmaskStream, unmaskFile, unmask }
