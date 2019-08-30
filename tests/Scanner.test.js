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
