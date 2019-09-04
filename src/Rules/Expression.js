const Tokens = require("../Tokens");

class Expression {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let value = this.context.rule("Term").handle();

    while (
      this.context.currentToken.is(Tokens.ADD_TOKEN) ||
      this.context.currentToken.is(Tokens.SUB_TOKEN)
    ) {
      if (this.context.currentToken.is(Tokens.ADD_TOKEN)) {
        this.context.shouldMatch(Tokens.ADD_TOKEN);
        value += this.context.rule("Term").handle();
      } else {
        this.context.shouldMatch(Tokens.SUB_TOKEN);
        value -= this.context.rule("Term").handle();
      }
    }

    return value;
  }
}

module.exports = Expression;
