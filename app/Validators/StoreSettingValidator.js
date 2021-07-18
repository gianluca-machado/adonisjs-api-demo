'use strict'
const Utils = use('App/Utils/Utils');
class StoreSettingValidator {
  get rules() {
    return {
      darkmode: 'required',
      language: 'required'
    }
  }

  async fails(errorMessages) {
    const error = errorMessages[0];
    Logger.error(error);

    const messages = {
      darkmode: {
        required: 'api.error.message.darkmode_required',
      },
      language: {
        required: 'api.error.message.language_required',
      },
    };

    const response = Utils.errorResponse(null, messages[error.field][error.validation]);
    return context.response.badRequest(response);
  }
}

module.exports = StoreSettingValidator
