const Expression = require("./Rules/Expression");
const Term = require("./Rules/Term");
const Factor = require("./Rules/Factor");

class Rules {
  constructor(context) {
    this.rules = {
      Expression: new Expression(context),
      Term: new Term(context),
      Factor: new Factor(context)
    };
  }

  startRule() {
    return this.rules.Expression;
  }

  get(name) {
    return this.rules[name];
  }
}

module.exports = Rules;
