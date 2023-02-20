const {HTTP_NOT_FOUND} = require("../config/constants");

/**
 * 404 Not Found Error Handler
 * @param req
 * @param res
 */
module.exports = function(req, res) {
    res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
}
