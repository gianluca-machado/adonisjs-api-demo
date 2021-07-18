'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');
const Setting = use('App/Models/Setting');

const UserHook = exports = module.exports = {}

// hash password
UserHook.hashPassword = async (user) => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password);
  }
}

// create user setting
UserHook.createSetting = async (user) => {
  const data = {
    user_id: user.id
  };

  await Setting.create(data);
}
