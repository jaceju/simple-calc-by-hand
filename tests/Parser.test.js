const Parser = require("../src/Parser");

test("Parser should eval the expression", () => {
  const stream = "5-(3-1)/2*4";
  const parser = new Parser();

  expect(parser.parse(stream)).toBe(1);
});

test("Parser should throw a parsing error", () => {
  const stream = `5-
a`;
  const parser = new Parser();

  expect(parser.parse(stream)).toBe(
    "Parse error: Unexpected 'a' (INVALID_TOKEN) on line 2"
  );
});
