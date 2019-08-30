const Tokens = require("./../Tokens");

class NumericState {
  constructor(context) {
    this.context = context;
    this.buffer = "";
  }

  isNumeric(char) {
    return char >= "0" && char <= "9";
  }

  handle(char) {
    this.buffer += char;

    char = this.context.reader.nextChar();

    if (this.isNumeric(char)) {
      return this.context.states.NumericState.handle(char);
    } else {
      let buffer = this.flushBuffer();
      this.context.setToken(Tokens.NUMERIC_TOKEN, buffer);

      // 避免讀到字串結尾時不結束
      if (!this.context.states.EndState.isEOS(char)) {
        this.context.reader.retract();
      }

      return this.context.states.EndState;
    }
  }

  flushBuffer() {
    let buffer = this.buffer;
    this.buffer = "";
    return buffer;
  }
}

module.exports = NumericState;
