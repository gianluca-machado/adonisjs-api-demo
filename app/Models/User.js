'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeCreate', 'UserHook.hashPassword');
    this.addHook('afterCreate', 'UserHook.createSetting');

    this.addTrait('NoTimestamp');
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  settings() {
    return this.hasOne('App/Models/Setting')
  }

  getPassword(password) {
    return '******';
  }
}

module.exports = User
