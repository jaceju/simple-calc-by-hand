const each = require("jest-each").default;
const Parser = require("../src/Parser");
const ExpressionStatement = require("../src/Nodes/ExpressionStatement");
const BinaryExpression = require("../src/Nodes/BinaryExpression");
const Literal = require("../src/Nodes/Literal");

each([
  [
    "5-(3-1)*2",
    new ExpressionStatement(
      new BinaryExpression(
        "-",
        new Literal(5),
        new BinaryExpression(
          "*",
          new BinaryExpression("-", new Literal(3), new Literal(1)),
          new Literal(2)
        )
      )
    )
  ],
  [
    "5-(3/1)+2",
    new ExpressionStatement(
      new BinaryExpression(
        "+",
        new BinaryExpression(
          "-",
          new Literal(5),
          new BinaryExpression("/", new Literal(3), new Literal(1))
        ),
        new Literal(2)
      )
    )
  ],
  [
    "5*(3+1)/(2+3)",
    new ExpressionStatement(
      new BinaryExpression(
        "/",
        new BinaryExpression(
          "*",
          new Literal(5),
          new BinaryExpression("+", new Literal(3), new Literal(1))
        ),
        new BinaryExpression("+", new Literal(2), new Literal(3))
      )
    )
  ]
]).test("Parser should parse the expression to an AST", (stream, expected) => {
  const parser = new Parser();
  const result = parser.parse(stream);
  expect(result).toEqual(expected);
});

test("Parser should throw a parsing error", () => {
  const stream = `5-
a`;
  const parser = new Parser();

  expect(parser.parse(stream)).toBe(
    "Parse error: Unexpected 'a' (INVALID_TOKEN) on line 2"
  );
});
