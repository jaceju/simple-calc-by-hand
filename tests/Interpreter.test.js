const each = require("jest-each").default;
const Interpreter = require("../src/Interpreter");
const ExpressionStatement = require("../src/Nodes/ExpressionStatement");
const BinaryExpression = require("../src/Nodes/BinaryExpression");
const Literal = require("../src/Nodes/Literal");

each([
  [
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
    ),
    1
  ],
  [
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
    ),
    4
  ],
  [
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
    ),
    4
  ]
]).test("Interpreter should eval the expression", (expression, expected) => {
  const interpreter = new Interpreter();
  const result = interpreter.run(expression);
  expect(result).toEqual(expected);
});
