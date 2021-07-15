'use strict'

class CreateUser {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      name: 'required'
    }
  }

  async fails(errorMessages) {
    const body = {
      error: true,
      message: 'api.error.message.email_already_exists',
    };
    return this.ctx.response.status(400).send(body);
  }
}

module.exports = CreateUser
