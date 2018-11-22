#!/usr/bin/env node
const program = require("commander");
const {unmaskStream, unmaskFile} = require("../lib");
const c = require("colors");

program
  .option("-f, --file <file>", "Outputs the structure of a JSON file")
  .option(
    "-s, --stream ",
    "Outputs the structure from a JSON stream, using cat file > unmask "
  )
  .option("-i, --indents", "Set starting indents", 0)
  .parse(process.argv);

if (!program.file) {
  console.error(c.red("please enter a file path to unmask"));
  process.exit(1);
}
console.log(unmaskFile(program.file, program.indents));
