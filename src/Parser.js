const Scanner = require("./Scanner");
const Rules = require("./Rules");

class Parser {
  constructor() {
    this.scanner = new Scanner();
    this.currentToken = null;
    this.rules = new Rules(this);
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

  rule(name) {
    return this.rules.get(name);
  }

  parse(stream) {
    this.scanner.scan(stream);
    this.currentToken = this.scanner.nextToken();

    try {
      return this.rules.startRule().handle();
    } catch (e) {
      return e;
    }
  }
}

module.exports = Parser;
