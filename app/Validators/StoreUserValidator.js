'use strict'
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');
class StoreUserValidator {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      name: 'required'
    }
  }

  async fails(errorMessages) {
    const error = errorMessages[0];

    const messages = {
      email: {
        required: Messages.USER_VALIDATOR_EMAIL_REQUIRED,
        email: Messages.USER_VALIDATOR_EMAIL_INVALID,
        unique: Messages.USER_VALIDATOR_EMAIL_ALREADY_EXISTS,
      },
      password: {
        required: Messages.USER_VALIDATOR_PASSWORD_REQUIRED,
      },
      name: {
        required: Messages.USER_VALIDATOR_NAME_REQUIRED,
      },
    };

    const response = Utils.errorResponse(null, messages[error.field][error.validation]);
    return this.ctx.response.badRequest(response);
  }
}

module.exports = StoreUserValidator
