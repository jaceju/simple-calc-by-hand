const Scanner = require("../src/Scanner");
const Tokens = require("../src/Tokens");
const Token = require("../src/Token");

test("Scanner should get a symbol token by one char", () => {
  const stream = "+ - */( )";
  const scanner = new Scanner();

  scanner.scan(stream);

  expect(scanner.nextToken()).toEqual(new Token(Tokens.ADD_TOKEN, "+"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.SUB_TOKEN, "-"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.MUL_TOKEN, "*"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.DIV_TOKEN, "/"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.LEFT_PAREN_TOKEN, "("));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.RIGHT_PAREN_TOKEN, ")"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.EOS_TOKEN));
});

test("Scanner should get a numeric token by chars", () => {
  const stream = "1 23 456";
  const scanner = new Scanner();

  scanner.scan(stream);

  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "1"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "23"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "456"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.EOS_TOKEN));
});

test("Scanner should get tokens from a valid expression", () => {
  const stream = "25*(3-1)/6+4";
  const scanner = new Scanner();

  scanner.scan(stream);

  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "25"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.MUL_TOKEN, "*"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.LEFT_PAREN_TOKEN, "("));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "3"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.SUB_TOKEN, "-"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "1"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.RIGHT_PAREN_TOKEN, ")"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.DIV_TOKEN, "/"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "6"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.ADD_TOKEN, "+"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "4"));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.EOS_TOKEN));
});

test("Scanner should get tokens from the multi-lines expression", () => {
  const stream = `25
  *(3-1)
  /6
  +4`;
  const scanner = new Scanner();

  scanner.scan(stream);

  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "25", 1));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.MUL_TOKEN, "*", 2));
  expect(scanner.nextToken()).toEqual(
    new Token(Tokens.LEFT_PAREN_TOKEN, "(", 2)
  );
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "3", 2));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.SUB_TOKEN, "-", 2));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "1", 2));
  expect(scanner.nextToken()).toEqual(
    new Token(Tokens.RIGHT_PAREN_TOKEN, ")", 2)
  );
  expect(scanner.nextToken()).toEqual(new Token(Tokens.DIV_TOKEN, "/", 3));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "6", 3));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.ADD_TOKEN, "+", 4));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.NUMERIC_TOKEN, "4", 4));
  expect(scanner.nextToken()).toEqual(new Token(Tokens.EOS_TOKEN, "", 4));
});
