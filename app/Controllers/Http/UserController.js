'use strict'

const User = use('App/Models/User');
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

class UserController {
  async create(context) {
    const data = context.request.only(['name', 'email', 'password']);
    const user = await User.create(data);

    return user;
  }

  async show(context) {
    try {
      const user = await User.findOrFail(context.params.id);
      await user.load('settings');

      return user;
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.USER_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }
}

module.exports = UserController;
