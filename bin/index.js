const program = require("commander");
const {unmaskStream, unmaskFile} = require("../lib");

program
  .option("-f, --file <file>", "Outputs the structure of a JSON file")
  .option(
    "-s, --stream ",
    "Outputs the structure from a JSON stream, using cat file > unmask "
  )
  .option("-i, --indents", "Set starting indents", 0)
  .parse(process.argv);

console.log(unmaskFile(program.file, program.indents));
