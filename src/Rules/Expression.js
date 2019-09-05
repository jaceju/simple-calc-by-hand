const Tokens = require("../Tokens");
const BinaryExpression = require("../Nodes/BinaryExpression");

class Expression {
  constructor(context) {
    this.context = context;
  }

  handle() {
    let node, right, operator;

    node = this.context.rule("Term").handle();

    while (
      this.context.currentToken.is(Tokens.ADD_TOKEN) ||
      this.context.currentToken.is(Tokens.SUB_TOKEN)
    ) {
      if (this.context.currentToken.is(Tokens.ADD_TOKEN)) {
        this.context.shouldMatch(Tokens.ADD_TOKEN);
        right = this.context.rule("Term").handle();
        operator = "+";
        node = new BinaryExpression(operator, node, right);
      } else {
        this.context.shouldMatch(Tokens.SUB_TOKEN);
        right = this.context.rule("Term").handle();
        operator = "-";
        node = new BinaryExpression(operator, node, right);
      }
    }

    return node;
  }
}

module.exports = Expression;
