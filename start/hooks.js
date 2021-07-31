const Hooks = use('@adonisjs/ignitor').hooks;
const Utils = use('App/Utils/Utils');
const Messages = use('App/Utils/Messages');

Hooks.after.providersBooted(() => {
  const Exception = use('Exception');

  Exception.handle('InvalidJwtToken', async (error, context) => {
    const response = Utils.errorResponse(error.message, Messages.UNAUTHORIZED);
    return context.response.unauthorized(response);
  });

  Exception.handle('HttpException', async (error, context) => {
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      const response = Utils.errorResponse(error.message, Messages.ROUTE_NOT_FOUND_EXCEPTION);
      return context.response.unauthorized(response);
    }

    const response = Utils.errorResponse(error.message, Messages.HTTP_EXCEPTION);
    return context.response.unauthorized(response);
  });

})
