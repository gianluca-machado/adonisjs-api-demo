'use strict'

class Utils {
  static errorResponse(error, message) {
    const response = {
      error: true,
      originalError: error,
      message,
    };

    return response;
  }

  static updateObject(properties, data, obj) {
    for (let i = 0; i < properties.length; i++) {
      obj[properties[i]] = data[properties[i]];
    }
    return obj;
  }
}

module.exports = Utils
