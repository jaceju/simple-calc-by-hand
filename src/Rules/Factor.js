const Tokens = require("../Tokens");

class Factor {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let value = 0;

    if (this.context.currentToken.is(Tokens.NUMERIC_TOKEN)) {
      value = Number(this.context.currentToken.text);
      this.context.shouldMatch(Tokens.NUMERIC_TOKEN);
    } else {
      this.context.shouldMatch(Tokens.LEFT_PAREN_TOKEN);
      value = this.context.rule("Expression").handle();
      this.context.shouldMatch(Tokens.RIGHT_PAREN_TOKEN);
    }
    return value;
  }
}

module.exports = Factor;
