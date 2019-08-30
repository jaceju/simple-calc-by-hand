const Scanner = require("./Scanner");
const Tokens = require("./Tokens");

class Parser {
  constructor() {
    this.scanner = new Scanner();
    this.currentToken = null;
  }

  shouldMatch(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.scanner.nextToken();
    } else {
      throw this.haltOn(this.currentToken);
    }
  }

  haltOn(token) {
    return `Parse error: Unexpected '${token.text}' (${token.type}) on line ${token.line}`;
  }

  parse(stream) {
    this.scanner.scan(stream);
    this.currentToken = this.scanner.nextToken();

    try {
      return this.expression();
    } catch (e) {
      return e;
    }
  }

  expression() {
    let value = this.term();

    while (
      this.currentToken.is(Tokens.ADD_TOKEN) ||
      this.currentToken.is(Tokens.SUB_TOKEN)
    ) {
      if (this.currentToken.is(Tokens.ADD_TOKEN)) {
        this.shouldMatch(Tokens.ADD_TOKEN);
        value += this.term();
      } else {
        this.shouldMatch(Tokens.SUB_TOKEN);
        value -= this.term();
      }
    }

    return value;
  }

  term() {
    let value = this.factor();

    while (
      this.currentToken.is(Tokens.MUL_TOKEN) ||
      this.currentToken.is(Tokens.DIV_TOKEN)
    ) {
      if (this.currentToken.is(Tokens.MUL_TOKEN)) {
        this.shouldMatch(Tokens.MUL_TOKEN);
        value *= this.factor();
      } else {
        this.shouldMatch(Tokens.DIV_TOKEN);
        value /= this.factor();
      }
    }

    return value;
  }

  factor() {
    let value = 0;

    if (this.currentToken.is(Tokens.NUMERIC_TOKEN)) {
      value = Number(this.currentToken.text);
      this.shouldMatch(Tokens.NUMERIC_TOKEN);
    } else {
      this.shouldMatch(Tokens.LEFT_PAREN_TOKEN);
      value = this.expression();
      this.shouldMatch(Tokens.RIGHT_PAREN_TOKEN);
    }

    return value;
  }
}

module.exports = Parser;
