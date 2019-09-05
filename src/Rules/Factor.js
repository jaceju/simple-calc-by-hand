const Tokens = require("../Tokens");
const Literal = require("../Nodes/Literal");

class Factor {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let node;

    if (this.context.currentToken.is(Tokens.NUMERIC_TOKEN)) {
      node = new Literal(Number(this.context.currentToken.text));
      this.context.shouldMatch(Tokens.NUMERIC_TOKEN);
    } else {
      this.context.shouldMatch(Tokens.LEFT_PAREN_TOKEN);
      node = this.context.rule("Expression").handle();
      this.context.shouldMatch(Tokens.RIGHT_PAREN_TOKEN);
    }

    return node;
  }
}

module.exports = Factor;
