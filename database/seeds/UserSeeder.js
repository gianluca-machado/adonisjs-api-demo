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

class UserSeeder {
  async run() {
    await this.createAdmin();
  }

  createAdmin() {
    const admin = {
      email: 'admin@admin.com.br',
      password: '123456',
      name: 'Gianluca Maziero Machado',
    };
    return User.create(admin);
  }
}

module.exports = UserSeeder;
