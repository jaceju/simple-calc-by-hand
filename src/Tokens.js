const Tokens = {
  EOS_TOKEN: "EOS_TOKEN", // end of stream
  NUMERIC_TOKEN: "NUMERIC_TOKEN", // "[0-9]+"
  ADD_TOKEN: "ADD_TOKEN", // "+"
  SUB_TOKEN: "SUB_TOKEN", // "-"
  MUL_TOKEN: "MUL_TOKEN", // "*"
  DIV_TOKEN: "DIV_TOKEN", // "/"
  LEFT_PAREN_TOKEN: "LEFT_PAREN_TOKEN", // "("
  RIGHT_PAREN_TOKEN: "RIGHT_PAREN_TOKEN", // ")"
  INVALID_TOKEN: "INVALID_TOKEN"
};

module.exports = Tokens;
