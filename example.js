const Parser = require("./src/Parser");
const Interpreter = require("./src/Interpreter");

const stream = "5*(3-1)";

const parser = new Parser();
const interpreter = new Interpreter();

const result = parser.parse(stream);

console.log(JSON.stringify(result));
console.log(interpreter.run(result));
