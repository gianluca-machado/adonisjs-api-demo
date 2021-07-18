'use strict'
const User = use('App/Models/User');
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

class SessionController {
  async create(context) {
    try {
      const user = context.request.all();
      return await context.auth.attempt(user.email, user.password);
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.LOGIN_FAILED_INVALID_CREDENTIALS);
      return context.response.badRequest(response);
    }
  }

  async validate(context) {
    return await context.auth.check();
  }
}

module.exports = SessionController;
