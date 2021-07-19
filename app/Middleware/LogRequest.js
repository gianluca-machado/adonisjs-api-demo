'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger');
const Env = use('Env');

class LogRequest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(context, next) {
    if (Env.get('NODE_ENV') !== 'testing') {
      Logger.info('request url is %s', context.request.url());
      Logger.info('request method is %s', context.request.method());
      Logger.info('request body is %j', context.request.body);
    }
    await next();
  }
}

module.exports = LogRequest
