#!/usr/bin/env node
const program = require("commander");
const {unmaskStream, unmaskFile} = require("../lib");
const c = require("colors");

program
  .option("-f, --file <file>", "Outputs the structure of a JSON file.")
  .option(
    "-r, --raw",
    "Remove colors and points that mark tabs. Useful when writing to a file"
  )
  .option(
    "-s, --stream ",
    "Outputs the structure from a JSON stream, using cat file > unmask."
  )
  .option("-i, --indents", "Set starting indentation.", 1)
  .parse(process.argv);

if (program.raw) global.raw = true;

if (!program.file) {
  console.error(c.red("please enter a file path to unmask."));
  process.exit(1);
}
console.log(
  program.file.split(".")[0] +
    " " +
    unmaskFile(program.file, program.indents, program.raw)
);
