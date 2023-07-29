const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundErr;
