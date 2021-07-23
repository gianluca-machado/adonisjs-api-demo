'use strict'

const Suite = use('Test/Suite')('Setting registration');
const Setting = use('App/Models/Setting');
const Faker = use('faker');
const Messages = use('App/Utils/Messages');
const LanguageEnum = use('App/Enumerations/LanguageEnum');

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

// get setting by user id -> valid
Suite.test('get setting by user id -> valid', async (context) => {
  const response = await context.client.get(`/setting`)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  response.assertJSON({
    darkmode: 0,
    language: LanguageEnum.EN,
  });
});

// get setting by user id -> invalid
Suite.test('get setting by user id -> invalid', async (context) => {
  const response = await context.client.get(`/setting`)
    .header('Authorization', `${data.type} ${Faker.random.word()}`)
    .end();

  response.assertStatus(401);
  response.assertJSONSubset({
    error: true,
    message: Messages.UNAUTHORIZED,
  });
});

// update setting by user id -> valid
Suite.test('update setting by user id -> valid', async (context) => {
  const response = await context.client.put(`/setting`)
    .field('darkmode', 1)
    .field('language', LanguageEnum.PT_BR)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  response.assertJSON({
    darkmode: 1,
    language: LanguageEnum.PT_BR,
  });
});

// update setting by user id error -> invalid darkmode value
Suite.test('update setting by user id error -> invalid darkmode value', async (context) => {
  const response = await context.client.put(`/setting`)
    .field('darkmode', "aa")
    .field('language', LanguageEnum.PT_BR)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.SETTING_VALIDATOR_DARKMODE_INVALID_BOOLEAN,
  });
});

// update setting by user id error -> invalid darkmode required
Suite.test('update setting by user id error -> invalid darkmode required', async (context) => {
  const response = await context.client.put(`/setting`)
    .field('language', LanguageEnum.PT_BR)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.SETTING_VALIDATOR_DARKMODE_REQUIRED,
  });
});

// update setting by user id error -> invalid language required
Suite.test('update setting by user id error -> invalid language required', async (context) => {
  const response = await context.client.put(`/setting`)
    .field('darkmode', 1)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.SETTING_VALIDATOR_LANGUAGE_REQUIRED,
  });
});

// update setting by user id error -> invalid language value
Suite.test('update setting by user id error -> invalid language value', async (context) => {
  const response = await context.client.put(`/setting`)
    .field('darkmode', 1)
    .field('language', Faker.random.word())
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.SETTING_VALIDATOR_LANGUAGE_INVALID_ENUM,
  });
});
