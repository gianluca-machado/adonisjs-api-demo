'use strict'

const Suite = use('Test/Suite')('Menu registration');
const Menu = use('App/Models/Menu');
const Faker = use('faker');
const Messages = use('App/Utils/Messages');
const menus = use('App/Constants/Menus').menus;
const expect = use('chai').expect;

const data = {
  id: 0,
  name: Faker.name.findName(),
  email: Faker.internet.email().toLowerCase(),
  password: Faker.internet.password(),
  type: null,
  token: null,
};

Suite.trait('Test/ApiClient');
Suite.trait('Auth/Client');

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

// create new user
Suite.test('create new user', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('email', data.email)
    .field('password', data.password)
    .end();

  data.id = response.body.id;

  response.assertStatus(200);
  response.assertJSON({
    id: data.id,
    name: data.name,
    email: data.email,
  });
});

// init user session -> valid
Suite.test('init user session', async (context) => {
  const response = await context.client.post('/sessions')
    .field('email', data.email)
    .field('password', data.password)
    .end();

  data.type = response.body.type;
  data.token = response.body.token;

  response.assertStatus(200);
});

// get menu by user id -> valid
Suite.test('get menu by user id -> valid', async (context) => {
  const response = await context.client.get(`/menu`)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  context.assert.typeOf(response.body.total, 'number');
  context.assert.typeOf(response.body.perPage, 'number');
  context.assert.typeOf(response.body.page, 'number');
  context.assert.typeOf(response.body.lastPage, 'number');
  context.assert.typeOf(response.body.data, 'array');

  expect(response.body).to.have.property('data').with.lengthOf(menus.length);

  menus.forEach(menu => {
    expect(response.body.data).to.deep.include.members([menu]);
  });
});
