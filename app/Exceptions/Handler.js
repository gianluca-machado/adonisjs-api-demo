'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, context) {
    Logger.error("name=%s status=%s message=%s", error.name, error.status, error.message);
  }
}

module.exports = ExceptionHandler
