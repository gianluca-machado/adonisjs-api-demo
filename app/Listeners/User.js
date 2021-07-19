'use strict'

const Logger = use('Logger');
const Mail = use('Mail');
const Env = use('Env');

const User = exports = module.exports = {}

User.registered = async (user) => {
  if (Env.get('NODE_ENV') !== 'development') {
    await Mail.send('emails.welcome', user.toJSON(), (message) => {
      message
        .to(user.email)
        .from('<from-email>')
        .subject('Welcome to yardstick')
    });
  }
}
