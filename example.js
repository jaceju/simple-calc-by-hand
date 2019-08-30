const Parser = require("./src/Parser");

const stream = "5-(3-1)/2*4";

const parser = new Parser();

const result = parser.parse(stream);

console.log(JSON.stringify(result));
