const { HTTP_INTERNAL_SERVER_ERROR } = require('../config/constants');

/**
 * @description any controller error or exception will be caught here and handled
 */
module.exports = function withErrorHandling(controllerFn) {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (err) {
      console.error('Error in controller', err);
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR.code)
        .json({ error: HTTP_INTERNAL_SERVER_ERROR.message });
    }
  };
};
