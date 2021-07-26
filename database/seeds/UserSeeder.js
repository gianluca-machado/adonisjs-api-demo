'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const users = use('App/Constants/Users').users;

class UserSeeder {
  async run() {
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
