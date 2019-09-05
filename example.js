const Parser = require("./src/Parser");
const Compiler = require("./src/Compiler");

const stream = "(8+5)*(3-1)";

const parser = new Parser();
const compiler = new Compiler();

const result = parser.parse(stream);
const js = compiler.compile(result);

console.log(stream);
console.log(js);
eval(js);
