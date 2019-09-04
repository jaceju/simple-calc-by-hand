const Tokens = require("../Tokens");

class Term {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let value = this.context.rule("Factor").handle();

    while (
      this.context.currentToken.is(Tokens.MUL_TOKEN) ||
      this.context.currentToken.is(Tokens.DIV_TOKEN)
    ) {
      if (this.context.currentToken.is(Tokens.MUL_TOKEN)) {
        this.context.shouldMatch(Tokens.MUL_TOKEN);
        value *= this.context.rule("Factor").handle();
      } else {
        this.context.shouldMatch(Tokens.DIV_TOKEN);
        value /= this.context.rule("Factor").handle();
      }
    }

    return value;
  }
}

module.exports = Term;
