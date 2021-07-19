'use strict'
const Utils = use('App/Utils/Utils');

class StoreUserValidator {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      name: 'required'
    }
  }

  get sanitizationRules() {
    return {
      email: 'normalize_email'
    }
  }

  async fails(errorMessages) {
    const error = errorMessages[0];

    const messages = {
      email: {
        required: 'api.error.message.email_required',
        unique: 'api.error.message.email_already_exists',
        email: 'api.error.message.email_invalid',
      },
      password: {
        required: 'api.error.message.password_required',
      },
      name: {
        required: 'api.error.message.name_required',
      },
    };

    const response = Utils.errorResponse(null, messages[error.field][error.validation]);
    return context.response.badRequest(response);
  }
}

module.exports = StoreUserValidator
