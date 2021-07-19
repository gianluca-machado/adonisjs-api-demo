'use strict'

const Suite = use('Test/Suite')('Setting registration');
const Setting = use('App/Models/Setting');
const Faker = use('faker');
const Messages = use('App/Utils/Messages');

Suite.before(async () => {
  // executed before all the tests for a given suite
});

Suite.beforeEach(async () => {
  // executed before each test inside a given suite
});

Suite.after(async () => {
  // executed after all the tests for a given suite
});

Suite.afterEach(async () => {
  // executed after each test inside a given suite
});

Suite.trait('Test/ApiClient');
Suite.trait('Auth/Client');