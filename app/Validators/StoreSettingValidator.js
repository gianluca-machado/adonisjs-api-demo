'use strict'
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');
const LanguageEnum = use('App/Enumerations/LanguageEnum');

class StoreSettingValidator {

  // visit https://indicative-v5.adonisjs.com/docs/syntax-guide#_nested_data
  get rules() {
    return {
      darkmode: 'required|boolean',
      language: `required|in:${LanguageEnum.values}`,
    }
  }

  async fails(errorMessages) {
    const error = errorMessages[0];

    const messages = {
      darkmode: {
        required: Messages.SETTING_VALIDATOR_DARKMODE_REQUIRED,
        boolean: Messages.SETTING_VALIDATOR_DARKMODE_INVALID_BOOLEAN,
      },
      language: {
        required: Messages.SETTING_VALIDATOR_LANGUAGE_REQUIRED,
        in: Messages.SETTING_VALIDATOR_LANGUAGE_INVALID_ENUM,
      },
    };

    const response = Utils.errorResponse(null, messages[error.field][error.validation]);
    return this.ctx.response.badRequest(response);
  }
}

module.exports = StoreSettingValidator
