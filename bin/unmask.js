#!/usr/bin/env node

const program = require("commander");
const getStdin = require('get-stdin');
const { unmaskStream, unmaskFile } = require("../lib");
const c = require("colors");

program
  .option("-f, --file <file>", "Outputs the structure of a JSON file.")
  .option("-r, --raw", "Remove colors and points that mark tabs. Useful when writing to a file")
  .option("-s, --stream ", "Outputs the structure from a JSON stream, using cat file > unmask.")
  .option("-i, --indents", "Set starting indentation.", 0)
  .parse(process.argv)

if (program.raw) global.raw = true;

if (program.file) {

  console.log(
    program.file
    .split("/")
    .reverse()[0]
    .split(".")[0] +
    " " +
    unmaskFile(program.file, program.indents || 0))

} else if (program.stream) {

  getStdin()
    .then(str => {
      console.log(
        unmaskStream(str, program.indents)
      )
    })

} else {

  console.error(c.red("please enter a file or stream of json."))
  process.exit(1)

}
