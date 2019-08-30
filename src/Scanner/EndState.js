const Tokens = require("../Tokens");

class EndState {
  constructor(context) {
    this.context = context;
  }

  isEOS(char) {
    return char === -1;
  }

  handle(char) {
    if (this.isEOS(char)) {
      this.context.setToken(Tokens.EOS_TOKEN);
    }
    return this;
  }
}

module.exports = EndState;
