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
   * Show a list of all settings.
   * GET settings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    return await Setting.all();
  }

  /**
   * Create/save a new setting.
   * POST settings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create(context) {
    const data = context.request.only(Setting.getPropertiesToUpdate());
    data.user_id = context.auth.user.id;

    const setting = await Setting.create(data);

    return setting;
  }

  /**
   * Display a single setting.
   * GET settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show(context) {
    try {
      return await Setting.findOrFail(context.params.id);
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.SETTING_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }

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
      let setting = await Setting.findOrFail(context.params.id);

      const propertiesToUpdate = Setting.getPropertiesToUpdate();
      const data = context.request.only(propertiesToUpdate);

      setting = Utils.updateObject(propertiesToUpdate, data, setting);

      return await setting.save();
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.SETTING_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }

  /**
   * Delete a setting with id.
   * DELETE settings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy(context) {
    try {
      const setting = await Setting.findOrFail(context.params.id);
      return await setting.delete();
    } catch (error) {
      const response = Utils.errorResponse(error.message, Messages.SETTING_NOT_FOUND_EXCEPTION);
      return context.response.badRequest(response);
    }
  }
}

module.exports = SettingController
