class Token {
  constructor(type = 0, text = "", line = 1) {
    this.type = type;
    this.text = text;
    this.line = line;
  }

  set(type, text, line) {
    this.type = type;
    this.text = text;
    this.line = line;
  }
}

module.exports = Token;
