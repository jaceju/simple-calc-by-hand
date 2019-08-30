class Token {
  constructor(type = 0, text = "") {
    this.type = type;
    this.text = text;
  }

  set(type, text) {
    this.type = type;
    this.text = text;
  }
}

module.exports = Token;
