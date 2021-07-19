'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

class ValidateUserId {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(context, next, props) {
    const Table = use(`App/Models/${props[0]}`);

    const item = await Table.findOrFail(context.params.id);

    if (item.user_id !== context.auth.user.id) {
      const response = Utils.errorResponse(null, Messages.USER_NOT_AUTHORIZED);
      return context.response.badRequest(response);
    }

    await next();
  }
}

module.exports = ValidateUserId
