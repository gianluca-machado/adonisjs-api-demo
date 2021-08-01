# AQdonisjs Api Demo

## Serve application

Use the bash command to serve application.

```bash
npm run serve:dev
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Create Controller
Run the following command to create a new controller.

```js
adonis make:controller User --type http
```

### Create Model
Run the following command to create a new model.

```js
adonis make:model Property -m -c
```

### Logger
The configuration for Logger is saved inside the `config/app.js` file under the `logger` object:

```js
logger: {
  transport: 'console',
  console: {
    driver: 'console'
  },
  file: {
    driver: 'file',
    filename: 'adonis.log'
  }
}
```
Let’s start with a basic example of logging data within your app:

```js
const Logger = use('Logger')

Logger.info('request url is %s', request.url())

Logger.info('request details %j', {
  url: request.url(),
  user: auth.user.username()
})
```
The logger uses `RFC5424` log levels, exposing simple methods for each level:

|  Level  | Method   | Usage                      |
|:-------:|----------|----------------------------|
|    0    | emerg    | Logger.emerg(msg, …​data)   |
|    1    | alert    | Logger.alert(msg, …​data)   |
|    2    | crit     | Logger.crit(msg, …​data)    |
|    3    | error    | Logger.error(msg, …​data)   |
|    4    | warning  | Logger.warning(msg, …​data) |
|    4    | warning  | Logger.warning(msg, …​data) |
|    6    | info     | Logger.info(msg, …​data)    |
|    7    | debug    | Logger.debug(msg, …​data)   |