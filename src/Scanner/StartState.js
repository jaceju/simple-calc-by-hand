class StartState {
  constructor(context) {
    this.context = context;
  }

  handle(char) {
    switch (true) {
      case this.context.states.SymbolState.isSymbol(char):
        return this.context.states.SymbolState.handle(char);
      case this.context.states.NumericState.isNumeric(char):
        return this.context.states.NumericState.handle(char);
      case this.context.states.EndState.isEOS(char):
        return this.context.states.EndState.handle(char);
      default:
        return this; // Ignore other chars
    }
  }
}

module.exports = StartState;
