'use strict'
const User = use('App/Models/User');
class SessionController {
  async create(context) {
    const user = context.request.all();

    try {
      return await context.auth.attempt(user.email, user.password);
    } catch (error) {
      const body = {
        error: true,
        message: 'api.error.message.login_failed_invalid_credentials',
      };
      return context.response.status(400).send(body);
    }
  }

  async validate(context) {
    return await context.auth.check();
  }
}

module.exports = SessionController;
