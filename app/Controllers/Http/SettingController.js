'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Setting = use('App/Models/Setting');
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

/**
 * Resourceful controller for interacting with settings
 */
class SettingController {
  /**
   * Update setting details.
   * PUT or PATCH settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update(context) {
    try {
      let setting = await Setting.findByOrFail('user_id', context.auth.user.id);

      const propertiesToUpdate = Setting.getPropertiesToUpdate();
      const data = context.request.only(propertiesToUpdate);

      setting = Utils.updateObject(propertiesToUpdate, data, setting);
      await setting.save();

      return setting;
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.SETTING_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }

  /**
   * Get setting by user.
   * Get /setting-by-user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async settingByUser(context) {
    try {
      return await Setting.findByOrFail('user_id', context.auth.user.id);
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.SETTING_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }
}

module.exports = SettingController
