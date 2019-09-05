class Interpreter {
  run(expression) {
    return this.evalNode(expression);
  }

  evalNode(node) {
    switch (node.constructor.name) {
      case "ExpressionStatement":
        return this.evalNode(node.expression);
      case "BinaryExpression":
        let operator = node.operator;
        let left = this.evalNode(node.left);
        let right = this.evalNode(node.right);
        switch (operator) {
          case "+":
            return left + right;
          case "-":
            return left - right;
          case "*":
            return left * right;
          case "/":
            return left / right;
          default:
            return null;
        }
      case "Literal":
        return node.value;
      default:
        return null;
    }
  }
}

module.exports = Interpreter;
