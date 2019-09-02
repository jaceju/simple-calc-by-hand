const Reader = require("./Reader");
const Token = require("./Token");
const StartState = require("./Scanner/StartState");
const SymbolState = require("./Scanner/SymbolState");
const NumericState = require("./Scanner/NumericState");
const EndState = require("./Scanner/EndState");

class Scanner {
  constructor() {
    this.currentLine = 1;
    this.reader = new Reader();
    this.currentToken = new Token();
    this.states = {
      StartState: new StartState(this),
      SymbolState: new SymbolState(this), // + - * / ( )
      NumericState: new NumericState(this), // 1 2 3 ...
      EndState: new EndState(this)
    };
  }

  scan(stream) {
    this.reader.read(stream);
  }

  setToken(type, text = "") {
    this.currentToken.set(type, text, this.currentLine);
  }

  nextToken() {
    let state = this.states.StartState;

    while (!(state instanceof EndState)) {
      const char = this.reader.nextChar();
      state = state.handle(char);
    }

    return this.currentToken;
  }
}

module.exports = Scanner;
