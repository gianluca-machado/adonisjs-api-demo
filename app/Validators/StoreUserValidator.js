'use strict'
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');
class StoreUserValidator {

  // visit https://indicative-v5.adonisjs.com/docs/syntax-guide#_nested_data
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6|max:30',
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
        min: Messages.USER_VALIDATOR_PASSWORD_MIN,
        max: Messages.USER_VALIDATOR_PASSWORD_MAX,
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
