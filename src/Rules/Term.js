const Tokens = require("../Tokens");
const BinaryExpression = require("../Nodes/BinaryExpression");

class Term {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let node, right, operator;

    node = this.context.rule("Factor").handle();

    while (
      this.context.currentToken.is(Tokens.MUL_TOKEN) ||
      this.context.currentToken.is(Tokens.DIV_TOKEN)
    ) {
      if (this.context.currentToken.is(Tokens.MUL_TOKEN)) {
        this.context.shouldMatch(Tokens.MUL_TOKEN);
        right = this.context.rule("Factor").handle();
        operator = "*";
        node = new BinaryExpression(operator, node, right);
      } else {
        this.context.shouldMatch(Tokens.DIV_TOKEN);
        right = this.context.rule("Factor").handle();
        operator = "/";
        node = new BinaryExpression(operator, node, right);
      }
    }

    return node;
  }
}

module.exports = Term;
