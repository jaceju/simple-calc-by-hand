const Tokens = require("../Tokens");

class StartState {
  constructor(context) {
    this.context = context;
  }

  isNextLine(char) {
    return char === "\r" || char === "\n";
  }

  isSpace(char) {
    return char === " ";
  }

  handle(char) {
    switch (true) {
      case this.context.states.SymbolState.isSymbol(char):
        return this.context.states.SymbolState.handle(char);
      case this.context.states.NumericState.isNumeric(char):
        return this.context.states.NumericState.handle(char);
      case this.context.states.EndState.isEOS(char):
        return this.context.states.EndState.handle(char);
      case this.isNextLine(char):
        this.context.currentLine++;
        return this; // Ignore next line chars
      case this.isSpace(char):
        return this; // Ignore space chars
      default:
        this.context.setToken(Tokens.INVALID_TOKEN, char);
        return this.context.states.EndState;
    }
  }
}

module.exports = StartState;
