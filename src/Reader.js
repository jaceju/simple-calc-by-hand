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
}

module.exports = Reader;
