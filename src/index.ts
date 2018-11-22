import * as fs from 'fs'
import { unmaskJson, unmask } from './unmask'
import { logErr } from './helpers';

 const unmaskFile = (file: string, indents = 0) => {
  if (file.split('.').reverse()[0] === 'json')  {
    const json = fs.readFileSync(file, 'utf8')
    return unmaskJson(json, indents)
  }
  logErr('Unsupported file type ' + file.split('.').reverse()[0])
  process.exit(1)

}

 const unmaskStream = (stdin, indents = 0) => {
  let str = '';
  stdin.setEncoding('utf8');
  stdin.on('data', (chunk) => { str += chunk });
  stdin.on('end', unmaskJson(str, indents));
  stdin.resume();
}


export { unmaskStream, unmaskFile, unmask }
