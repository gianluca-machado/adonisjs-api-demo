'use strict'
const Logger = use('Logger');

class Utils {
  static errorResponse(error, message) {
    const response = {
      error: true,
      originalError: error,
      message,
    };

    Logger.error("%j", response);
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
