'use strict'

class Messages {
  // Not found
  static SETTING_NOT_FOUND_EXCEPTION = 'api.error.message.setting_not_found_exception';
  static USER_NOT_FOUND_EXCEPTION = 'api.error.message.user_not_found_exception';
  static ROUTE_NOT_FOUND_EXCEPTION = 'api.error.message.route_not_found_exception';

  // Authorization
  static UNAUTHORIZED = 'api.error.message.unauthorized';
  static USER_NOT_AUTHORIZED = 'api.error.message.user_not_authorized';
  static LOGIN_FAILED_INVALID_CREDENTIALS = 'api.error.message.login_failed_invalid_credentials';

  // validator
  static USER_VALIDATOR_NAME_REQUIRED = 'api.error.message.name_required';
  static USER_VALIDATOR_PASSWORD_REQUIRED = 'api.error.message.password_required';
  static USER_VALIDATOR_PASSWORD_MIN = 'api.error.message.password_min';
  static USER_VALIDATOR_PASSWORD_MAX = 'api.error.message.password_max';
  static USER_VALIDATOR_EMAIL_REQUIRED = 'api.error.message.email_required';
  static USER_VALIDATOR_EMAIL_INVALID = 'api.error.message.email_invalid';
  static USER_VALIDATOR_EMAIL_ALREADY_EXISTS = 'api.error.message.email_already_exists';
  static SETTING_VALIDATOR_DARKMODE_REQUIRED = 'api.error.message.darkmode_required';
  static SETTING_VALIDATOR_DARKMODE_INVALID_BOOLEAN = 'api.error.message.darkmode_invalid_boolean';
  static SETTING_VALIDATOR_LANGUAGE_REQUIRED = 'api.error.message.language_required';
  static SETTING_VALIDATOR_LANGUAGE_INVALID_ENUM = 'api.error.message.language_invalid_enum';
  
  // General
  static HTTP_EXCEPTION = 'api.error.message.http_exception';
}

module.exports = Messages;
