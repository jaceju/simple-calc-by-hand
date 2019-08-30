const Tokens = require("./../Tokens");

class SymbolState {
  constructor(context) {
    this.context = context;
    this.symbolTokenMap = {
      "+": Tokens.ADD_TOKEN,
      "-": Tokens.SUB_TOKEN,
      "*": Tokens.MUL_TOKEN,
      "/": Tokens.DIV_TOKEN,
      "(": Tokens.LEFT_PAREN_TOKEN,
      ")": Tokens.RIGHT_PAREN_TOKEN
    };
  }

  isSymbol(char) {
    return !!this.symbolTokenMap[char];
  }

  handle(char) {
    this.context.setToken(this.symbolTokenMap[char], char);
    return this.context.states.EndState;
  }
}

module.exports = SymbolState;
