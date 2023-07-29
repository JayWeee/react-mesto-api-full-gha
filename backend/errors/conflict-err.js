const { HTTP_STATUS_CONFLICT } = require('http2').constants;

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictErr;
