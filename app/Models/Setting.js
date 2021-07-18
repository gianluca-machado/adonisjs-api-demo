'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Setting extends Model {

  user() {
    return this.belongsTo('App/Models/User');
  }

  static getPropertiesToUpdate() {
    return [
      'darkmode',
      'language',
    ];
  }

}

module.exports = Setting
