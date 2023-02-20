const { replace } = require('lodash');

/**
 * @description this function will format the validation error message
 * @param validationMessageArray
 * @returns {*}
 */
module.exports = (validationMessageArray) => {
  return validationMessageArray.reduce((obj, item) => {
    obj[item.path[0]] = replace(item.message, /"/g, '');
    return obj;
  }, {});
};
