'use strict'

const Suite = use('Test/Suite')('User registration');
const User = use('App/Models/User');
const Faker = use('faker');
const Messages = use('App/Utils/Messages');

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

// create new user error -> required name
Suite.test('create new user error -> required name', async (context) => {
  const response = await context.client.post('/users')
    .field('email', data.email)
    .field('password', data.password)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_NAME_REQUIRED,
  });
});

// create new user error -> required password
Suite.test('create new user error -> required password', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('email', data.email)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_PASSWORD_REQUIRED,
  });
});

// create new user error -> required min password
Suite.test('create new user error -> required min password', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('password', '12345')
    .field('email', data.email)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_PASSWORD_MIN,
  });
});

// create new user error -> required max password
Suite.test('create new user error -> required max password', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('password', '1234567891234567891234567891234')
    .field('email', data.email)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_PASSWORD_MAX,
  });
});

// create new user error -> required email
Suite.test('create new user error -> required email', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('password', data.password)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_EMAIL_REQUIRED,
  });
});

// create new user error -> invalid email
Suite.test('create new user error -> invalid email', async (context) => {
  const invalid_emails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
  ];

  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('email', invalid_emails[Math.floor(Math.random() * invalid_emails.length)])
    .field('password', data.password)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_EMAIL_INVALID,
  });
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

// create new user error -> email already exists
Suite.test('create new user error -> email already exists', async (context) => {
  const response = await context.client.post('/users')
    .field('name', data.name)
    .field('email', data.email)
    .field('password', data.password)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_VALIDATOR_EMAIL_ALREADY_EXISTS,
  });
});

// init user session error -> invalid credentials (email)
Suite.test('init user session error -> invalid credentials (email)', async (context) => {
  const response = await context.client.post('/sessions')
    .field('email', Faker.internet.email())
    .field('password', data.password)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.LOGIN_FAILED_INVALID_CREDENTIALS,
  });
});

// init user session error -> invalid credentials (password)
Suite.test('init user session error -> invalid credentials (password)', async (context) => {
  const response = await context.client.post('/sessions')
    .field('email', data.email)
    .field('password', Faker.internet.password())
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.LOGIN_FAILED_INVALID_CREDENTIALS,
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

// validate token -> valid
Suite.test('validate token -> valid', async (context) => {
  const response = await context.client.post('/sessions/validate')
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  response.assertText('true');
});

// validate token -> invalid
Suite.test('validate token -> invalid', async (context) => {
  const response = await context.client.post('/sessions/validate')
    .header('Authorization', `${data.type} ${Faker.random.word()}`)
    .end();

  response.assertStatus(401);
  response.assertJSONSubset({
    error: true,
    message: Messages.UNAUTHORIZED,
  });
});

// get user by id -> valid
Suite.test('get user by id -> valid', async (context) => {
  const response = await context.client.get(`/users/${data.id}`)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: data.id,
    name: data.name,
    email: data.email,
    settings: {
      darkmode: 0,
      language: 'en',
    }
  });
});

// get user by auth -> valid
Suite.test('get user by auth -> valid', async (context) => {
  const response = await context.client.get(`/users`)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    id: data.id,
    name: data.name,
    email: data.email,
  });
});

// get user by id -> invalid
Suite.test('get user by id -> invalid', async (context) => {
  const response = await context.client.get(`/users/${Faker.datatype.number()}`)
    .header('Authorization', `${data.type} ${data.token}`)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: true,
    message: Messages.USER_NOT_FOUND_EXCEPTION,
  });
});
