class Reader {
  constructor() {
    this.currentPos = 0;
  }

  read(stream) {
    this.stream = stream;
  }

  /**
   * @returns {number|string}
   */
  nextChar() {
    // End of stream
    if (this.currentPos >= this.stream.length) {
      return -1;
    }

    return this.stream[this.currentPos++];
  }

  retract(n = 1) {
    this.currentPos -= n;

    if (this.currentPos < 0) {
      this.currentPos = 0;
    }
  }
}

module.exports = Reader;
