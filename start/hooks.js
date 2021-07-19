const Hooks = use('@adonisjs/ignitor').hooks;
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

Hooks.after.providersBooted(() => {
  const Exception = use('Exception');

  Exception.handle('InvalidJwtToken', async (error, context) => {
    const response = Utils.errorResponse(error.message, Messages.UNAUTHORIZED);
    return context.response.unauthorized(response);
  });

})
