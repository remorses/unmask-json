#!/usr/bin/env node

const program = require('commander')
const { stdin } = require('process')
const { unmaskStream, unmaskFile } = require('../lib')




program
  .option('-f, --file <file>', 'Outputs the structure of a JSON file')
  .option('-i, --indents', 'Set starting indents', 0)
  .parse(process.argv);



program.file ?
  unmaskFile(program.file, program.indents) :
  unmaskStream(stdin, program.indents)
