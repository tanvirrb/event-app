const { replace } = require('lodash');

module.exports = (validationMessageArray) => {
    return validationMessageArray.reduce((obj, item) => {
        obj[item.path[0]] = replace(item.message, /"/g, '');
        return obj;
    }, {});
};
