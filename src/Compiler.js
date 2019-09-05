class Compiler {
  compile(expression) {
    return this.translateNode(expression);
  }

  translateNode(node) {
    switch (node.constructor.name) {
      case "ExpressionStatement":
        let expression = this.translateNode(node.expression);
        return `console.log(${expression});`;
      case "BinaryExpression":
        let operator = node.operator;
        let left = this.translateNode(node.left);
        let right = this.translateNode(node.right);
        switch (operator) {
          case "+":
            return `(${left} + ${right})`;
          case "-":
            return `(${left} - ${right})`;
          case "*":
            return `(${left} * ${right})`;
          case "/":
            return `(${left} / ${right})`;
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

module.exports = Compiler;
