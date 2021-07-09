'use strict'

const User = use('App/Models/User');
const Logger = use('Logger');

class UserController {
  async create ({ request }) {
    const data = request.only(['username', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;