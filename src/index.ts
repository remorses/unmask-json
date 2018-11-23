import * as fs from 'fs'
import {  unmask } from './unmask'
import { logErr } from './helpers';
import { removeComments } from './helpers'

 const unmaskFile = (file: string, indents = 1) => {
  if (file.split('.').reverse()[0] === 'json')  {
    const json = fs.readFileSync(file, 'utf8')
    const object = JSON.parse(removeComments(json))
    return unmask(object, indents)
  }
  logErr('Unsupported file type ' + file.split('.').reverse()[0])
  process.exit(1)

}

 const unmaskStream = (stdin, indents = 1) => {
  let str = '';
  stdin.setEncoding('utf8');
  stdin.on('data', (chunk) => { str += chunk });
  stdin.on('end', unmask(JSON.parse(removeComments(str)), indents));
  stdin.resume();
}


export { unmaskStream, unmaskFile, unmask }
