
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
  if (typeof a == 'object' && typeof b == 'object')
    return Object.keys(a).length < Object.keys(b).length ? -1 : 1
  if (typeof a == 'object') return 1
  return 0
}


export const logErr = (e) => console.log(c.red(e))

export const keyColor = x => c.green(x)


export const removeComments = (str, opts = {}) => {
  const singleComment = 1;
  const multiComment = 2;
  const stripWithoutWhitespace = () => '';
  const stripWithWhitespace = (str: string, start?: number, end?: number) => str.slice(start, end).replace(/\S/g, ' ');

  const strip = opts['whitespace'] === false ? stripWithoutWhitespace : stripWithWhitespace;

  let insideString: boolean | number = false;
  let insideComment: boolean | number = false;
  let offset = 0;
  let ret = '';

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];
    const nextChar = str[i + 1];

    if (!insideComment && currentChar === '"') {
      const escaped = str[i - 1] === '\\' && str[i - 2] !== '\\';
      if (!escaped) {
        insideString = !insideString;
      }
    }

    if (insideString) {
      continue;
    }

    if (!insideComment && currentChar + nextChar === '//') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = singleComment;
      i++;
    } else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
      continue;
    } else if (insideComment === singleComment && currentChar === '\n') {
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
    } else if (!insideComment && currentChar + nextChar === '/*') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = multiComment;
      i++;
      continue;
    } else if (insideComment === multiComment && currentChar + nextChar === '*/') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i + 1);
      offset = i + 1;
      continue;
    }
  }

  return ret + (insideComment ? strip(str.substr(offset)) : str.substr(offset));
};
